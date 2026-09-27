import math
import warnings

import joblib
import numpy as np
import pandas as pd

from .config import AGRONOMIC_FEATURES, CROP_LABELS, MODEL_PATH


def _load_model(model_path=MODEL_PATH):
    bundle = joblib.load(model_path)
    return bundle["model"] if isinstance(bundle, dict) and "model" in bundle else bundle


def predict_agronomic_crops(N, P, K, temperature, humidity, ph, rainfall, top_k=5, model_path=MODEL_PATH):
    values = [N, P, K, temperature, humidity, ph, rainfall]
    if any(value is None or not math.isfinite(float(value)) for value in values):
        raise ValueError("All agronomic inputs are required finite numbers")
    if not 0 <= float(ph) <= 14:
        raise ValueError("pH must be between 0 and 14")
    if not 0 <= float(humidity) <= 100:
        raise ValueError("Humidity must be between 0 and 100")
    if float(rainfall) < 0 or float(rainfall) > 10000:
        raise ValueError("Rainfall must be between 0 and 10000")
    if any(float(value) < 0 for value in (N, P, K)):
        raise ValueError("N, P, and K must be non-negative")
    if not -50 <= float(temperature) <= 60:
        raise ValueError("Temperature must be between -50 and 60")
    model = _load_model(model_path)
    frame = pd.DataFrame([values], columns=AGRONOMIC_FEATURES)
    if not hasattr(model, "predict_proba"):
        raise TypeError("The loaded model does not expose probabilities")
    with warnings.catch_warnings():
        warnings.simplefilter("ignore")
        probabilities = model.predict_proba(frame)[0]
    classes = getattr(model, "classes_", np.arange(len(probabilities)))
    order = np.argsort(probabilities)[::-1][:max(1, int(top_k))]
    results = []
    for index in order:
        class_id = classes[index]
        crop = CROP_LABELS[int(class_id)] if isinstance(class_id, (int, np.integer)) and int(class_id) < len(CROP_LABELS) else str(class_id)
        results.append({"crop": crop, "score": float(probabilities[index])})
    return results