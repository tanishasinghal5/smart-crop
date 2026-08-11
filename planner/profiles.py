"""Crop resource profiles for the growth planner.

UNITS ARE IN THE FIELD NAMES. Do not add a bare `cost` or `water_mm` key.
  cost_rs_per_acre    Rs per acre, one season
  water_mm_seasonal   mm over the WHOLE crop cycle (not per day, not 15-day)

PROVENANCE
  cost_rs_per_acre / water_mm_seasonal / needs_irrigation
      supplied by the project owner, sourced from FAO CROPWAT/ECOCROP (water)
      and GoI Cost of Cultivation + MPKV state crop budgets (cost).
      Described by the owner as rough state-level estimates.
  season / sow_window / duration_days
      standard Indian agronomy, typical values for Maharashtra.
      CALENDAR_NEEDS_LOCAL_CHECK is True because these shift by variety and
      district - a short-duration rice is ~110 days, a long one ~150.
      Verify against the MPKV crop calendar for the farmer's variety.

WARNING ON water_mm_seasonal
  This is a SEASONAL total. The app's `field.rainfall` is a 15-DAY sum from
  open-meteo. Never compare them directly - see planner/constraints.py, which
  deliberately does not use the forecast to judge seasonal water need.
"""

from typing import Optional, TypedDict

CALENDAR_NEEDS_LOCAL_CHECK = True

COST_SOURCE = "GoI Cost of Cultivation + MPKV state crop budgets (state-level estimate)"
WATER_SOURCE = "FAO CROPWAT / ECOCROP seasonal crop water requirement"
CALENDAR_SOURCE = "Standard Indian agronomy, typical for Maharashtra - verify variety with MPKV"

# Minimum daily hours of dependable 3-phase supply to run a pump for an
# irrigation-dependent crop. Below this, such crops are flagged infeasible.
MIN_IRRIGATION_POWER_HOURS = 6.0


class Profile(TypedDict):
    cost_rs_per_acre: int
    water_mm_seasonal: int
    needs_irrigation: bool
    season: str                    # kharif | rabi | summer | perennial
    sow_window: Optional[tuple]    # inclusive month range (start, end); None if perennial
    duration_days: Optional[int]   # sowing -> harvest; None if perennial
    perennial: bool
    note: Optional[str]


def _p(cost, water, irrigation, season, sow_window, duration, perennial=False, note=None) -> Profile:
    return {
        "cost_rs_per_acre": cost,
        "water_mm_seasonal": water,
        "needs_irrigation": irrigation,
        "season": season,
        "sow_window": sow_window,
        "duration_days": duration,
        "perennial": perennial,
        "note": note,
    }


PROFILES: dict[str, Profile] = {
    # ---- Cereals ----
    "rice":        _p(28000, 1150, True,  "kharif", (6, 7),   135),
    "maize":       _p(20000,  600, False, "kharif", (6, 7),   100),
    "wheat":       _p(20000,  550, True,  "rabi",   (11, 12), 125, note="rabi crop, grown in dry season"),

    # ---- Pulses (mostly rainfed, cheap, drought-hardy) ----
    "chickpea":    _p(15000,  350, False, "rabi",   (10, 11), 105),
    "kidneybeans": _p(18000,  400, False, "rabi",   (10, 11), 100),
    "pigeonpeas":  _p(15000,  450, False, "kharif", (6, 7),   165),
    "mothbeans":   _p(10000,  300, False, "kharif", (7, 8),    75, note="very drought-hardy"),
    "mungbean":    _p(12000,  350, False, "kharif", (6, 7),    70),
    "blackgram":   _p(12000,  350, False, "kharif", (6, 7),    80),
    "lentil":      _p(13000,  350, False, "rabi",   (10, 11), 110),

    # ---- Oilseed ----
    "soybean":     _p(18000,  500, False, "kharif", (6, 7),   100),

    # ---- Cash crops ----
    "cotton":      _p(30000,  750, False, "kharif", (6, 7),   180),
    "sugarcane":   _p(60000, 2000, True,  "annual", (1, 2),   330,
                      note="very thirsty, water-scarcity risk; Maharashtra suru planting"),
    "jute":        _p(20000,  500, False, "kharif", (3, 5),   130,
                      note="mainly an eastern-India crop, limited in Maharashtra"),

    # ---- Perennials: duration_days is None on purpose ----
    # For these, cost_rs_per_acre is ONE YEAR'S UPKEEP of an established
    # planting - it is NOT the cost of establishing a new orchard, which runs
    # for several years at far higher cost. constraints.py gates these behind
    # an explicit "I already have this planting" answer.
    "coffee":      _p(55000, 1800, True, "perennial", None, None, True,
                      "perennial; not a Maharashtra crop"),
    "banana":      _p(70000, 1800, True, "perennial", None, None, True,
                      "perennial, high-value, thirsty"),
    "grapes":      _p(110000, 700, True, "perennial", None, None, True,
                      "perennial, high-value (Nashik)"),
    "pomegranate": _p(60000,  700, True, "perennial", None, None, True,
                      "perennial, drought-tolerant once grown"),
    "mango":       _p(40000,  900, True, "perennial", None, None, True,
                      "perennial; rainfed once mature"),
    "orange":      _p(45000,  900, True, "perennial", None, None, True, "perennial"),
    "apple":       _p(60000,  700, True, "perennial", None, None, True,
                      "perennial; not a Maharashtra crop"),
    "papaya":      _p(50000, 1500, True, "perennial", None, None, True,
                      "perennial, thirsty"),
    "coconut":     _p(45000, 1800, True, "perennial", None, None, True,
                      "perennial, thirsty"),

    # ---- Cucurbits (annual, summer, need watering) ----
    "watermelon":  _p(35000,  500, True, "summer", (1, 2), 90, note="summer crop"),
    "muskmelon":   _p(35000,  500, True, "summer", (1, 2), 90, note="summer crop"),
}

# Guards the 25-vs-22 class bug: the model emits 25 labels and every one of
# them must resolve to a profile or the planner will KeyError mid-demo.
MODEL_LABELS: tuple[str, ...] = (
    "apple", "banana", "blackgram", "chickpea", "coconut", "coffee", "cotton",
    "grapes", "jute", "kidneybeans", "lentil", "maize", "mango", "mothbeans",
    "mungbean", "muskmelon", "orange", "papaya", "pigeonpeas", "pomegranate",
    "rice", "soybean", "sugarcane", "watermelon", "wheat",
)


def missing_profiles() -> list[str]:
    """Model labels with no profile entry. Must be empty."""
    return [label for label in MODEL_LABELS if label not in PROFILES]
