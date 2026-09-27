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
import base64
import io
import mimetypes
import threading
import json
import os
import re
import sqlite3
import time
import urllib.error
import urllib.parse
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

CROP_MODEL_PATH = os.path.join(BASE_DIR, 'bundle.pkl')
_crop_model = None
_crop_model_error = None
_crop_lock = threading.Lock()


def _get_crop_model():
    """Lazy-load bundle.pkl so a cold start can serve pages before the 10 MB
    unpickle (and the sklearn/xgboost imports it triggers) has finished."""
    global _crop_model, _crop_model_error
    with _crop_lock:
        if _crop_model is None and _crop_model_error is None:
            try:
                with warnings.catch_warnings():
                    warnings.simplefilter('ignore')
                    _crop_model = joblib.load(CROP_MODEL_PATH)['model']
            except Exception as exc:  # noqa: BLE001 — surface any load failure to the API
                _crop_model_error = f'{type(exc).__name__}: {exc}'
        return _crop_model


# Warm the model in the background: pages are served immediately, and the
# model is usually loaded before the first recommendation is requested.
threading.Thread(target=_get_crop_model, daemon=True).start()

# Load confidence thresholds (override defaults if config exists)
CONF_THRESHOLDS = {
    'high_confidence': 0.80,
    'mid_confidence_low': 0.60,
    'mid_confidence_high': 0.79,
}
conf_path = os.path.join(BASE_DIR, 'confidence_config.json')
try:
    with open(conf_path, 'r', encoding='utf-8') as _cfg:
        CONF_THRESHOLDS.update(json.load(_cfg))
except Exception:
    # Use defaults defined above
    pass

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

    model = _get_crop_model()
    if model is None:
        return jsonify(error='Crop recommendation is not available on this server: '
                             + (_crop_model_error or 'model failed to load'),
                       code='model_unavailable'), 503

    frame = pd.DataFrame([values], columns=FEATURES)
    with warnings.catch_warnings():
        warnings.simplefilter('ignore')
        probabilities = model.predict_proba(frame)[0]
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

    try:
        from PIL import Image
        from image_guard import ImageGuard
        raw_image = Image.open(io.BytesIO(photo.read()))
    except Exception:
        return jsonify(error='Could not read that image. Upload a JPG or PNG photo.'), 400

    verdict = ImageGuard.validate(raw_image)
    if not verdict.passed:
        return jsonify(
            error=verdict.headline,
            code='invalid_image_quality',
            failedCheck=verdict.failed_check,
            issues=verdict.issues,
            recommendations=verdict.recommendations,
            metrics=verdict.metrics,
        ), 400

    # Checked after the image guard: the guard needs only PIL/numpy, so photo
    # quality feedback still works on servers without tensorflow.
    model = _get_disease_model()
    if model is None:
        return jsonify(error='Disease detection is not available on this server: '
                             + (_disease_model_error or 'model failed to load'),
                       code='model_unavailable'), 503

    image = raw_image.convert('RGB').resize((224, 224), Image.BILINEAR)

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

    # ----- Confidence gating -----
    top_conf = probabilities[order[0]]
    # Load thresholds from config (fallback to defaults)
    high_thr = CONF_THRESHOLDS.get('high_confidence', 0.80)
    mid_low = CONF_THRESHOLDS.get('mid_confidence_low', 0.60)
    if top_conf >= high_thr:
        diagnosis_state = 'high_confidence'
        message = None
    elif top_conf >= mid_low:
        diagnosis_state = 'possible'
        message = "The prediction is uncertain. Please consider the top‑3 suggestions."
    else:
        diagnosis_state = 'unreliable'
        message = "The image is insufficient for a reliable diagnosis. Please photograph one affected leaf in daylight."

    response = {
        'predictions': predictions,
        'model': 'crop_disease_mobilenetv2.keras',
        'quality': verdict.to_dict(),
        'diagnosis_state': diagnosis_state,
    }
    if message:
        response['message'] = message
    return jsonify(response)

_ee = None
_ee_error = None
_ee_lock = threading.Lock()


def _get_ee():
    """Connect to Earth Engine once per container, not once per request —
    ee.Initialize takes several seconds, which every farmer would otherwise pay."""
    global _ee, _ee_error
    with _ee_lock:
        if _ee is None and _ee_error is None:
            try:
                from crop_model.earth_engine.client import initialize
                _ee = initialize()
            except Exception as exc:  # noqa: BLE001 — surface any failure to the API
                # client.py wraps the real error in a generic "run earthengine
                # authenticate" message, which is misleading on a server.
                cause = exc.__cause__ or exc
                _ee_error = f'{type(cause).__name__}: {cause}'
        return _ee


@app.get('/api/satellite/health')
def satellite_health():
    """Checks Earth Engine is reachable with this server's credentials."""
    ee = _get_ee()
    if ee is None:
        return jsonify(ok=False, error=_ee_error, code='earth_engine_unavailable'), 503
    return jsonify(ok=True, project=os.environ.get('EARTH_ENGINE_PROJECT_ID'),
                   test=ee.Number(1).add(1).getInfo())


class GeminiError(Exception):
    def __init__(self, message, status=502, code='gemini_error', details=None):
        super().__init__(message)
        self.status, self.code, self.details = status, code, details


def _gemini_generate(parts, response_schema=None, timeout=60):
    """Call Gemini once, retrying a single time if it is briefly busy.
    Returns (model, text). With response_schema, the text is JSON."""
    api_key = os.getenv('GEMINI_API_KEY')
    if not api_key:
        raise GeminiError('Gemini API key not configured.', 503, 'gemini_unconfigured')
    model = os.getenv('GEMINI_MODEL', 'gemini-3.8-flash')
    payload = {'contents': [{'role': 'user', 'parts': parts}]}
    if response_schema:
        payload['generationConfig'] = {'responseMimeType': 'application/json',
                                       'responseSchema': response_schema}
    url = f'https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent'
    for attempt in (1, 2):
        req = urllib.request.Request(
            url, data=json.dumps(payload).encode(), method='POST',
            # Key in a header rather than the URL, so it cannot leak into logs.
            headers={'Content-Type': 'application/json', 'x-goog-api-key': api_key})
        try:
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                result = json.load(resp)
            break
        except urllib.error.HTTPError as exc:
            if exc.code in (429, 500, 503) and attempt == 1:
                time.sleep(1.5)
                continue
            if exc.code in (429, 503):
                raise GeminiError('Gemini is busy right now. Please try again in a moment.',
                                  503, 'gemini_busy', f'HTTP {exc.code}') from exc
            raise GeminiError('Gemini service error', 502, 'gemini_error',
                              f'HTTP {exc.code}') from exc
        except (urllib.error.URLError, OSError) as exc:
            raise GeminiError('Could not reach Gemini.', 502, 'gemini_unreachable', str(exc)) from exc
    try:
        # Skip "thought" parts that thinking models may return before the answer.
        text = ''.join(p.get('text', '') for p in result['candidates'][0]['content']['parts']
                       if not p.get('thought'))
    except (KeyError, IndexError, TypeError) as exc:
        raise GeminiError('Gemini returned no answer.', 502, 'gemini_empty') from exc
    return model, text


def _gemini_error_response(err):
    return jsonify(error=str(err), code=err.code, details=err.details), err.status


@app.post('/api/gemini')
def gemini():
    body = request.get_json(silent=True) or {}
    prompt = body.get('prompt')
    if not prompt:
        return jsonify(error='Prompt required.', code='missing_prompt'), 400
    try:
        _, answer = _gemini_generate([{'text': prompt}])
    except GeminiError as err:
        return _gemini_error_response(err)
    return jsonify(answer=answer)


SOIL_CARD_TYPES = {'image/jpeg', 'image/png', 'image/webp', 'application/pdf'}
SOIL_CARD_MAX_BYTES = 10 * 1024 * 1024
# Same physical limits the planner uses (app.js fieldRanges), so the two agree.
SOIL_CARD_LIMITS = {'N': (0, 800), 'P': (0, 300), 'K': (0, 800), 'ph': (0, 14)}
_SOIL_VALUE = {
    'type': 'OBJECT',
    'properties': {
        'value': {'type': 'NUMBER', 'nullable': True},
        'unit': {'type': 'STRING', 'nullable': True},
        'raw_text': {'type': 'STRING', 'nullable': True},
    },
    'required': ['value', 'unit', 'raw_text'],
}
SOIL_CARD_SCHEMA = {
    'type': 'OBJECT',
    'properties': {'is_soil_card': {'type': 'BOOLEAN'},
                   'N': _SOIL_VALUE, 'P': _SOIL_VALUE, 'K': _SOIL_VALUE, 'ph': _SOIL_VALUE},
    'required': ['is_soil_card', 'N', 'P', 'K', 'ph'],
}
SOIL_CARD_PROMPT = (
    'This should be an Indian Soil Health Card. Set is_soil_card to false if it is '
    'not a soil test report. Read these four results: available Nitrogen (N), '
    'available Phosphorus (P), available Potassium (K), and pH. For each, give the '
    'number exactly as printed, the unit as printed (for example "kg/ha"), and in '
    'raw_text the exact line of text you read it from. If a value is missing, '
    'unreadable or you are not sure, set value, unit and raw_text to null. '
    'Never guess or estimate a number. Do not read any other fields.'
)


@app.post('/api/soil-card')
def soil_card():
    upload = request.files.get('file')
    if upload is None or not upload.filename:
        return jsonify(error='Attach a photo or PDF of the Soil Health Card as the "file" field.',
                       code='missing_file'), 400
    mime = upload.mimetype
    if mime not in SOIL_CARD_TYPES:
        mime = mimetypes.guess_type(upload.filename)[0]
    if mime not in SOIL_CARD_TYPES:
        return jsonify(error='Upload a JPG, PNG, WebP or PDF.', code='unsupported_type'), 400
    data = upload.read()
    if len(data) > SOIL_CARD_MAX_BYTES:
        return jsonify(error='File is larger than 10 MB.', code='file_too_large'), 400

    parts = [{'inline_data': {'mime_type': mime, 'data': base64.b64encode(data).decode()}},
             {'text': SOIL_CARD_PROMPT}]
    try:
        model, text = _gemini_generate(parts, response_schema=SOIL_CARD_SCHEMA)
        reading = json.loads(text)
    except GeminiError as err:
        return _gemini_error_response(err)
    except ValueError:
        return jsonify(error='Could not understand the card reading.', code='gemini_bad_json'), 502

    if not reading.get('is_soil_card'):
        return jsonify(error='This does not look like a Soil Health Card. '
                             'Please upload a photo of the card itself.',
                       code='not_a_soil_card'), 422

    names = {'N': 'Nitrogen', 'P': 'Phosphorus', 'K': 'Potassium', 'ph': 'pH'}
    extracted, warnings_out = {}, []
    for key, (low, high) in SOIL_CARD_LIMITS.items():
        item = reading.get(key) or {}
        value = item.get('value')
        if value is not None and not (low <= value <= high):
            warnings_out.append(f'{names[key]} {value} is outside the possible range '
                                f'{low}–{high} — please check it against the card.')
        elif value is None:
            warnings_out.append(f'{names[key]} not found on the card — please enter it by hand.')
        unit = item.get('unit')
        if key != 'ph' and value is not None and unit and unit.lower().replace(' ', '') != 'kg/ha':
            warnings_out.append(f'{names[key]} is in "{unit}", not kg/ha — please convert it.')
        extracted[key] = {'value': value, 'unit': unit, 'raw_text': item.get('raw_text')}

    return jsonify(extracted=extracted,
                   requires_confirmation=True,  # always — never trust an AI reading silently
                   warnings=warnings_out,
                   meta={'source': 'live', 'model': model})


LANGUAGE_NAMES = {'en': 'English', 'hi': 'Hindi', 'mr': 'Marathi', 'te': 'Telugu'}
DISEASE_ADVICE_SCHEMA = {
    'type': 'OBJECT',
    'properties': {
        'supports_diagnosis': {'type': 'STRING', 'enum': ['yes', 'no', 'unsure']},
        'severity': {'type': 'STRING', 'enum': ['none', 'low', 'moderate', 'severe']},
        'summary': {'type': 'STRING'},
        'steps': {'type': 'ARRAY', 'items': {'type': 'STRING'}},
    },
    'required': ['supports_diagnosis', 'severity', 'summary', 'steps'],
}


@app.post('/api/disease/advice')
def disease_advice():
    """Second opinion on a diagnosis the browser model already made: checks the
    photo quality, then asks Gemini whether the photo supports the diagnosis,
    how severe it looks, and what to do. Only adds to the result — the page
    works without it."""
    photo = request.files.get('photo')
    if photo is None or not photo.filename:
        return jsonify(error='Attach the leaf photo as the "photo" form field.',
                       code='missing_photo'), 400
    label = request.form.get('label', '')
    if label not in DISEASE_LABELS:
        return jsonify(error='Unknown disease label.', code='bad_label'), 400
    try:
        confidence = float(request.form.get('confidence', ''))
    except ValueError:
        return jsonify(error='confidence must be a number from 0 to 1.', code='bad_confidence'), 400
    if not 0 <= confidence <= 1:
        return jsonify(error='confidence must be a number from 0 to 1.', code='bad_confidence'), 400
    language = LANGUAGE_NAMES.get(request.form.get('language', 'en'), 'English')

    try:
        from PIL import Image
        from image_guard import ImageGuard
        raw_image = Image.open(io.BytesIO(photo.read()))
        raw_image.load()
    except Exception:
        return jsonify(error='Could not read that image. Upload a JPG or PNG photo.',
                       code='bad_image'), 400

    # The browser model never sees the image guard, so run it here.
    verdict = ImageGuard.validate(raw_image)
    if not verdict.passed:
        return jsonify(error=verdict.headline, code='invalid_image_quality',
                       issues=verdict.issues, recommendations=verdict.recommendations), 400

    crop, condition = _pretty_disease(label)
    if confidence < CONF_THRESHOLDS.get('mid_confidence_low', 0.60):
        # Too unsure to be worth a second opinion; the page already asks for a retake.
        return jsonify(skipped='low_confidence', disease=f'{crop} {condition}',
                       confidence=confidence)

    # Send a small JPEG: same content for Gemini, far fewer bytes and tokens.
    image = raw_image.convert('RGB')
    image.thumbnail((1024, 1024))
    buffer = io.BytesIO()
    image.save(buffer, format='JPEG', quality=85)

    prompt = (
        f'A plant disease classifier looked at this leaf photo and said: {crop} — '
        f'{condition}, with {round(confidence * 100)}% confidence. '
        'supports_diagnosis: does the photo visually support that diagnosis? '
        'Answer yes, no or unsure. Do not name a different disease. '
        'severity: from the visible damage — none if the leaf is healthy, otherwise '
        'low, moderate or severe. '
        'steps: exactly 3 short, practical steps for a small farmer in India. '
        'Never name a pesticide, fungicide, chemical or dose; for treatment, say to '
        'confirm with the local agriculture office. '
        'summary: one short sentence on what the farmer is looking at. '
        f'Write summary and steps in {language}. Keep supports_diagnosis and severity '
        'as the English values given.'
    )
    parts = [{'inline_data': {'mime_type': 'image/jpeg',
                              'data': base64.b64encode(buffer.getvalue()).decode()}},
             {'text': prompt}]
    try:
        model, text = _gemini_generate(parts, response_schema=DISEASE_ADVICE_SCHEMA)
        advice = json.loads(text)
    except GeminiError as err:
        return _gemini_error_response(err)
    except ValueError:
        return jsonify(error='Could not understand the advice.', code='gemini_bad_json'), 502

    return jsonify(disease=f'{crop} {condition}', confidence=confidence,
                   severity=advice.get('severity'),
                   gemini_agrees=advice.get('supports_diagnosis'),
                   summary=advice.get('summary'),
                   steps=(advice.get('steps') or [])[:3],
                   meta={'source': 'live', 'model': model})


# ---- Google Maps: village search and GPS -> place ---------------------------
# Results are returned in the shape app.js already uses for places:
# {name, state, district, lat, lng, label, source}.

PLACE_TYPES = {'locality', 'sublocality', 'sublocality_level_1', 'neighborhood',
               'postal_town', 'administrative_area_level_2',
               'administrative_area_level_3', 'administrative_area_level_4'}
PLACES_TTL = 30 * 24 * 3600  # places don't move; also keeps Maps calls low
_places_cache = {}
_places_lock = threading.Lock()


def _places_cache_get(key):
    with _places_lock:
        hit = _places_cache.get(key)
        return hit[1] if hit and hit[0] > time.time() else None


def _places_cache_set(key, value):
    with _places_lock:
        if len(_places_cache) > 5000:  # keep memory bounded
            _places_cache.clear()
        _places_cache[key] = (time.time() + PLACES_TTL, value)


class MapsError(Exception):
    def __init__(self, message, status=502, code='maps_error'):
        super().__init__(message)
        self.status, self.code = status, code


def _maps_key():
    key = os.getenv('MAPS_SERVER_KEY')
    if not key:
        raise MapsError('Maps is not configured on this server.', 503, 'maps_unconfigured')
    return key


def _maps_fetch(req):
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            return json.load(resp)
    except urllib.error.HTTPError as exc:
        raise MapsError('Maps service error', 502, f'maps_http_{exc.code}') from exc
    except (urllib.error.URLError, OSError) as exc:
        raise MapsError('Could not reach Maps.', 502, 'maps_unreachable') from exc


def _component(components, kind, text_key):
    """Pull one address part out of a Google address-components list."""
    for comp in components or []:
        if kind in comp.get('types', []):
            return comp.get(text_key, '')
    return ''


def _place_shape(name, district, state, lat, lng, source):
    label_parts = [name] + [p for p in (district, state) if p and p != name]
    return {'name': name, 'state': state, 'district': district,
            'lat': lat, 'lng': lng, 'label': ', '.join(label_parts), 'source': source}


@app.get('/api/places')
def places_search():
    query = request.args.get('q', '').strip()
    try:
        limit = max(1, min(10, int(request.args.get('limit', 8))))
    except ValueError:
        limit = 8
    if len(query) < 2:
        return jsonify(places=[])
    cache_key = f'search:{query.lower()}:{limit}'
    cached = _places_cache_get(cache_key)
    if cached is not None:
        return jsonify(places=cached, meta={'source': 'cache'})
    try:
        req = urllib.request.Request(
            'https://places.googleapis.com/v1/places:searchText', method='POST',
            data=json.dumps({'textQuery': query, 'regionCode': 'IN',
                             'languageCode': 'en', 'pageSize': limit}).encode(),
            headers={'Content-Type': 'application/json', 'X-Goog-Api-Key': _maps_key(),
                     'X-Goog-FieldMask': 'places.displayName,places.location,'
                                         'places.addressComponents,places.types'})
        data = _maps_fetch(req)
    except MapsError as err:
        return jsonify(error=str(err), code=err.code), err.status

    results = []
    for place in data.get('places', []):
        comps = place.get('addressComponents', [])
        # Only real places in India — not shops, stations or temples named after them.
        if _component(comps, 'country', 'shortText') != 'IN':
            continue
        if not PLACE_TYPES.intersection(place.get('types', [])):
            continue
        location = place.get('location') or {}
        results.append(_place_shape(
            name=(place.get('displayName') or {}).get('text', ''),
            district=(_component(comps, 'administrative_area_level_3', 'longText')
                      or _component(comps, 'administrative_area_level_2', 'longText')),
            state=_component(comps, 'administrative_area_level_1', 'longText'),
            lat=location.get('latitude'), lng=location.get('longitude'), source='search'))
    _places_cache_set(cache_key, results)
    return jsonify(places=results, meta={'source': 'live'})


@app.get('/api/reverse-geocode')
def reverse_geocode():
    try:
        lat = float(request.args['lat'])
        lng = float(request.args['lng'])
    except (KeyError, ValueError):
        return jsonify(error='lat and lng are required numbers.', code='bad_coordinates'), 400
    if not (-90 <= lat <= 90 and -180 <= lng <= 180):
        return jsonify(error='lat and lng are out of range.', code='bad_coordinates'), 400
    cache_key = f'reverse:{lat:.3f},{lng:.3f}'  # ~110 m: nudging the pin still hits the cache
    cached = _places_cache_get(cache_key)
    if cached is not None:
        return jsonify(cached)
    try:
        url = ('https://maps.googleapis.com/maps/api/geocode/json?'
               + urllib.parse.urlencode({'latlng': f'{lat},{lng}', 'language': 'en',
                                         'key': _maps_key()}))
        data = _maps_fetch(urllib.request.Request(url))
    except MapsError as err:
        return jsonify(error=str(err), code=err.code), err.status
    if data.get('status') != 'OK' or not data.get('results'):
        # ZERO_RESULTS (e.g. at sea) or REQUEST_DENIED (key restrictions).
        return jsonify(error='No place found here.', code=f'maps_{data.get("status", "error").lower()}'), 404

    def first(kind):
        for result in data['results']:
            value = _component(result.get('address_components'), kind, 'long_name')
            if value:
                return value
        return ''

    district = first('administrative_area_level_3') or first('administrative_area_level_2')
    name = first('locality') or first('sublocality') or district or 'Your location'
    place = _place_shape(name, district, first('administrative_area_level_1'), lat, lng, 'gps')
    _places_cache_set(cache_key, place)
    return jsonify(place)


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
