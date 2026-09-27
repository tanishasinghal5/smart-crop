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