"""TerraByte local server.

Serves the static frontend and two APIs:
  POST /api/recommend  — ML crop recommendation from bundle.pkl
  POST /api/chat       — Mita farm advisor (needs OPENAI_API_KEY + OPENAI_MODEL)

Run:  python3 server.py   (then open http://localhost:8000)
"""
import json
import os
import urllib.request
import warnings

import joblib
import numpy as np
import pandas as pd
from flask import Flask, jsonify, request, send_from_directory

try:
    from flask_cors import CORS
except ImportError:
    CORS = None

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
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


@app.get('/')
def index():
    return send_from_directory(BASE_DIR, 'index.html')


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
    app.run(host='0.0.0.0', port=port, debug=False, ssl_context='adhoc')
