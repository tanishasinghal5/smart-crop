import pytest

from crop_model.predict import predict_agronomic_crops


def test_prediction_loads_and_is_sorted():
    result = predict_agronomic_crops(90, 42, 38, 27, 65, 6.5, 164, top_k=5)
    assert len(result) >= 3
    assert all(result[index]["score"] >= result[index + 1]["score"] for index in range(len(result) - 1))
    assert all(isinstance(item["crop"], str) for item in result)


def test_invalid_ph_is_rejected():
    with pytest.raises(ValueError, match="pH"):
        predict_agronomic_crops(90, 42, 38, 27, 65, 15, 164)


def test_missing_value_is_rejected():
    with pytest.raises(ValueError, match="finite"):
        predict_agronomic_crops(None, 42, 38, 27, 65, 6.5, 164)