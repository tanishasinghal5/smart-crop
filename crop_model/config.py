from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / "crop_model" / "data"
REPORT_DIR = ROOT / "crop_model" / "reports"
MODEL_PATH = ROOT / "bundle.pkl"

PRODUCTION_CANDIDATES = (
    ROOT / "crop_production.csv" / "crop_production.csv",
    ROOT / "crop_production.csv",
    ROOT / "Crop_Production.csv",
    ROOT / "data" / "crop_production.csv",
    ROOT / "crop_model" / "data" / "crop_production.csv",
)

AGRONOMIC_FEATURES = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]
CROP_LABELS = [
    "apple", "banana", "blackgram", "chickpea", "coconut", "coffee", "cotton",
    "grapes", "jute", "kidneybeans", "lentil", "maize", "mango", "mothbeans",
    "mungbean", "muskmelon", "orange", "papaya", "pigeonpeas", "pomegranate",
    "rice", "soybean", "sugarcane", "watermelon", "wheat",
]

# Approximate pre-sowing windows for Day 1; refine by region and crop on Day 2.
SEASON_CONFIG = {
    "Kharif": {"start_month": 4, "start_day": 1, "end_month": 5, "end_day": 31},
    "Rabi": {"start_month": 9, "start_day": 1, "end_month": 10, "end_day": 31},
    "Summer": {"start_month": 1, "start_day": 1, "end_month": 2, "end_day": 28},
    "Whole Year": {"start_month": 1, "start_day": 1, "end_month": 2, "end_day": 28},
    "Autumn": {"start_month": 7, "start_day": 1, "end_month": 8, "end_day": 31},
    "Winter": {"start_month": 11, "start_day": 1, "end_month": 12, "end_day": 31},
}
