"""TerraByte local server.

Serves the static frontend and APIs:
  POST /api/recommend    — ML crop recommendation from bundle.pkl
  POST /api/disease      — leaf disease detection from crop_disease_mobilenetv2.keras
  POST /api/chat         — Mita farm advisor (needs OPENAI_API_KEY + OPENAI_MODEL)
  /api/auth/*            — register/login with phone+username+PIN, Google Sign-In

Run:  python server.py   (then open http://localhost:8080)
      Disease detection runs in the browser (disease-model.tflite), so any
      Python 3.x works. The /api/disease server fallback additionally needs
      tensorflow/keras, which currently means running under Python 3.13
      (py -3.13 server.py) — without it the endpoint returns 503 and the
      browser-side detector still covers the feature.
"""
import io
import threading
import json
import os
import re
import sqlite3
import urllib.request
import warnings

import joblib
import numpy as np
import pandas as pd
from flask import Flask, jsonify, request, send_from_directory, session
from werkzeug.security import check_password_hash, generate_password_hash

try:
    from flask_cors import CORS
except ImportError:
    CORS = None

try:
    from google.auth.transport import requests as google_requests
    from google.oauth2 import id_token as google_id_token
except ImportError:
    google_id_token = None

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load .env if present so SECRET_KEY / GOOGLE_CLIENT_ID etc. work without exports.
if os.path.exists(os.path.join(BASE_DIR, '.env')):
    with open(os.path.join(BASE_DIR, '.env'), encoding='utf-8') as _env:
        for _line in _env:
            _line = _line.strip()
            if _line and not _line.startswith('#') and '=' in _line:
                _key, _, _value = _line.partition('=')
                os.environ.setdefault(_key.strip(), _value.strip())
FEATURES = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
# LabelEncoder order used at training time: sorted crop names from
# crop_recommendation_extended.csv (25 classes, indices 0-24).
CROP_LABELS = [
    'apple', 'banana', 'blackgram', 'chickpea', 'coconut', 'coffee', 'cotton',
    'grapes', 'jute', 'kidneybeans', 'lentil', 'maize', 'mango', 'mothbeans',
    'mungbean', 'muskmelon', 'orange', 'papaya', 'pigeonpeas', 'pomegranate',
    'rice', 'soybean', 'sugarcane', 'watermelon', 'wheat',
]

with warnings.catch_warnings():
    warnings.simplefilter('ignore')
    _bundle = joblib.load(os.path.join(BASE_DIR, 'bundle.pkl'))
_model = _bundle['model']

# PlantVillage class order as seen at training time (sorted dataset folder
# names, which is how keras image_dataset_from_directory assigns indices).
# If the model was trained on a differently ordered dataset, edit this list.
DISEASE_LABELS = [
    'Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust',
    'Apple___healthy', 'Blueberry___healthy',
    'Cherry_(including_sour)___Powdery_mildew', 'Cherry_(including_sour)___healthy',
    'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot', 'Corn_(maize)___Common_rust_',
    'Corn_(maize)___Northern_Leaf_Blight', 'Corn_(maize)___healthy',
    'Grape___Black_rot', 'Grape___Esca_(Black_Measles)',
    'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Grape___healthy',
    'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot',
    'Peach___healthy', 'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy',
    'Potato___Early_blight', 'Potato___Late_blight', 'Potato___healthy',
    'Raspberry___healthy', 'Soybean___healthy', 'Squash___Powdery_mildew',
    'Strawberry___Leaf_scorch', 'Strawberry___healthy', 'Tomato___Bacterial_spot',
    'Tomato___Early_blight', 'Tomato___Late_blight', 'Tomato___Leaf_Mold',
    'Tomato___Septoria_leaf_spot', 'Tomato___Spider_mites Two-spotted_spider_mite',
    'Tomato___Target_Spot', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
    'Tomato___Tomato_mosaic_virus', 'Tomato___healthy',
]

DISEASE_MODEL_PATH = os.path.join(BASE_DIR, 'crop_disease_mobilenetv2.keras')
_disease_model = None
_disease_model_error = None
_disease_lock = threading.Lock()


def _get_disease_model():
    """Lazy-load the keras model so server startup stays fast and the rest of
    the app works even when tensorflow is not installed."""
    global _disease_model, _disease_model_error
    with _disease_lock:
        if _disease_model is None and _disease_model_error is None:
            try:
                import keras
                _disease_model = keras.saving.load_model(DISEASE_MODEL_PATH, compile=False)
            except Exception as exc:  # noqa: BLE001 — surface any load failure to the API
                _disease_model_error = f'{type(exc).__name__}: {exc}'
        return _disease_model


def _pretty_disease(label):
    crop, _, condition = label.partition('___')
    crop = re.sub(r'\s+', ' ', crop.replace('_', ' ')).strip()
    condition = re.sub(r'\s+', ' ', condition.replace('_', ' ')).strip() or 'unknown'
    return crop, condition

app = Flask(__name__, static_folder=BASE_DIR, static_url_path='')
if CORS:
    CORS(app)

app.secret_key = os.environ.get('SECRET_KEY', 'dev-insecure-terrabyte-secret')
if app.secret_key == 'dev-insecure-terrabyte-secret':
    print('WARNING: SECRET_KEY not set — using an insecure dev fallback.')
PIN_LENGTH = int(os.environ.get('PIN_LENGTH', 4))
GOOGLE_CLIENT_ID = os.environ.get('GOOGLE_CLIENT_ID')
DB_PATH = os.environ.get('AUTH_DB_PATH', os.path.join(BASE_DIR, 'data', 'users.db'))
os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)


def _db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


with _db() as _conn:
    _conn.execute('''CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        phone TEXT UNIQUE,
        username TEXT NOT NULL,
        pin_hash TEXT,
        google_sub TEXT UNIQUE,
        email TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now')))''')


def _user_json(row):
    return {'id': row['id'], 'phone': row['phone'], 'username': row['username'],
            'email': row['email'], 'hasPin': row['pin_hash'] is not None,
            'hasGoogle': row['google_sub'] is not None, 'createdAt': row['created_at']}


def _current_user():
    user_id = session.get('user_id')
    if not user_id:
        return None
    with _db() as conn:
        row = conn.execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()
    if row is None:
        session.clear()
    return row


def _valid_pin(pin):
    return isinstance(pin, str) and re.fullmatch(r'\d{%d}' % PIN_LENGTH, pin)


@app.before_request
def _guard_private():
    path = request.path
    if path.startswith('/data') or path.endswith(('.db', '.env', '.py', '.pkl', '.keras')):
        return jsonify(error='Not found'), 404


@app.get('/')
def index():
    return send_from_directory(BASE_DIR, 'index.html')


@app.get('/api/auth/config')
def auth_config():
    return jsonify(pinLength=PIN_LENGTH,
                   googleClientId=GOOGLE_CLIENT_ID if google_id_token else None)


@app.post('/api/auth/register')
def auth_register():
    body = request.get_json(silent=True) or {}
    phone = (body.get('phone') or '').strip()
    username = (body.get('username') or '').strip()
    pin = body.get('pin')
    if not re.fullmatch(r'\d{10}', phone):
        return jsonify(error='Enter a valid 10-digit phone number.', code='invalid_phone'), 400
    if not username or len(username) > 60:
        return jsonify(error='Enter your name.', code='invalid_username'), 400
    if not _valid_pin(pin):
        return jsonify(error=f'PIN must be exactly {PIN_LENGTH} digits.', code='invalid_pin'), 400
    if pin != body.get('confirmPin'):
        return jsonify(error='PINs do not match.', code='pin_mismatch'), 400
    try:
        with _db() as conn:
            cursor = conn.execute(
                'INSERT INTO users (phone, username, pin_hash) VALUES (?, ?, ?)',
                (phone, username, generate_password_hash(pin)))
            row = conn.execute('SELECT * FROM users WHERE id = ?', (cursor.lastrowid,)).fetchone()
    except sqlite3.IntegrityError:
        return jsonify(error='This phone number is already registered. Try logging in.',
                       code='duplicate_phone'), 409
    session['user_id'] = row['id']
    return jsonify(user=_user_json(row))


@app.post('/api/auth/login')
def auth_login():
    body = request.get_json(silent=True) or {}
    phone = (body.get('phone') or '').strip()
    username = (body.get('username') or '').strip()
    pin = body.get('pin') or ''
    with _db() as conn:
        row = conn.execute('SELECT * FROM users WHERE phone = ?', (phone,)).fetchone()
    if row and row['pin_hash'] is None:
        return jsonify(error='This account signs in with Google.', code='google_account'), 401
    if (row is None or row['username'].strip().lower() != username.lower()
            or not check_password_hash(row['pin_hash'], pin)):
        return jsonify(error='Phone number, username or PIN is incorrect.',
                       code='bad_credentials'), 401
    session['user_id'] = row['id']
    return jsonify(user=_user_json(row))


@app.post('/api/auth/google')
def auth_google():
    if not GOOGLE_CLIENT_ID or google_id_token is None:
        return jsonify(error='Google sign-in is not configured.', code='google_unconfigured'), 503
    body = request.get_json(silent=True) or {}
    try:
        info = google_id_token.verify_oauth2_token(
            body.get('credential') or '', google_requests.Request(), GOOGLE_CLIENT_ID)
    except ValueError:
        return jsonify(error='Google sign-in failed. Please try again.', code='google_failed'), 401
    sub = info['sub']
    email = info.get('email')
    current = _current_user()
    is_new = False
    with _db() as conn:
        row = conn.execute('SELECT * FROM users WHERE google_sub = ?', (sub,)).fetchone()
        if current is not None and current['google_sub'] is None:
            if row is not None and row['id'] != current['id']:
                return jsonify(error='This Google account is already linked to another profile.',
                               code='google_taken'), 409
            conn.execute('UPDATE users SET google_sub = ?, email = ? WHERE id = ?',
                         (sub, email, current['id']))
            row = conn.execute('SELECT * FROM users WHERE id = ?', (current['id'],)).fetchone()
        elif row is None:
            username = (info.get('name') or (email or 'farmer').split('@')[0]).strip()[:60]
            cursor = conn.execute(
                'INSERT INTO users (username, google_sub, email) VALUES (?, ?, ?)',
                (username, sub, email))
            row = conn.execute('SELECT * FROM users WHERE id = ?', (cursor.lastrowid,)).fetchone()
            is_new = True
    session['user_id'] = row['id']
    return jsonify(user=_user_json(row), isNew=is_new)


@app.post('/api/auth/phone')
def auth_phone():
    row = _current_user()
    if row is None:
        return jsonify(error='Not signed in', code='not_signed_in'), 401
    phone = ((request.get_json(silent=True) or {}).get('phone') or '').strip()
    if not re.fullmatch(r'\d{10}', phone):
        return jsonify(error='Enter a valid 10-digit phone number.', code='invalid_phone'), 400
    try:
        with _db() as conn:
            conn.execute('UPDATE users SET phone = ? WHERE id = ?', (phone, row['id']))
            row = conn.execute('SELECT * FROM users WHERE id = ?', (row['id'],)).fetchone()
    except sqlite3.IntegrityError:
        return jsonify(error='This phone number belongs to another account. '
                             'Log in with your phone number and PIN instead.',
                       code='duplicate_phone'), 409
    return jsonify(user=_user_json(row))


@app.post('/api/auth/pin')
def auth_pin():
    row = _current_user()
    if row is None:
        return jsonify(error='Not signed in', code='not_signed_in'), 401
    body = request.get_json(silent=True) or {}
    pin = body.get('pin')
    if not _valid_pin(pin):
        return jsonify(error=f'PIN must be exactly {PIN_LENGTH} digits.', code='invalid_pin'), 400
    if pin != body.get('confirmPin'):
        return jsonify(error='PINs do not match.', code='pin_mismatch'), 400
    with _db() as conn:
        conn.execute('UPDATE users SET pin_hash = ? WHERE id = ?',
                     (generate_password_hash(pin), row['id']))
        row = conn.execute('SELECT * FROM users WHERE id = ?', (row['id'],)).fetchone()
    return jsonify(user=_user_json(row))


@app.post('/api/auth/profile')
def auth_profile():
    row = _current_user()
    if row is None:
        return jsonify(error='Not signed in', code='not_signed_in'), 401
    username = ((request.get_json(silent=True) or {}).get('username') or '').strip()
    if not username or len(username) > 60:
        return jsonify(error='Enter your name.', code='invalid_username'), 400
    with _db() as conn:
        conn.execute('UPDATE users SET username = ? WHERE id = ?', (username, row['id']))
        row = conn.execute('SELECT * FROM users WHERE id = ?', (row['id'],)).fetchone()
    return jsonify(user=_user_json(row))


@app.post('/api/auth/delete')
def auth_delete():
    row = _current_user()
    if row is None:
        return jsonify(error='Not signed in', code='not_signed_in'), 401
    with _db() as conn:
        conn.execute('DELETE FROM users WHERE id = ?', (row['id'],))
    session.clear()
    return jsonify(ok=True)


@app.post('/api/auth/logout')
def auth_logout():
    session.clear()
    return jsonify(ok=True)


@app.get('/api/auth/me')
def auth_me():
    row = _current_user()
    if row is None:
        return jsonify(error='Not signed in', code='not_signed_in'), 401
    return jsonify(user=_user_json(row))


@app.post('/api/recommend')
def recommend():
    payload = request.get_json(silent=True) or {}
    try:
        values = [float(payload[feature]) for feature in FEATURES]
    except (KeyError, TypeError, ValueError):
        return jsonify(error=f"Required numeric fields: {', '.join(FEATURES)}"), 400

    N, P, K, temperature, humidity, ph, rainfall = values
    if not (0 <= ph <= 14):
        return jsonify(error="pH must be between 0 and 14"), 400
    if not (0 <= humidity <= 100):
        return jsonify(error="Humidity must be between 0 and 100"), 400
    if not (0 <= rainfall <= 10000):
        return jsonify(error="Rainfall must be positive"), 400
    if not (N >= 0 and P >= 0 and K >= 0):
        return jsonify(error="Nutrient values must be non-negative"), 400
    if not (-50 <= temperature <= 60):
        return jsonify(error="Temperature must be between -50 and 60"), 400

    frame = pd.DataFrame([values], columns=FEATURES)
    with warnings.catch_warnings():
        warnings.simplefilter('ignore')
        probabilities = _model.predict_proba(frame)[0]
    order = np.argsort(probabilities)[::-1][:5]
    recommendations = [
        {'crop': CROP_LABELS[i], 'probability': round(float(probabilities[i]), 4)}
        for i in order
    ]
    return jsonify(recommendations=recommendations, model='bundle.pkl')


@app.post('/api/disease')
def disease():
    photo = request.files.get('photo')
    if photo is None or not photo.filename:
        return jsonify(error='Attach a leaf photo as the "photo" form field.'), 400

    model = _get_disease_model()
    if model is None:
        return jsonify(error='Disease detection is not available on this server: '
                             + (_disease_model_error or 'model failed to load'),
                       code='model_unavailable'), 503

    try:
        from PIL import Image
        image = Image.open(io.BytesIO(photo.read()))
        image = image.convert('RGB').resize((224, 224), Image.BILINEAR)
    except Exception:
        return jsonify(error='Could not read that image. Upload a JPG or PNG photo.'), 400

    # Rescaling lives inside the saved model, so raw 0-255 pixels go in as-is.
    batch = np.asarray(image, dtype=np.float32)[np.newaxis, ...]
    probabilities = model.predict(batch, verbose=0)[0]
    order = np.argsort(probabilities)[::-1][:3]
    predictions = []
    for i in order:
        label = DISEASE_LABELS[i] if i < len(DISEASE_LABELS) else f'class_{i}'
        crop, condition = _pretty_disease(label)
        predictions.append({
            'label': label,
            'crop': crop,
            'condition': condition,
            'healthy': condition.lower() == 'healthy',
            'probability': round(float(probabilities[i]), 4),
        })
    return jsonify(predictions=predictions, model='crop_disease_mobilenetv2.keras')


@app.post('/api/chat')
def chat():
    """Local port of api/chat.js so Mita also works outside Vercel."""
    api_key = os.environ.get('OPENAI_API_KEY')
    model = os.environ.get('OPENAI_MODEL')
    if not api_key or not model:
        return jsonify(error='AI service is not configured'), 503
    body = request.get_json(silent=True) or {}
    question = body.get('question')
    if not question or not isinstance(question, str):
        return jsonify(error='A question is required'), 400
    language = body.get('language', 'English')
    context = body.get('context', {})
    history = body.get('history', [])[-6:]

    instructions = (
        f'You are Kisan AI, a concise and practical farm advisor for farmers in India. '
        f'Reply only in {language}. Explain in simple, respectful language. You can answer '
        'general farm questions about crops, soil, irrigation, seasonal planning, weather, '
        'pests and markets. Use the supplied field context when relevant. Do not invent '
        'local prices, weather, regulations, diagnoses or pesticide dosage. For dangerous '
        'pest, chemical or disease situations, advise the farmer to consult a local '
        'agricultural extension officer or certified agronomist. Keep answers under 150 '
        'words and use short bullets only when useful.'
    )
    prompt = (
        f'Field context: {json.dumps(context)}\n'
        f'Conversation: {json.dumps(history)}\n'
        f'Farmer question: {question}'
    )
    req = urllib.request.Request(
        'https://api.openai.com/v1/responses',
        data=json.dumps({
            'model': model,
            'instructions': instructions,
            'input': [{'role': 'user', 'content': prompt}],
        }).encode(),
        headers={'Authorization': f'Bearer {api_key}', 'Content-Type': 'application/json'},
        method='POST',
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as response:
            result = json.load(response)
        answer = result.get('output_text') or ''.join(
            part.get('text', '')
            for item in result.get('output', [])
            for part in (item.get('content') or [])
            if part.get('type') == 'output_text'
        )
        if not answer:
            raise ValueError('No answer returned')
        return jsonify(answer=answer)
    except Exception:
        return jsonify(error='Kisan AI is temporarily unavailable'), 502


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    # On Windows two servers can silently share the port (SO_REUSEADDR) and the
    # older one keeps answering requests — probe exclusively and bail out early.
    import socket
    probe = socket.socket()
    if hasattr(socket, 'SO_EXCLUSIVEADDRUSE'):
        probe.setsockopt(socket.SOL_SOCKET, socket.SO_EXCLUSIVEADDRUSE, 1)
    try:
        probe.bind(('0.0.0.0', port))
        probe.close()
    except OSError:
        raise SystemExit(
            f'ERROR: port {port} is already in use — another server.py is still '
            'running. Stop it first (close its terminal or kill the python '
            'process), then start this one.')
    # Plain http by default: Google Sign-In does not work behind the self-signed
    # adhoc cert. Set USE_TLS=1 to restore https.
    context = 'adhoc' if os.environ.get('USE_TLS') else None
    app.run(host='0.0.0.0', port=port, debug=False, ssl_context=context)
