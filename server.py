"""TerraByte local server.

Serves the static frontend and APIs (full list: docx guide/api-contract.md):
  POST /api/recommend    — ML crop recommendation from bundle.pkl
  POST /api/disease      — leaf disease detection from crop_disease_mobilenetv2.keras
  POST /api/disease/advice, /api/soil-card, /api/chat — Gemini (needs GEMINI_API_KEY)
  GET  /api/places, /api/place, /api/reverse-geocode — Google Maps (needs MAPS_SERVER_KEY)
  POST /api/satellite    — Sentinel-2/CHIRPS/ERA5 via Earth Engine (needs EARTH_ENGINE_PROJECT_ID)
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

from user_store import (DuplicateError, FirestoreUserStore, SqliteUserStore,
                        StoreUnavailable)

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
# Accounts live in Firestore by default: Cloud Run's disk is wiped on every
# deploy, so a SQLite file there loses every account. AUTH_STORE=sqlite brings
# back the old local file as an emergency fallback.
AUTH_STORE = os.environ.get('AUTH_STORE', 'firestore').lower()
DB_PATH = os.environ.get('AUTH_DB_PATH', os.path.join(BASE_DIR, 'data', 'users.db'))
FIRESTORE_PROJECT = os.environ.get('GOOGLE_CLOUD_PROJECT', 'smart-crop-hack')
_users = None
_users_lock = threading.Lock()


def users():
    """The user store, connected on first use so startup stays fast."""
    global _users
    with _users_lock:
        if _users is None:
            if AUTH_STORE == 'sqlite':
                _users = SqliteUserStore(DB_PATH)
            else:
                _users = FirestoreUserStore(FIRESTORE_PROJECT)  # raises StoreUnavailable
        return _users


@app.errorhandler(StoreUnavailable)
def _store_unavailable(exc):
    print(f'User store unavailable: {exc}')
    return jsonify(error='Accounts are temporarily unavailable. Please try again shortly.',
                   code='store_unavailable'), 503


def _user_json(row):
    return {'id': row['id'], 'phone': row['phone'], 'username': row['username'],
            'email': row['email'], 'hasPin': row['pin_hash'] is not None,
            'hasGoogle': row['google_sub'] is not None, 'createdAt': row['created_at']}


def _current_user():
    user_id = session.get('user_id')
    if not user_id:
        return None
    row = users().get(user_id)
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
                   googleClientId=GOOGLE_CLIENT_ID if google_id_token else None,
                   googleSignIn=google_id_token is not None)  # via Firebase Auth


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
        row = users().create(username, phone=phone, pin_hash=generate_password_hash(pin))
    except DuplicateError:
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
    row = users().by_phone(phone)
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
    body = request.get_json(silent=True) or {}
    failed = jsonify(error='Google sign-in failed. Please try again.', code='google_failed'), 401
    if google_id_token is None:
        return jsonify(error='Google sign-in is not configured.', code='google_unconfigured'), 503
    if body.get('idToken'):
        # Firebase Auth: the token is for our Firebase project, and must come
        # from a Google sign-in (not e.g. an anonymous Firebase user).
        try:
            info = google_id_token.verify_firebase_token(
                body['idToken'], google_requests.Request(), audience=FIRESTORE_PROJECT)
        except ValueError:
            return failed
        firebase = (info or {}).get('firebase', {})
        google_ids = firebase.get('identities', {}).get('google.com') or []
        if firebase.get('sign_in_provider') != 'google.com' or not google_ids:
            return failed
        # Key accounts on the Google account id, which is the same id the old
        # Google Identity Services sign-in stored — existing links keep working.
        info = {**info, 'sub': google_ids[0]}
    else:
        if not GOOGLE_CLIENT_ID:
            return jsonify(error='Google sign-in is not configured.', code='google_unconfigured'), 503
        try:
            info = google_id_token.verify_oauth2_token(
                body.get('credential') or '', google_requests.Request(), GOOGLE_CLIENT_ID)
        except ValueError:
            return failed
    sub = info['sub']
    email = info.get('email')
    current = _current_user()
    is_new = False
    taken = jsonify(error='This Google account is already linked to another profile.',
                    code='google_taken'), 409
    row = users().by_google_sub(sub)
    try:
        if current is not None and current['google_sub'] is None:
            if row is not None and row['id'] != current['id']:
                return taken
            row = users().update(current['id'], google_sub=sub, email=email)
        elif row is None:
            username = (info.get('name') or (email or 'farmer').split('@')[0]).strip()[:60]
            row = users().create(username, google_sub=sub, email=email)
            is_new = True
    except DuplicateError:  # lost a race for this Google account
        return taken
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
        row = users().update(row['id'], phone=phone)
    except DuplicateError:
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
    row = users().update(row['id'], pin_hash=generate_password_hash(pin))
    return jsonify(user=_user_json(row))


@app.post('/api/auth/profile')
def auth_profile():
    row = _current_user()
    if row is None:
        return jsonify(error='Not signed in', code='not_signed_in'), 401
    username = ((request.get_json(silent=True) or {}).get('username') or '').strip()
    if not username or len(username) > 60:
        return jsonify(error='Enter your name.', code='invalid_username'), 400
    row = users().update(row['id'], username=username)
    return jsonify(user=_user_json(row))


@app.post('/api/auth/delete')
def auth_delete():
    row = _current_user()
    if row is None:
        return jsonify(error='Not signed in', code='not_signed_in'), 401
    users().delete(row['id'])
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


# ---- The signed-in farmer's farm (plan Task 19) ------------------------------
# One farm per account, so the dashboard shows the same farm on every device.
# Only known fields are kept, with checked types and lengths.
FARM_TEXT = {'name': 120, 'district': 80, 'state': 80, 'crop': 120}
SOIL_KEYS = ('n', 'p', 'k', 'ph')


def _number_or_blank(value, low, high):
    if value in ('', None):
        return ''
    number = float(value)  # ValueError / TypeError → 400
    if not (low <= number <= high):
        raise ValueError
    return number


def _clean_farm(farm):
    clean = {k: str(farm.get(k) or '')[:limit] for k, limit in FARM_TEXT.items()}
    lat, lng = farm.get('lat'), farm.get('lng')
    clean['lat'] = None if lat is None else float(lat)
    clean['lng'] = None if lng is None else float(lng)
    if clean['lat'] is not None and not -90 <= clean['lat'] <= 90:
        raise ValueError
    if clean['lng'] is not None and not -180 <= clean['lng'] <= 180:
        raise ValueError
    clean['area'] = _number_or_blank(farm.get('area'), 0, 100000)
    return clean


def _clean_soil(soil):
    clean = {k: _number_or_blank(soil.get(k), 0, 14 if k == 'ph' else 100000) for k in SOIL_KEYS}
    clean['source'] = str(soil.get('source') or '')[:80]
    return clean


def _signed_in_or_401():
    row = _current_user()
    if row is None:
        return None, (jsonify(error='Log in to keep your farm on all your devices.',
                              code='not_signed_in'), 401)
    return row, None


@app.get('/api/farm')
def farm_get():
    row, refusal = _signed_in_or_401()
    if refusal:
        return refusal
    saved = users().get_farm(row['id']) or {}
    return jsonify(farm=saved.get('farm'), soil=saved.get('soil'), updated_at=saved.get('updated_at'))


@app.post('/api/farm')
def farm_save():
    """Body: {farm?: {...}, soil?: {...}}. A section that is sent replaces the
    saved one; a section left out is kept."""
    row, refusal = _signed_in_or_401()
    if refusal:
        return refusal
    body = request.get_json(silent=True) or {}
    saved = users().get_farm(row['id']) or {}
    try:
        if isinstance(body.get('farm'), dict):
            saved['farm'] = _clean_farm(body['farm'])
        if isinstance(body.get('soil'), dict):
            saved['soil'] = _clean_soil(body['soil'])
    except (TypeError, ValueError):
        return jsonify(error='Some farm or soil values are not valid numbers.', code='bad_request'), 400
    saved.pop('updated_at', None)
    saved = users().set_farm(row['id'], saved)
    return jsonify(farm=saved.get('farm'), soil=saved.get('soil'), updated_at=saved['updated_at'])


@app.delete('/api/farm')
def farm_delete():
    row, refusal = _signed_in_or_401()
    if refusal:
        return refusal
    users().delete_farm(row['id'])
    return jsonify(ok=True)


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
_ee_failed_at = 0.0
_ee_lock = threading.Lock()
EE_RETRY_AFTER = 300  # a failed connection is retried after 5 minutes, not never


def _get_ee():
    """Connect to Earth Engine once per container, not once per request —
    ee.Initialize takes several seconds, which every farmer would otherwise pay."""
    global _ee, _ee_error, _ee_failed_at
    with _ee_lock:
        if _ee is None and (_ee_error is None or time.time() - _ee_failed_at > EE_RETRY_AFTER):
            try:
                from crop_model.earth_engine.client import initialize
                _ee = initialize()
                _ee_error = None
            except Exception as exc:  # noqa: BLE001 — surface any failure to the API
                # client.py wraps the real error in a generic "run earthengine
                # authenticate" message, which is misleading on a server.
                cause = exc.__cause__ or exc
                _ee_error = f'{type(cause).__name__}: {cause}'
                _ee_failed_at = time.time()
        return _ee


@app.get('/api/satellite/health')
def satellite_health():
    """Checks Earth Engine is reachable with this server's credentials."""
    ee = _get_ee()
    if ee is None:
        return jsonify(ok=False, error=_ee_error, code='earth_engine_unavailable'), 503
    return jsonify(ok=True, project=os.environ.get('EARTH_ENGINE_PROJECT_ID'),
                   test=ee.Number(1).add(1).getInfo())


SATELLITE_TTL = 24 * 3600  # new Sentinel-2 photos arrive every few days at most
_satellite_cache = {}
_satellite_lock = threading.Lock()


def _ndvi_status(ndvi):
    if ndvi is None:
        return None
    return 'poor' if ndvi < 0.2 else 'moderate' if ndvi < 0.4 else 'good' if ndvi < 0.6 else 'very_good'


def _round(value, digits):
    return None if value is None else round(float(value), digits)


@app.post('/api/satellite')
def satellite():
    """Field health from space for one farm: Sentinel-2 NDVI plus CHIRPS rain
    and ERA5 temperature/soil moisture, from Percy's get_current_field_environment.
    Cached 24 h per ~110 m, because one Earth Engine call takes 10-30 s."""
    body = request.get_json(silent=True) or {}
    try:
        lat, lng = float(body['latitude']), float(body['longitude'])
    except (KeyError, TypeError, ValueError):
        return jsonify(error='latitude and longitude are required numbers.', code='bad_coordinates'), 400
    if not (-90 <= lat <= 90 and -180 <= lng <= 180):
        return jsonify(error='latitude and longitude are out of range.', code='bad_coordinates'), 400

    try:
        return jsonify(_satellite_reading(lat, lng))
    except SatelliteError as err:
        return jsonify(error=str(err), code=err.code, details=err.details), err.status


class SatelliteError(Exception):
    def __init__(self, message, status, code, details=None):
        super().__init__(message)
        self.status, self.code, self.details = status, code, details


def _satellite_reading(lat, lng):
    """The /api/satellite reply for a point — from the 24 h cache when possible.
    Raises SatelliteError. Shared with /api/recommend-crop."""
    key = f'{lat:.3f},{lng:.3f}'
    with _satellite_lock:
        hit = _satellite_cache.get(key)
    if hit and hit[0] > time.time():
        return {**hit[1], 'meta': {**hit[1]['meta'], 'source': 'cache'}}

    ee = _get_ee()
    if ee is None:
        raise SatelliteError('Satellite data is not available right now.', 503,
                             'earth_engine_unavailable', _ee_error)
    try:
        from crop_model.earth_engine.feature_builder import get_current_field_environment
        env = get_current_field_environment(lat, lng, ee_module=ee)
    except Exception as exc:  # noqa: BLE001 — Earth Engine raises many kinds
        app.logger.warning('Earth Engine request failed for %s: %s', key, exc)
        raise SatelliteError('Could not read satellite data right now. Please try again later.', 502,
                             'earth_engine_error', f'{type(exc).__name__}: {exc}') from exc

    ndvi = _round(env.get('current_ndvi'), 3)
    result = {
        'ndvi': ndvi,
        'ndvi_status': _ndvi_status(ndvi),
        'observation_count': env.get('ndvi_observation_count', 0),
        'quality_flag': env.get('ndvi_quality_flag'),
        'rainfall_30d': _round(env.get('recent_rainfall'), 1),
        'temperature': _round(env.get('recent_temperature'), 1),
        'soil_moisture': _round(env.get('soil_moisture'), 3),
        'window_days': 30,
        'buffer_m': 1000,
        'meta': {'source': 'live', 'generated_at': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()),
                 'datasets': ['COPERNICUS/S2_SR_HARMONIZED', 'UCSB-CHG/CHIRPS/DAILY',
                              'ECMWF/ERA5_LAND/DAILY_AGGR']},
    }
    with _satellite_lock:
        if len(_satellite_cache) > 2000:  # keep memory bounded
            _satellite_cache.clear()
        _satellite_cache[key] = (time.time() + SATELLITE_TTL, result)
    return result


# ---- Crop advice with confidence (plan Task 27) -----------------------------
# The crop model is sure of itself even on inputs it never saw in training
# (pH 4.1, N 5, 20 mm rain -> "mothbeans 88%"). input_guard checks the inputs
# against the training data (guard.pkl, fitted from
# crop_recommendation_extended.csv) and pulls the confidence down when they
# fall outside it.
GUARD_PATH = os.path.join(BASE_DIR, 'guard.pkl')
_guard = None
_guard_error = None
_guard_lock = threading.Lock()


def _get_guard():
    global _guard, _guard_error
    with _guard_lock:
        if _guard is None and _guard_error is None:
            try:
                from input_guard import InputGuard
                _guard = InputGuard.load(GUARD_PATH)
            except Exception as exc:  # noqa: BLE001 — advice still works, just without this check
                _guard_error = f'{type(exc).__name__}: {exc}'
                app.logger.warning('Input guard unavailable: %s', _guard_error)
        return _guard


EXPLAIN_TTL = 3600  # same inputs → same explanation for an hour; saves Gemini calls
_explain_cache = {}
_explain_lock = threading.Lock()
CONFIDENCE_WORDS = {'high': 'High', 'medium': 'Medium', 'low': 'Low'}


def _confidence_reasons(recs, data_quality, soil_source):
    top = recs[0]['final_score'] if recs else 0.0
    gap = top - recs[1]['final_score'] if len(recs) > 1 else top
    reasons = [f'Top crop scores {round(top * 100)}%, '
               f'{round(gap * 100)} points ahead of the next one.']
    if data_quality.get('regional_model') != 'available':
        reasons.append('No regional model for your district yet, so confidence is lowered one step.')
    if data_quality.get('earth_engine') != 'available':
        reasons.append('Satellite data for your farm was not available, so confidence is lowered one step.')
    if soil_source != 'card':
        reasons.append('Soil values were typed by hand, not read from a Soil Health Card.')
    return reasons


def _explain_ranking(recs, inputs, level, language):
    """One Gemini call that explains the ranking — never changes it. Cached."""
    key = json.dumps([[r['crop'] for r in recs], inputs, level, language], sort_keys=True)
    with _explain_lock:
        hit = _explain_cache.get(key)
    if hit and hit[0] > time.time():
        return hit[1]
    ranking = ', '.join(f'{i + 1}. {r["crop"]} ({round(r["final_score"] * 100)}%)' for i, r in enumerate(recs))
    prompt = (
        'You explain crop advice to a small farmer in India, in simple words. '
        f'Our crop model ranked: {ranking}. Confidence: {level}. '
        f'It used these field values: {json.dumps(inputs)} '
        '(N, P, K in kg/ha; temperature in °C; humidity in %; rainfall = mm this season). '
        'In at most 3 short sentences, say why the first crop suits these values. '
        'Do not change the order, do not suggest any other crop, and use only the numbers given. '
        f'If confidence is low, say first that a soil test would make the advice more reliable. '
        f'Reply only in {language}.'
    )
    _, text = _gemini_generate([{'text': prompt}])
    text = text.strip()
    with _explain_lock:
        if len(_explain_cache) > 500:
            _explain_cache.clear()
        _explain_cache[key] = (time.time() + EXPLAIN_TTL, text)
    return text


@app.post('/api/recommend-crop')
def recommend_crop():
    """Top 3 crops with an honest confidence level. Scores and confidence come
    from Percy's crop_model.recommend.recommend_crops (bundle.pkl + Earth Engine
    context); Gemini only explains the ranking, and only when asked (explain)."""
    body = request.get_json(silent=True) or {}
    lat, lng = body.get('latitude'), body.get('longitude')
    try:
        lat, lng = (float(lat), float(lng)) if lat is not None and lng is not None else (None, None)
    except (TypeError, ValueError):
        return jsonify(error='latitude and longitude must be numbers.', code='bad_coordinates'), 400

    # The satellite reading the page already asked for is normally cached, so
    # this is instant; without a position the model runs without it.
    environment = {}
    if lat is not None:
        try:
            sat = _satellite_reading(lat, lng)
            if sat.get('ndvi') is not None or sat.get('rainfall_30d') is not None:
                environment = {'current_ndvi': sat.get('ndvi'), 'ndvi_quality': sat.get('quality_flag'),
                               'recent_rainfall': sat.get('rainfall_30d'),
                               'recent_temperature': sat.get('temperature')}
        except SatelliteError:
            pass  # recommend_crops lowers the confidence and says why

    from crop_model.recommend import recommend_crops
    try:
        result = recommend_crops(
            body.get('state'), body.get('district'), body.get('season'),
            body.get('N'), body.get('P'), body.get('K'), body.get('ph'),
            body.get('temperature'), body.get('humidity'), body.get('rainfall'),
            latitude=lat, longitude=lng, top_k=5, environment=environment)
    except ValueError as exc:
        return jsonify(error=str(exc), code='bad_request'), 400

    recs = result['recommendations'][:3]
    level = recs[0]['confidence'] if recs else 'low'
    soil_source = body.get('soil_source')
    inputs = {k: body.get(k) for k in ('N', 'P', 'K', 'ph', 'temperature', 'humidity', 'rainfall')}
    reasons = _confidence_reasons(result['recommendations'], result['data_quality'], soil_source)

    # Are these inputs like the ones the model learned from? Outside → low;
    # unusual → one step down. The reasons say which value and why.
    guard, input_check = _get_guard(), None
    if guard is not None:
        verdict = guard.check({k: float(v) for k, v in inputs.items()})
        input_check = {'status': verdict.status, 'headline': verdict.headline, 'reasons': verdict.reasons}
        if verdict.status == 'reject':
            level = 'low'
            reasons.insert(0, f'{verdict.headline} ' + ' '.join(verdict.reasons))
        elif verdict.status == 'caution':
            level = {'high': 'medium', 'medium': 'low'}.get(level, 'low')
            reasons.insert(0, f'{verdict.headline} ' + ' '.join(verdict.reasons))
    else:
        reasons.append('The input check is not available, so unusual readings are not caught.')

    if level == 'low':
        action = 'soil_test' if soil_source != 'card' else 'expert_review'
    else:
        action = None
    reply = {
        'recommendations': [{'crop': r['crop'], 'rank': i + 1, 'score': round(r['final_score'], 4),
                             'agronomic_score': r['agronomic_score'], 'regional_score': r['regional_score']}
                            for i, r in enumerate(recs)],
        'confidence_level': level,
        'confidence_reasons': reasons,
        'input_check': input_check,
        'action_required': action,
        'explanation': None,
        'explanation_language': None,
        'inputs_used': inputs,
        'environment': result['environment'],
        'data_quality': result['data_quality'],
        'meta': {'source': 'live', 'model': 'bundle.pkl',
                 'generated_at': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())},
    }
    if body.get('explain') and recs:
        language = LANGUAGE_NAMES.get(body.get('language', 'en'), 'English')
        try:
            reply['explanation'] = _explain_ranking(recs, inputs, level, language)
            reply['explanation_language'] = body.get('language', 'en')
        except GeminiError as err:
            # The ranking stands without Gemini; the page shows why there is no explanation.
            reply['explanation_error'] = {'error': str(err), 'code': err.code, 'status': err.status}
    return jsonify(reply)


class GeminiError(Exception):
    def __init__(self, message, status=502, code='gemini_error', details=None):
        super().__init__(message)
        self.status, self.code, self.details = status, code, details


def _gemini_models():
    """Main model first, then the backup. Each model has its own free daily
    limit, so the backup also keeps answering once the main one runs out."""
    main = os.getenv('GEMINI_MODEL', 'gemini-3.8-flash')
    backup = os.getenv('GEMINI_FALLBACK_MODEL', 'gemini-3.7-flash')
    return [main] + ([backup] if backup and backup != main else [])


def _gemini_generate(parts, response_schema=None, timeout=60):
    """Call Gemini. A busy model (500/503) is retried once, then the backup
    model is tried; a model at its limit (429) goes straight to the backup,
    because retrying it only wastes a call. Returns (model, text).
    With response_schema, the text is JSON."""
    api_key = os.getenv('GEMINI_API_KEY')
    if not api_key:
        raise GeminiError('Gemini API key not configured.', 503, 'gemini_unconfigured')
    payload = {'contents': [{'role': 'user', 'parts': parts}]}
    if response_schema:
        payload['generationConfig'] = {'responseMimeType': 'application/json',
                                       'responseSchema': response_schema}
    failures = []  # (model, HTTP code) for each model that could not answer
    for model in _gemini_models():
        url = f'https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent'
        for attempt in (1, 2):
            req = urllib.request.Request(
                url, data=json.dumps(payload).encode(), method='POST',
                # Key in a header rather than the URL, so it cannot leak into logs.
                headers={'Content-Type': 'application/json', 'x-goog-api-key': api_key})
            try:
                with urllib.request.urlopen(req, timeout=timeout) as resp:
                    result = json.load(resp)
            except urllib.error.HTTPError as exc:
                if exc.code in (500, 503) and attempt == 1:
                    time.sleep(1.5)
                    continue
                if exc.code in (429, 500, 503):
                    failures.append((model, exc.code))
                    break  # this model can't answer now: try the next one
                raise GeminiError('Gemini service error', 502, 'gemini_error',
                                  f'HTTP {exc.code} ({model})') from exc
            except (urllib.error.URLError, OSError) as exc:
                raise GeminiError('Could not reach Gemini.', 502, 'gemini_unreachable', str(exc)) from exc
            try:
                # Skip "thought" parts that thinking models may return before the answer.
                text = ''.join(p.get('text', '') for p in result['candidates'][0]['content']['parts']
                               if not p.get('thought'))
            except (KeyError, IndexError, TypeError) as exc:
                raise GeminiError('Gemini returned no answer.', 502, 'gemini_empty') from exc
            return model, text
    details = ', '.join(f'{model}: HTTP {code}' for model, code in failures)
    if all(code == 429 for _, code in failures):
        raise GeminiError('Gemini has reached today’s free limit. Please try again tomorrow.',
                          429, 'gemini_quota', details)
    raise GeminiError('Gemini is busy right now. Please try again in a moment.',
                      503, 'gemini_busy', details)


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

# Autocomplete searches all of India evenly for these place types. (Text
# Search was tried first: it ranks businesses near the caller, so "Anand"
# returned Pune restaurants rather than Anand, Gujarat.) Google allows 5.
AUTOCOMPLETE_TYPES = ['locality', 'sublocality', 'administrative_area_level_2',
                      'administrative_area_level_3', 'administrative_area_level_4']
# A session token ties a farmer's keystrokes and their final pick into one
# billed session; placeIds are Google's opaque ids.
_SAFE_TOKEN = re.compile(r'[A-Za-z0-9_-]{1,128}')
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
    """Suggestions while the farmer types. Names only — no coordinates; the
    pick is resolved by /api/place. Returns {name, detail, label, placeId}."""
    query = request.args.get('q', '').strip()[:100]
    if len(query) < 2:
        return jsonify(places=[])
    cache_key = f'autocomplete:{query.lower()}'
    cached = _places_cache_get(cache_key)
    if cached is not None:
        return jsonify(places=cached, meta={'source': 'cache'})
    body = {'input': query, 'languageCode': 'en', 'includedRegionCodes': ['in'],
            'includedPrimaryTypes': AUTOCOMPLETE_TYPES}
    session = request.args.get('session', '')
    if _SAFE_TOKEN.fullmatch(session):
        body['sessionToken'] = session
    try:
        req = urllib.request.Request(
            'https://places.googleapis.com/v1/places:autocomplete', method='POST',
            data=json.dumps(body).encode(),
            headers={'Content-Type': 'application/json', 'X-Goog-Api-Key': _maps_key()})
        data = _maps_fetch(req)
    except MapsError as err:
        return jsonify(error=str(err), code=err.code), err.status

    results = []
    for suggestion in data.get('suggestions', []):
        prediction = suggestion.get('placePrediction')
        if not prediction or not prediction.get('placeId'):
            continue
        fmt = prediction.get('structuredFormat', {})
        name = fmt.get('mainText', {}).get('text', '')
        detail = fmt.get('secondaryText', {}).get('text', '')
        detail = detail[:-len(', India')] if detail.endswith(', India') else detail
        results.append({'name': name, 'detail': detail,
                        'label': ', '.join(p for p in (name, detail) if p),
                        'placeId': prediction['placeId'], 'source': 'search'})
    _places_cache_set(cache_key, results)
    return jsonify(places=results, meta={'source': 'live'})


@app.get('/api/place')
def place_details():
    """The place a farmer picked: coordinates, district and state, in the
    shape the planner uses {name, state, district, lat, lng, label}."""
    place_id = request.args.get('id', '')
    if not _SAFE_TOKEN.fullmatch(place_id):
        return jsonify(error='A valid place id is required.', code='bad_place_id'), 400
    cache_key = f'place:{place_id}'
    cached = _places_cache_get(cache_key)
    if cached is not None:
        return jsonify(cached)
    params = {'languageCode': 'en'}
    session = request.args.get('session', '')
    if _SAFE_TOKEN.fullmatch(session):
        params['sessionToken'] = session  # closes the billed autocomplete session
    try:
        req = urllib.request.Request(
            f'https://places.googleapis.com/v1/places/{place_id}?'
            + urllib.parse.urlencode(params),
            headers={'X-Goog-Api-Key': _maps_key(),
                     'X-Goog-FieldMask': 'displayName,location,addressComponents'})
        place = _maps_fetch(req)
    except MapsError as err:
        return jsonify(error=str(err), code=err.code), err.status
    comps = place.get('addressComponents', [])
    location = place.get('location') or {}
    if location.get('latitude') is None:
        return jsonify(error='No location for this place.', code='no_location'), 404
    result = _place_shape(
        name=(place.get('displayName') or {}).get('text', ''),
        district=(_component(comps, 'administrative_area_level_3', 'longText')
                  or _component(comps, 'administrative_area_level_2', 'longText')),
        state=_component(comps, 'administrative_area_level_1', 'longText'),
        lat=location['latitude'], lng=location['longitude'], source='search')
    _places_cache_set(cache_key, result)
    return jsonify(result)


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
    """Farm chat for the Krishi Sahayak widget (and the dashboard). Gemini,
    through the shared helper. Accepts an optional photo as a data URL."""
    body = request.get_json(silent=True) or {}
    question = body.get('question') or ''
    if not isinstance(question, str):
        return jsonify(error='A question is required'), 400
    question = question.strip()[:2000]
    image_data = body.get('image_data') or ''
    if not question and not image_data:
        return jsonify(error='A question is required'), 400
    # Only the widget's own four languages; anything else falls back to English.
    language = body.get('language') if body.get('language') in LANGUAGE_NAMES.values() else 'English'
    context = body.get('context') if isinstance(body.get('context'), dict) else {}
    history = []
    for turn in (body.get('history') if isinstance(body.get('history'), list) else [])[-6:]:
        if isinstance(turn, dict) and turn.get('role') in ('user', 'assistant'):
            history.append(f"{turn['role']}: {str(turn.get('content', ''))[:1000]}")

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
    question_text = question or 'What do you see in this photo, and what should I do?'
    lines = [
        instructions,
        '',
        f'Field context: {json.dumps(context)}',
        'Conversation so far:',
        *(history or ['(none)']),
        f'Farmer question: {question_text}',
    ]
    prompt = '\n'.join(lines)
    parts = [{'text': prompt}]
    if image_data:
        match = re.fullmatch(r'data:(image/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)', image_data)
        if not match or len(image_data) > 10 * 1024 * 1024:
            return jsonify(error='Attach a JPG, PNG or WebP photo under about 7 MB.'), 400
        parts.insert(0, {'inline_data': {'mime_type': match.group(1), 'data': match.group(2)}})
    try:
        _, answer = _gemini_generate(parts)
    except GeminiError as err:
        return _gemini_error_response(err)
    if not answer.strip():
        return jsonify(error='Kisan AI is temporarily unavailable'), 502
    return jsonify(answer=answer.strip(), sources=[])


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
