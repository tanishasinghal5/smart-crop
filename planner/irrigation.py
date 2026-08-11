"""Forecast-driven irrigation decisions.

This is the one place the 15-day forecast is genuinely usable. It answers
"should I water THIS WEEK", which is a short-horizon question the forecast can
actually support. It does NOT answer "does this crop have enough water for the
season" - that needs seasonal normals, not 15 days. See planner/constraints.py.

Input is the raw open-meteo `daily` block the app already fetches:
    {"time": [...], "precipitation_sum": [...], "temperature_2m_max": [...], ...}
"""

from typing import Optional, TypedDict

# mm of rain forecast over the look-ahead window.
SKIP_THRESHOLD_MM = 25.0    # enough that irrigating would waterlog / waste water
DEFER_THRESHOLD_MM = 10.0   # meaningful rain coming; wait and re-check
LOOKAHEAD_DAYS = 3

# Heavy rain leaches surface-applied nitrogen, so hold fertiliser.
FERTILISER_HOLD_MM = 20.0


class Decision(TypedDict):
    action: str        # IRRIGATE | DEFER | SKIP | UNKNOWN
    reason: str
    rain_next_3_days_mm: Optional[float]


def _window_rain(daily: dict, day_index: int, days: int = LOOKAHEAD_DAYS) -> Optional[float]:
    series = (daily or {}).get("precipitation_sum")
    if not isinstance(series, list) or day_index < 0 or day_index >= len(series):
        return None
    window = series[day_index:day_index + days]
    values = [v for v in window if isinstance(v, (int, float))]
    return float(sum(values)) if values else None


def irrigation_decision(daily: Optional[dict], day_index: int = 0) -> Decision:
    """Should the farmer irrigate, starting from `day_index` in the forecast?

    Degrades to UNKNOWN rather than guessing when the forecast is missing -
    the planner must never invent a watering instruction.
    """
    rain = _window_rain(daily or {}, day_index)
    if rain is None:
        return {
            "action": "UNKNOWN",
            "reason": "no forecast available - decide from what you can see in the field",
            "rain_next_3_days_mm": None,
        }
    if rain >= SKIP_THRESHOLD_MM:
        return {
            "action": "SKIP",
            "reason": f"{rain:.0f}mm of rain expected in the next {LOOKAHEAD_DAYS} days",
            "rain_next_3_days_mm": round(rain, 1),
        }
    if rain >= DEFER_THRESHOLD_MM:
        return {
            "action": "DEFER",
            "reason": f"{rain:.0f}mm of light rain expected - wait and check again tomorrow",
            "rain_next_3_days_mm": round(rain, 1),
        }
    return {
        "action": "IRRIGATE",
        "reason": f"only {rain:.0f}mm expected in the next {LOOKAHEAD_DAYS} days",
        "rain_next_3_days_mm": round(rain, 1),
    }


def fertiliser_decision(daily: Optional[dict], day_index: int = 0) -> Decision:
    """Hold surface-applied fertiliser ahead of heavy rain (leaching risk)."""
    rain = _window_rain(daily or {}, day_index, days=2)
    if rain is None:
        return {
            "action": "UNKNOWN",
            "reason": "no forecast available",
            "rain_next_3_days_mm": None,
        }
    if rain >= FERTILISER_HOLD_MM:
        return {
            "action": "SKIP",
            "reason": f"{rain:.0f}mm rain in 2 days would wash away surface fertiliser",
            "rain_next_3_days_mm": round(rain, 1),
        }
    return {
        "action": "IRRIGATE",  # i.e. proceed
        "reason": "no heavy rain expected; safe to apply",
        "rain_next_3_days_mm": round(rain, 1),
    }


def irrigation_outlook(daily: Optional[dict], days: int = 15) -> list[dict]:
    """Per-day irrigate/skip calls across the forecast, for the calendar strip."""
    times = (daily or {}).get("time") or []
    outlook = []
    for index in range(min(days, len(times))):
        decision = irrigation_decision(daily, index)
        outlook.append({"date": times[index], **decision})
    return outlook
