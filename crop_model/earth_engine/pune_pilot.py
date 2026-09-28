import os
import ee

# ---------------------------------------------------
# 1. initialize earth engine
# ---------------------------------------------------

PROJECT_ID = os.environ["EARTH_ENGINE_PROJECT_ID"]

ee.Initialize(project=PROJECT_ID)

print("earth engine connected")


# ---------------------------------------------------
# 2. get pune district boundary
# ---------------------------------------------------

districts = (
    ee.FeatureCollection("FAO/GAUL/2025/level2")
    .filter(ee.Filter.eq("GAUL0_NAME", "India"))
    .filter(ee.Filter.eq("GAUL1_NAME", "Maharashtra"))
    .filter(ee.Filter.eq("GAUL2_NAME", "Pune"))
)

count = districts.size().getInfo()

print("pune boundary matches:", count)

if count == 0:
    raise RuntimeError("pune district boundary not found")

pune = districts.geometry()


# ---------------------------------------------------
# 3. landsat 5 preprocessing
# ---------------------------------------------------

def prepare_landsat5(image):

    # cloud/shadow/snow mask from QA_PIXEL
    qa = image.select("QA_PIXEL")

    cloud_mask = (
        qa.bitwiseAnd(1 << 1).eq(0)   # dilated cloud
        .And(qa.bitwiseAnd(1 << 3).eq(0))  # cloud
        .And(qa.bitwiseAnd(1 << 4).eq(0))  # cloud shadow
        .And(qa.bitwiseAnd(1 << 5).eq(0))  # snow
    )

    # scale optical surface reflectance
    optical = (
        image.select(["SR_B3", "SR_B4"])
        .multiply(0.0000275)
        .add(-0.2)
    )

    image = image.addBands(
        optical,
        overwrite=True
    )

    # NDVI = (NIR - RED) / (NIR + RED)
    ndvi = image.normalizedDifference(
        ["SR_B4", "SR_B3"]
    ).rename("NDVI")

    return (
        image
        .updateMask(cloud_mask)
        .addBands(ndvi)
    )


# ---------------------------------------------------
# 4. pre-season NDVI
#    kharif pilot:
#    april 1 to may 31, 2010
# ---------------------------------------------------

landsat = (
    ee.ImageCollection("LANDSAT/LT05/C02/T1_L2")
    .filterBounds(pune)
    .filterDate("2010-04-01", "2010-06-01")
    .map(prepare_landsat5)
)

landsat_count = landsat.size().getInfo()

print("landsat scenes:", landsat_count)

ndvi_collection = landsat.select("NDVI")

ndvi_mean_img = ndvi_collection.mean()
ndvi_median_img = ndvi_collection.median()

ndvi_mean = ndvi_mean_img.reduceRegion(
    reducer=ee.Reducer.mean(),
    geometry=pune,
    scale=30,
    maxPixels=1e9
).get("NDVI").getInfo()

ndvi_median = ndvi_median_img.reduceRegion(
    reducer=ee.Reducer.mean(),
    geometry=pune,
    scale=30,
    maxPixels=1e9
).get("NDVI").getInfo()


# ---------------------------------------------------
# 5. rainfall — CHIRPS
#    previous 60 days
# ---------------------------------------------------

rainfall = (
    ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY")
    .filterDate("2010-04-01", "2010-06-01")
    .select("precipitation")
    .sum()
)

rainfall_mm = rainfall.reduceRegion(
    reducer=ee.Reducer.mean(),
    geometry=pune,
    scale=5500,
    maxPixels=1e9
).get("precipitation").getInfo()


# ---------------------------------------------------
# 6. rainfall — previous 30 days
# ---------------------------------------------------

rainfall_30 = (
    ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY")
    .filterDate("2010-05-01", "2010-06-01")
    .select("precipitation")
    .sum()
)

rainfall_30_mm = rainfall_30.reduceRegion(
    reducer=ee.Reducer.mean(),
    geometry=pune,
    scale=5500,
    maxPixels=1e9
).get("precipitation").getInfo()


# ---------------------------------------------------
# 7. temperature — ERA5 Land
# ---------------------------------------------------

temperature = (
    ee.ImageCollection("ECMWF/ERA5_LAND/DAILY_AGGR")
    .filterDate("2010-04-01", "2010-06-01")
    .select("temperature_2m")
    .mean()
)

temperature_kelvin = temperature.reduceRegion(
    reducer=ee.Reducer.mean(),
    geometry=pune,
    scale=11000,
    maxPixels=1e9
).get("temperature_2m").getInfo()

temperature_c = (
    temperature_kelvin - 273.15
    if temperature_kelvin is not None
    else None
)


# ---------------------------------------------------
# 8. print result
# ---------------------------------------------------

print("\n------------------------------")
print("pune 2010 kharif pilot")
print("------------------------------")

print("preseason NDVI mean   :", ndvi_mean)
print("preseason NDVI median :", ndvi_median)

print("rainfall previous 30d :", rainfall_30_mm, "mm")
print("rainfall previous 60d :", rainfall_mm, "mm")

print("mean temperature      :", temperature_c, "°C")

print("------------------------------")
