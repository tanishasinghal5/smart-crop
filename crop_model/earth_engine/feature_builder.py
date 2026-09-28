from datetime import date, datetime, timedelta, timezone

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


def get_current_field_environment(latitude, longitude, polygon=None, ee_module=None, days=30):
    """Extract recent Sentinel-2 NDVI plus CHIRPS/ERA5 field context."""
    if ee_module is None:
        from .client import initialize
        ee_module = initialize()
    latitude, longitude = float(latitude), float(longitude)
    geometry = polygon or ee_module.Geometry.Point([longitude, latitude]).buffer(1000)
    end = datetime.now(timezone.utc).date() + timedelta(days=1)
    start = end - timedelta(days=int(days))
    collection = (ee_module.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
                  .filterBounds(geometry).filterDate(start.isoformat(), end.isoformat()))

    def mask_and_ndvi(image):
        qa = image.select("QA60")
        clear = qa.bitwiseAnd(1 << 10).eq(0).And(qa.bitwiseAnd(1 << 11).eq(0))
        ndvi = image.normalizedDifference(["B8", "B4"]).rename("NDVI")
        return ndvi.updateMask(clear)

    count = collection.size().getInfo()
    ndvi = None
    if count:
        # Reduce the image collection to one cloud-masked mean image. Mapping
        # to getInfo()-style scalar values is not a valid server-side EE map.
        reduced = collection.map(mask_and_ndvi).mean().reduceRegion(
            reducer=ee_module.Reducer.mean(), geometry=geometry, scale=10, bestEffort=True
        ).getInfo()
        ndvi = reduced.get("NDVI")
    from .rainfall import extract_rainfall
    from .climate import extract_climate
    rain = extract_rainfall(geometry, (end - timedelta(days=30)).isoformat(),
                            (end - timedelta(days=60)).isoformat(), end.isoformat(), ee_module)
    climate = extract_climate(geometry, start.isoformat(), end.isoformat(), ee_module)
    return {
        "current_ndvi": ndvi,
        "ndvi_observation_count": int(count),
        "ndvi_quality_flag": "good" if ndvi is not None and count >= 3 else "limited_observations" if ndvi is not None else "no_valid_observation",
        "recent_rainfall": rain.get("Rainfall_Previous_30d"),
        "recent_temperature": climate.get("Temperature_Mean_C"),
        "soil_moisture": climate.get("Preseason_Soil_Moisture_Mean"),
    }
