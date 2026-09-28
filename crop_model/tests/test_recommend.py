import json

import pytest

from crop_model.recommend import recommend_crops


BASE = dict(state="Maharashtra", district="Pune", season="Kharif", N=75, P=45,
            K=140, ph=6.6, temperature=29.92, humidity=70, rainfall=650,
            use_live_environment=False)


def test_normal_pune_case_is_json_compatible():
    result = recommend_crops(**BASE)
    json.dumps(result)
    assert len(result["recommendations"]) == 5
    assert result["data_quality"]["regional_model"] == "unavailable"


def test_top_k_three_and_sorted_scores():
    result = recommend_crops(**BASE, top_k=3)
    scores = [item["final_score"] for item in result["recommendations"]]
    assert len(scores) == 3
    assert scores == sorted(scores, reverse=True)
    assert all(0 <= score <= 1 for score in scores)


def test_invalid_values_are_rejected():
    invalid = {**BASE, "ph": 19}
    with pytest.raises(ValueError, match="pH"):
        recommend_crops(**invalid)
    invalid = {**BASE, "latitude": 91}
    with pytest.raises(ValueError, match="latitude"):
        recommend_crops(**invalid)


def test_earth_engine_failure_keeps_recommendations(monkeypatch):
    import crop_model.recommend as module
    monkeypatch.setattr(module, "_environment", lambda *args, **kwargs: ({}, "unavailable"))
    result = recommend_crops(**{key: value for key, value in BASE.items() if key != "use_live_environment"}, use_live_environment=True)
    assert result["recommendations"]
    assert result["data_quality"]["earth_engine"] == "unavailable"
