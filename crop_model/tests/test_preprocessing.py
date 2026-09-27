import pandas as pd

from crop_model.preprocessing import build_training_base, clean_production_frame, make_environment_keys


def sample():
    return pd.DataFrame([
        {"State_Name": " Maharashtra ", "District_Name": " Pune", "Crop_Year": "2010", "Season": "Kharif   ", "Crop": " Rice ", "Area": "2", "Production": "6"},
        {"State_Name": "Maharashtra", "District_Name": "Pune", "Crop_Year": "2010", "Season": "Kharif", "Crop": "Rice", "Area": "2", "Production": "6"},
        {"State_Name": "Maharashtra", "District_Name": "Pune", "Crop_Year": "2011", "Season": "Rabi", "Crop": "Wheat", "Area": "0", "Production": "3"},
        {"State_Name": "Maharashtra", "District_Name": "Pune", "Crop_Year": "2011", "Season": "Rabi", "Crop": "Wheat", "Area": "1", "Production": ""},
    ])


def test_cleaning_and_training_filters():
    clean = clean_production_frame(sample())
    assert len(clean) == 3
    assert clean.iloc[0]["Season"] == "Kharif"
    assert clean["Crop_Year"].dtype.kind in "if"
    training = build_training_base(clean)
    assert len(training) == 1
    assert training.iloc[0]["Yield"] == 3
    assert training.iloc[0]["Yield_Percentile"] == 1


def test_environment_keys_are_unique():
    clean = clean_production_frame(sample())
    assert len(make_environment_keys(clean)) == 2