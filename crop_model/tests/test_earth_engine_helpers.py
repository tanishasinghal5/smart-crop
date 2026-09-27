import pytest

from crop_model.earth_engine.feature_builder import get_preseason_dates
from crop_model.earth_engine.boundaries import get_district_geometry
from crop_model.earth_engine.landsat import _mask_and_ndvi, extract_ndvi


def test_date_range_is_valid():
    start, end = get_preseason_dates(2010, "Kharif")
    assert start.isoformat() == "2010-04-01"
    assert end.isoformat() == "2010-05-31"
    assert start <= end


def test_invalid_season_is_rejected():
    with pytest.raises(ValueError):
        get_preseason_dates(2010, "Monsoon")


def test_ndvi_uses_landsat_band_formula_and_scale():
    class FakeImage:
        def __init__(self):
            self.operations = []
        def select(self, name):
            self.operations.append(("select", name))
            return self
        def bitwiseAnd(self, value): return self
        def eq(self, value): return self
        def And(self, other): return self
        def multiply(self, value): self.operations.append(("multiply", value)); return self
        def add(self, value): self.operations.append(("add", value)); return self
        def subtract(self, other): return self
        def divide(self, other): return self
        def rename(self, name): self.operations.append(("rename", name)); return self
        def updateMask(self, mask): return self
    image = _mask_and_ndvi(FakeImage(), type("EE", (), {})())
    assert ("rename", "NDVI") in image.operations
    assert image.operations.count(("multiply", 0.0000275)) == 2
    assert image.operations.count(("add", -0.2)) == 2


class _Value:
    def __init__(self, value): self.value = value
    def getInfo(self): return self.value
    def distinct(self): return self


class _FakeBoundaries:
    class Filter:
        @staticmethod
        def eq(field, value): return field, value

    def FeatureCollection(self, name):
        return _FakeFeatureCollection([
            {"ADM0_NAME": "India", "ADM1_NAME": "Maharashtra", "ADM2_NAME": "Pune"},
        ])


class _FakeFeatureCollection:
    def __init__(self, rows): self.rows = rows
    def filter(self, condition):
        field, value = condition
        return _FakeFeatureCollection([row for row in self.rows if row.get(field) == value])
    def size(self): return _Value(len(self.rows))
    def aggregate_array(self, field): return _Value(sorted({row.get(field) for row in self.rows}))
    def distinct(self): return self
    def geometry(self): return "geometry"


def test_invalid_district_is_rejected_with_available_names():
    with pytest.raises(ValueError, match="Available districts"):
        get_district_geometry("Maharashtra", "Nagpur", _FakeBoundaries())


def test_empty_landsat_collection_is_not_fabricated():
    class EmptyCollection:
        def filterDate(self, *args): return self
        def filterBounds(self, *args): return self
        def map(self, *args): return self
        def size(self): return _Value(0)

    class EmptyEE:
        def ImageCollection(self, name): return EmptyCollection()

    result = extract_ndvi("geometry", "2010-04-01", "2010-06-01", EmptyEE())
    assert result["NDVI_Observation_Count"] == 0
    assert result["Preseason_NDVI_Mean"] is None
