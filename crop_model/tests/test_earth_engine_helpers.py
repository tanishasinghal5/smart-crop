import pytest

from crop_model.earth_engine.feature_builder import get_preseason_dates


def test_date_range_is_valid():
    start, end = get_preseason_dates(2010, "Kharif")
    assert start.isoformat() == "2010-04-01"
    assert end.isoformat() == "2010-05-31"
    assert start <= end


def test_invalid_season_is_rejected():
    with pytest.raises(ValueError):
        get_preseason_dates(2010, "Monsoon")