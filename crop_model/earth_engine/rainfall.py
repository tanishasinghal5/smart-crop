DATASET = "UCSB-CHG/CHIRPS/DAILY"


def extract_rainfall(geometry, previous_30_start, previous_60_start, end_date, ee_module=None):
    if ee_module is None:
        from .client import initialize
        ee_module = initialize()
    collection = ee_module.ImageCollection(DATASET).filterBounds(geometry)
    rain30 = collection.filterDate(previous_30_start, end_date).select("precipitation")
    rain60 = collection.filterDate(previous_60_start, end_date).select("precipitation")
    if not rain30.size().getInfo() or not rain60.size().getInfo():
        return {"Rainfall_Previous_30d": None, "Rainfall_Previous_60d": None, "Rainy_Days_Previous_30d": None}
    rain30_sum = rain30.sum().reduceRegion(ee_module.Reducer.mean(), geometry, 5000, bestEffort=True).getInfo()
    rain60_sum = rain60.sum().reduceRegion(ee_module.Reducer.mean(), geometry, 5000, bestEffort=True).getInfo()
    rainy = rain30.map(lambda image: image.gt(1).rename("rainy")).sum()
    rainy_value = rainy.reduceRegion(ee_module.Reducer.mean(), geometry, 5000, bestEffort=True).getInfo()
    return {
        "Rainfall_Previous_30d": rain30_sum.get("precipitation"),
        "Rainfall_Previous_60d": rain60_sum.get("precipitation"),
        "Rainy_Days_Previous_30d": rainy_value.get("rainy"),
    }
