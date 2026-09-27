from datetime import date, timedelta

from ..config import SEASON_CONFIG
from .boundaries import get_district_geometry
from .climate import extract_climate
from .landsat import extract_ndvi
from .rainfall import extract_rainfall


def get_preseason_dates(year, season):
    try:
        config = SEASON_CONFIG[season]
    except KeyError as exc:
        raise ValueError(f"Unsupported season {season!r}; choose one of {list(SEASON_CONFIG)}") from exc
    start = date(year, config["start_month"], config["start_day"])
    end = date(year, config["end_month"], config["end_day"])
    if end < start:
        raise ValueError("Configured pre-season end date precedes start date")
    return start, end


def get_environment_features(state, district, year, season, ee_module=None):
    if ee_module is None:
        from .client import initialize
        ee_module = initialize()
    start, end = get_preseason_dates(int(year), season)
    geometry = get_district_geometry(state, district, ee_module)
    end_exclusive = end + timedelta(days=1)
    result = {
        "State_Name": state, "District_Name": district, "Crop_Year": int(year), "Season": season,
    }
    result.update(extract_ndvi(geometry, start.isoformat(), end_exclusive.isoformat(), ee_module))
    result.update(extract_rainfall(
        geometry, (end - timedelta(days=29)).isoformat(), (end - timedelta(days=59)).isoformat(),
        end_exclusive.isoformat(), ee_module,
    ))
    result.update(extract_climate(geometry, start.isoformat(), end_exclusive.isoformat(), ee_module))
    result["Data_Quality_Flag"] = "good" if result["NDVI_Quality_Flag"] == "good" else result["NDVI_Quality_Flag"]
    return result