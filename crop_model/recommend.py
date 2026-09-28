"""Recommendation orchestration for the baseline crop model.

The baseline model remains the source of crop scores.  Earth Engine data is
contextual until a separately trained regional model is available.
"""

import json
import math
from pathlib import Path

import joblib
import numpy as np

from .config import MODEL_PATH
from .predict import predict_agronomic_crops

AGRONOMIC_WEIGHT = 0.70
REGIONAL_WEIGHT = 0.30
_REGIONAL_CANDIDATES = (
    Path(__file__).with_name("regional_model.pkl"),
    Path(__file__).with_name("regional_model.joblib"),
    Path(__file__).parent / "data" / "regional_model.pkl",
    Path(__file__).parent / "data" / "regional_model.joblib",
)
_CONFIDENCE_LEVELS = ("low", "medium", "high")


def _number(name, value):
    if value is None:
        raise ValueError(f"{name} is required")
    try:
        value = float(value)
    except (TypeError, ValueError) as exc:
        raise ValueError(f"{name} must be a finite number") from exc
    if not math.isfinite(value):
        raise ValueError(f"{name} must be a finite number")
    return value


def _validate_inputs(N, P, K, ph, temperature, humidity, rainfall, latitude, longitude, top_k):
    values = {name: _number(name, value) for name, value in {
        "N": N, "P": P, "K": K, "ph": ph, "temperature": temperature,
        "humidity": humidity, "rainfall": rainfall,
    }.items()}
    for name in ("N", "P", "K", "rainfall"):
        if values[name] < 0:
            raise ValueError(f"{name} must be non-negative")
    if not 0 < values["ph"] <= 14:
        raise ValueError("pH must be greater than 0 and at most 14")
    if not 0 <= values["humidity"] <= 100:
        raise ValueError("humidity must be between 0 and 100")
    if latitude is not None and not -90 <= _number("latitude", latitude) <= 90:
        raise ValueError("latitude must be between -90 and 90")
    if longitude is not None and not -180 <= _number("longitude", longitude) <= 180:
        raise ValueError("longitude must be between -180 and 180")
    if isinstance(top_k, bool) or not isinstance(top_k, (int, np.integer)) or top_k <= 0:
        raise ValueError("top_k must be a positive integer")
    return values


def _regional_model():
    for path in _REGIONAL_CANDIDATES:
        if path.exists():
            bundle = joblib.load(path)
            model = bundle.get("model", bundle) if isinstance(bundle, dict) else bundle
            return model, path
    return None, None


def _regional_scores(model, crops, environmental):
    """Best-effort adapter for a future regional classifier.

    No regional artifact is currently shipped.  Once one exists, this accepts
    either a probability classifier or a predictor returning one score per
    crop; unsupported interfaces are treated as unavailable.
    """
    if model is None or not environmental:
        return None
    features = {key: value for key, value in environmental.items() if isinstance(value, (int, float))}
    try:
        if hasattr(model, "predict_proba"):
            probabilities = np.asarray(model.predict_proba([features])[0], dtype=float)
            classes = getattr(model, "classes_", range(len(probabilities)))
            by_crop = {str(label): float(score) for label, score in zip(classes, probabilities)}
            return {crop: by_crop.get(crop) for crop in crops}
        if hasattr(model, "predict"):
            values = np.asarray(model.predict([features])[0], dtype=float).reshape(-1)
            if len(values) == len(crops):
                return dict(zip(crops, values.tolist()))
    except Exception:
        return None
    return None


def _normalise(value):
    if value is None or not math.isfinite(float(value)):
        return None
    return max(0.0, min(1.0, float(value)))


def _confidence(scores, regional_available, environment_available):
    top = scores[0]["final_score"] if scores else 0.0
    gap = top - scores[1]["final_score"] if len(scores) > 1 else top
    level = "high" if top >= 0.75 and gap >= 0.10 else "medium" if top >= 0.55 else "low"
    missing = (not regional_available) or (not environment_available)
    if missing and level != "low":
        level = _CONFIDENCE_LEVELS[_CONFIDENCE_LEVELS.index(level) - 1]
    return level


def _environment(state, district, season, latitude, longitude, polygon, use_live):
    if not use_live:
        return {}, "not_requested"
    try:
        from .earth_engine.feature_builder import get_current_field_environment, get_environment_features
        if latitude is not None and longitude is not None:
            return get_current_field_environment(latitude, longitude, polygon=polygon), "available"
        # Historical context is useful even without a field coordinate. The
        # fixed year is explicit and does not alter agronomic model inputs.
        return get_environment_features(state, district, 2010, season), "available"
    except Exception:
        return {}, "unavailable"


def recommend_crops(
    state, district, season, N, P, K, ph, temperature, humidity, rainfall,
    latitude=None, longitude=None, polygon=None, top_k=5, use_live_environment=True,
):
    """Return JSON-compatible crop recommendations and contextual evidence."""
    values = _validate_inputs(N, P, K, ph, temperature, humidity, rainfall, latitude, longitude, top_k)
    predictions = predict_agronomic_crops(**values, top_k=top_k)
    environment, ee_status = _environment(state, district, season, latitude, longitude, polygon, use_live_environment)
    model, _ = _regional_model()
    regional = _regional_scores(model, [item["crop"] for item in predictions], environment)
    regional_available = regional is not None
    recommendations = []
    for item in predictions:
        agronomic_score = _normalise(item["score"])
        regional_score = _normalise(regional.get(item["crop"]) if regional else None)
        final_score = agronomic_score if regional_score is None else AGRONOMIC_WEIGHT * agronomic_score + REGIONAL_WEIGHT * regional_score
        recommendations.append({
            "crop": item["crop"], "final_score": _normalise(final_score),
            "agronomic_score": agronomic_score, "regional_score": regional_score,
        })
    recommendations.sort(key=lambda item: (-item["final_score"], item["crop"]))
    confidence = _confidence(recommendations, regional_available, ee_status == "available")
    for item in recommendations:
        item["confidence"] = confidence
    output_environment = {
        "current_ndvi": environment.get("current_ndvi", environment.get("Preseason_NDVI_Mean")),
        "ndvi_quality": environment.get("ndvi_quality", environment.get("NDVI_Quality_Flag")),
        "recent_rainfall_mm": environment.get("recent_rainfall", environment.get("Rainfall_Previous_30d")),
        "temperature_c": environment.get("recent_temperature", environment.get("Temperature_Mean_C")),
    }
    return {
        "recommendations": recommendations,
        "environment": output_environment,
        "data_quality": {
            "agronomic_model": "available",
            "regional_model": "available" if regional_available else "unavailable",
            "earth_engine": ee_status,
        },
    }


def _json_default(value):
    raise TypeError(f"not JSON serializable: {type(value).__name__}")

