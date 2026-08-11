"""TerraByte local server.

Serves the static frontend and APIs:
  POST /api/recommend    — ML crop recommendation from bundle.pkl
  POST /api/chat         — Mita farm advisor (needs OPENAI_API_KEY + OPENAI_MODEL)
  /api/auth/*            — register/login with phone+username+PIN, Google Sign-In

Run:  python3 server.py   (then open http://localhost:8000)
"""
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
    port = int(os.environ.get('PORT', 8000))
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
