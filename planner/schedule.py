"""Per-crop growth timeline.

Replaces the dashboard's hardcoded 120-day / 8-stage calendar, which rendered
an identical timeline for rice and for grapes. Stage offsets are fractions of
the crop's own duration_days, so a 70-day mungbean and a 180-day cotton get
correspondingly different calendars.

Perennials return an annual care cycle instead of a sowing->harvest timeline,
because "sow on day 0, harvest on day N" is simply the wrong model for a crop
that is already in the ground.
"""

from datetime import date, timedelta
from typing import Optional

from .profiles import CALENDAR_SOURCE, PROFILES

MONTHS = ("January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December")

# (label, fraction of duration, guidance). Negative fraction = before sowing.
STAGE_TEMPLATE: tuple[tuple[str, float, str], ...] = (
    ("Land preparation", -0.06, "Level the field and work in organic matter."),
    ("Sowing",            0.00, "Use healthy seed at the recommended depth and spacing."),
    ("First irrigation",  0.08, "Keep early growth evenly moist - check the forecast first."),
    ("Fertiliser",        0.25, "Apply when the field is not waterlogged and no heavy rain is due."),
    ("Weed control",      0.35, "Remove competing weeds before they set seed."),
    ("Pest inspection",   0.50, "Check leaf undersides and stems."),
    ("Flowering",         0.68, "Avoid water stress during flowering."),
    ("Harvest",           1.00, "Harvest at full maturity and dry well."),
)

PERENNIAL_CYCLE: tuple[tuple[str, str], ...] = (
    ("Pruning / rest", "Prune to shape and induce the next flush."),
    ("Flowering", "Protect blossom; avoid water stress."),
    ("Fruit development", "Steady moisture matters most in this window."),
    ("Harvest", "Pick at maturity and grade for market."),
    ("Post-harvest care", "Feed the planting back up before the next cycle."),
)


def next_sowing_date(crop: str, today: Optional[date] = None) -> Optional[date]:
    """First day of the crop's next sowing window, or None for perennials."""
    profile = PROFILES.get(crop)
    if not profile or not profile["sow_window"]:
        return None
    today = today or date.today()
    start_month = profile["sow_window"][0]
    year = today.year if start_month >= today.month else today.year + 1
    return date(year, start_month, 1)


def sowing_guidance(crop: str, today: Optional[date] = None) -> dict:
    """When to sow, in plain language.

    This comes from the crop's season window and today's date - NOT from the
    weather forecast. A 15-day forecast cannot choose a sowing month; it can
    only refine the day once the window is already open.
    """
    profile = PROFILES.get(crop)
    if not profile:
        return {"window": None, "advice": f"no profile for '{crop}'", "source": CALENDAR_SOURCE}
    if profile["perennial"]:
        return {
            "window": None,
            "advice": "Perennial - already in the ground; follow the annual care cycle rather than a sowing date.",
            "source": CALENDAR_SOURCE,
        }

    today = today or date.today()
    start, end = profile["sow_window"]
    window_text = f"{MONTHS[start - 1]}" + (f" to {MONTHS[end - 1]}" if end != start else "")
    target = next_sowing_date(crop, today)
    in_window = (start <= today.month <= end) if start <= end else (today.month >= start or today.month <= end)

    if in_window:
        advice = f"The {window_text} sowing window is open now. Sow on the next clear spell."
    else:
        advice = f"Sow in {window_text}. Next window opens {MONTHS[target.month - 1]} {target.year}."
    return {"window": window_text, "advice": advice, "source": CALENDAR_SOURCE}


def build_schedule(crop: str, sow_date: Optional[date] = None) -> dict:
    """Stage-by-stage timeline scaled to the crop's own duration."""
    profile = PROFILES.get(crop)
    if not profile:
        return {"crop": crop, "stages": [], "note": f"no profile for '{crop}'"}

    if profile["perennial"] or not profile["duration_days"]:
        return {
            "crop": crop,
            "perennial": True,
            "duration_days": None,
            "stages": [{"title": title, "guidance": guidance, "date": None, "day": None}
                       for title, guidance in PERENNIAL_CYCLE],
            "note": "Annual care cycle - a perennial has no sowing-to-harvest timeline.",
            "source": CALENDAR_SOURCE,
        }

    duration = profile["duration_days"]
    start = sow_date or next_sowing_date(crop) or date.today()
    stages = []
    for title, fraction, guidance in STAGE_TEMPLATE:
        day = round(duration * fraction)
        stages.append({
            "title": title,
            "day": day,
            "date": (start + timedelta(days=day)).isoformat(),
            "guidance": guidance,
        })
    return {
        "crop": crop,
        "perennial": False,
        "duration_days": duration,
        "sow_date": start.isoformat(),
        "stages": stages,
        "note": None,
        "source": CALENDAR_SOURCE,
    }
