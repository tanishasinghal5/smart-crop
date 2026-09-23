DATASET = "ECMWF/ERA5_LAND/DAILY_AGGR"
TEMPERATURE_BANDS = ["temperature_2m", "temperature_2m_min", "temperature_2m_max"]
SOIL_MOISTURE_BAND = "volumetric_soil_water_layer_1"


def extract_climate(geometry, start_date, end_date, ee_module=None):
    if ee_module is None:
        from .client import initialize
        ee_module = initialize()
    collection = ee_module.ImageCollection(DATASET).filterDate(start_date, end_date).filterBounds(geometry)
    if not collection.size().getInfo():
        return {
            "Temperature_Mean_C": None, "Temperature_Min_C": None,
            "Temperature_Max_C": None, "Preseason_Soil_Moisture_Mean": None,
            "Soil_Moisture_Quality_Flag": "no_valid_observation",
        }
    image = collection.select(TEMPERATURE_BANDS).mean()
    result = image.reduceRegion(ee_module.Reducer.mean(), geometry, 10000, bestEffort=True).getInfo()
    output = {
        "Temperature_Mean_C": _celsius(result.get("temperature_2m")),
        "Temperature_Min_C": _celsius(result.get("temperature_2m_min")),
        "Temperature_Max_C": _celsius(result.get("temperature_2m_max")),
    }
    try:
        soil = collection.select(SOIL_MOISTURE_BAND).mean().reduceRegion(
            ee_module.Reducer.mean(), geometry, 10000, bestEffort=True
        ).getInfo()
        output["Preseason_Soil_Moisture_Mean"] = soil.get(SOIL_MOISTURE_BAND)
        output["Soil_Moisture_Quality_Flag"] = "available"
    except Exception:
        output["Preseason_Soil_Moisture_Mean"] = None
        output["Soil_Moisture_Quality_Flag"] = "deferred"
    return output


def _celsius(value):
    return None if value is None else float(value) - 273.15
