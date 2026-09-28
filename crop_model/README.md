# Day 1 Crop Model Pipeline

This package contains reproducible production-data preparation, the baseline agronomic model interface, and the district-level Earth Engine pilot. The original production CSV is intentionally not modified.

## Setup

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements-crop-model.txt
```

Put the supplied production CSV at `crop_model/data/crop_production.csv`, or pass its path explicitly.

## Data cleaning

```bash
python -m crop_model.clean_data --source /path/to/crop_production.csv
```

This writes `clean_crop_production.csv`, `training_base.csv`, `environment_keys.csv`, and `reports/data_quality_report.md`.

## Earth Engine pilot

```bash
earthengine authenticate
export EARTH_ENGINE_PROJECT_ID="your-google-cloud-project-id"
python -m crop_model.run_pune_pilot
```

The pilot performs a real GAUL Maharashtra/Pune boundary lookup and extracts pre-season April 1 through May 31, 2010 features. Rainfall windows end at May 31 and ERA5-Land soil moisture uses `volumetric_soil_water_layer_1` when available. No mock values are used by the runtime.

## Baseline and tests

The existing model is `bundle.pkl`. Evaluation requires the original seven-feature agronomic dataset, which is absent from this checkout:

```bash
python -m crop_model.train_baseline --dataset /path/to/original_agronomic_dataset.csv
pytest -q
```

## Recommendations

The baseline prediction preserves the model's seven agronomic inputs:

```python
from crop_model.predict import predict_agronomic_crops
predict_agronomic_crops(75, 45, 140, 29.92, 70, 6.6, 650, top_k=5)
```

Use the orchestration layer for a combined result:

```python
from crop_model.recommend import recommend_crops
result = recommend_crops(
    state="Maharashtra", district="Pune", season="Kharif",
    N=75, P=45, K=140, ph=6.6, temperature=29.92,
    humidity=70, rainfall=650, latitude=18.5204, longitude=73.8567,
)
```

`rainfall` above is the rainfall definition used when the agronomic model was trained; it is not replaced with an Earth Engine 30- or 60-day value. Earth Engine values are contextual, and failures return recommendations with `data_quality.earth_engine` set to `unavailable`. No regional model is currently shipped, so the pipeline runs in agronomic-only mode with `regional_score: null`. Set `EARTH_ENGINE_PROJECT_ID` and authenticate with `earthengine authenticate` to enable live context.
