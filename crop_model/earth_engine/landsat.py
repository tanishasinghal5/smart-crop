DATASET = "LANDSAT/LT05/C02/T1_L2"
SCALE = 0.0000275
OFFSET = -0.2


def _mask_and_ndvi(image, ee_module):
    qa = image.select("QA_PIXEL")
    clear = qa.bitwiseAnd(1 << 0).eq(0)
    for bit in (1, 2, 3, 4, 5):
        clear = clear.And(qa.bitwiseAnd(1 << bit).eq(0))
    red = image.select("SR_B3").multiply(SCALE).add(OFFSET)
    nir = image.select("SR_B4").multiply(SCALE).add(OFFSET)
    return nir.subtract(red).divide(nir.add(red)).rename("NDVI").updateMask(clear)


def extract_ndvi(geometry, start_date, end_date, ee_module=None):
    if ee_module is None:
        from .client import initialize
        ee_module = initialize()
    collection = (
        ee_module.ImageCollection(DATASET)
        .filterDate(start_date, end_date)
        .filterBounds(geometry)
        .map(lambda image: _mask_and_ndvi(image, ee_module))
    )
    count = collection.size().getInfo()
    if count == 0:
        return {
            "Preseason_NDVI_Mean": None,
            "Preseason_NDVI_Median": None,
            "Preseason_NDVI_Min": None,
            "Preseason_NDVI_Max": None,
            "Preseason_NDVI_Std": None,
            "NDVI_Observation_Count": 0,
            "NDVI_Quality_Flag": "no_valid_observation",
        }
    image = collection.toBands()
    stats = image.reduceRegion(
        reducer=ee_module.Reducer.mean().combine(ee_module.Reducer.median(), "", True)
        .combine(ee_module.Reducer.minMax(), "", True)
        .combine(ee_module.Reducer.stdDev(), "", True),
        geometry=geometry,
        scale=30,
        bestEffort=True,
        maxPixels=1e9,
    ).getInfo()
    # Aggregate the per-scene summaries so the returned fields are stable.
    scene_stats = collection.map(
        lambda image: image.reduceRegion(
            reducer=ee_module.Reducer.mean(), geometry=geometry, scale=30, bestEffort=True
        ).set("scene_mean", image.reduceRegion(
            reducer=ee_module.Reducer.mean(), geometry=geometry, scale=30, bestEffort=True
        ).get("NDVI"))
    ).aggregate_array("scene_mean").getInfo()
    values = [float(value) for value in scene_stats if value is not None]
    if not values:
        return {
            "Preseason_NDVI_Mean": None, "Preseason_NDVI_Median": None,
            "Preseason_NDVI_Min": None, "Preseason_NDVI_Max": None,
            "Preseason_NDVI_Std": None, "NDVI_Observation_Count": 0,
            "NDVI_Quality_Flag": "no_valid_observation",
        }
    values.sort()
    mean = sum(values) / len(values)
    median = values[len(values) // 2] if len(values) % 2 else (values[len(values)//2 - 1] + values[len(values)//2]) / 2
    variance = sum((value - mean) ** 2 for value in values) / len(values)
    return {
        "Preseason_NDVI_Mean": mean,
        "Preseason_NDVI_Median": median,
        "Preseason_NDVI_Min": values[0],
        "Preseason_NDVI_Max": values[-1],
        "Preseason_NDVI_Std": variance ** 0.5,
        "NDVI_Observation_Count": len(values),
        "NDVI_Quality_Flag": "good" if len(values) >= 3 else "limited_observations",
    }