# Existing Crop Model Analysis

## Current architecture

The primary application is a vanilla HTML/CSS/JavaScript frontend served by `server.py`. The Flask `POST /api/recommend` route parses seven numeric values, creates a one-row pandas frame, calls the serialized model, and returns the five highest probability classes. The browser uses this route and has a local fallback ranking path.

## Model type and serialization

`bundle.pkl` is loaded with `joblib.load`. The bundle contains a `model` object, verified as a `sklearn.calibration.CalibratedClassifierCV` with 25 classes and `predict_proba`. Its calibrated base model is XGBoost-backed. The model was serialized with older XGBoost/scikit-learn versions, so loading currently emits compatibility warnings and should be pinned or re-exported before production use.

## Features and target

The current feature order is `N`, `P`, `K`, `temperature`, `humidity`, `ph`, `rainfall`. The target is the crop class. `server.py` currently carries a 25-label list: apple, banana, blackgram, chickpea, coconut, coffee, cotton, grapes, jute, kidneybeans, lentil, maize, mango, mothbeans, mungbean, muskmelon, orange, papaya, pigeonpeas, pomegranate, rice, soybean, sugarcane, watermelon, and wheat.

## Training dataset and preprocessing

The original agronomic training CSV is not present in this checkout, reachable git history, or the broader hackathon directory searched on Day 1. The repository therefore does not expose the training split, preprocessing fit, or training script. The inference path accepts numeric values directly and validates basic physical ranges, including pH and humidity. The serialized estimator reports feature names matching the seven-field contract.

## Identified weaknesses

- The training provenance, split, preprocessing fit, and evaluation metrics are not reproducible from this repository alone.
- The fixed label list is maintained separately from the serialized estimator; it should be compared with `model.classes_` before deployment.
- No regional or temporal validation is visible, so excellent random-split scores would not establish geographic generalization.
- Environmental Earth Engine variables must be pre-sowing features; seasonal or post-harvest observations would leak the outcome.

## Components to reuse

Reuse `bundle.pkl`, the seven-feature input contract, the Flask route validation, and the browser's existing response shape. The new `crop_model/predict.py` wraps the same model with validation and returns probability-backed top-k records without changing the existing API.