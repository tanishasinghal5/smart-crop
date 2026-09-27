from pathlib import Path

import pandas as pd

TEXT_COLUMNS = ["State_Name", "District_Name", "Season", "Crop"]
REQUIRED_COLUMNS = TEXT_COLUMNS + ["Crop_Year", "Area", "Production"]


def _find_column(frame, expected):
    lookup = {str(column).strip().casefold(): column for column in frame.columns}
    if expected.casefold() not in lookup:
        raise ValueError(f"Missing required column {expected!r}; found {list(frame.columns)!r}")
    return lookup[expected.casefold()]


def _canonical_text(value):
    if pd.isna(value):
        return value
    return " ".join(str(value).strip().split())


def _canonical_season(value):
    value = _canonical_text(value)
    if pd.isna(value):
        return value
    labels = ("Kharif", "Rabi", "Summer", "Whole Year", "Autumn", "Winter")
    folded = value.casefold()
    return next((label for label in labels if label.casefold() == folded), value)


def standardize_columns(frame):
    return frame.rename(columns={_find_column(frame, name): name for name in REQUIRED_COLUMNS})


def clean_production_frame(frame):
    frame = standardize_columns(frame.copy())
    for column in TEXT_COLUMNS:
        frame[column] = frame[column].map(_canonical_text)
    frame["Season"] = frame["Season"].map(_canonical_season)
    for column in ["Crop_Year", "Area", "Production"]:
        frame[column] = pd.to_numeric(frame[column], errors="coerce")
    return frame.drop_duplicates(ignore_index=True)


def build_training_base(clean_frame):
    frame = clean_frame.loc[
        clean_frame["Production"].notna()
        & clean_frame["Area"].notna()
        & (clean_frame["Area"] > 0)
        & (clean_frame["Production"] >= 0)
    ].copy()
    frame["Yield"] = frame["Production"] / frame["Area"]
    frame["Yield_Percentile"] = frame.groupby("Crop")["Yield"].rank(pct=True, method="average")
    bounds = frame.groupby("Crop")["Yield"].quantile([0.01, 0.99]).unstack()
    lower = frame["Crop"].map(bounds[0.01])
    upper = frame["Crop"].map(bounds[0.99])
    frame["Yield_Outlier"] = (frame["Yield"] < lower) | (frame["Yield"] > upper)
    return frame


def make_environment_keys(clean_frame):
    return clean_frame[["State_Name", "District_Name", "Crop_Year", "Season"]].drop_duplicates(
        ignore_index=True
    )


def clean_dataset(source_path, output_dir):
    source_path = Path(source_path)
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    original = pd.read_csv(source_path)
    clean = clean_production_frame(original)
    training = build_training_base(clean)
    keys = make_environment_keys(clean)
    clean.to_csv(output_dir / "clean_crop_production.csv", index=False)
    training.to_csv(output_dir / "training_base.csv", index=False)
    keys.to_csv(output_dir / "environment_keys.csv", index=False)
    return original, clean, training, keys
