"""Feasibility filtering for the growth planner.

WHY THIS EXISTS (the important design note)
  The model is very confident on its top pick and near-uniform after it - a
  typical field gives 0.907 / 0.008 / 0.007. Taking the model's top-3 and then
  re-ranking those by budget would mean choosing between two ~1% options that
  are statistically noise, while wearing the model's authority.

  So the pipeline is inverted:
      1. score ALL 25 crops with the model
      2. drop crops that fail a HARD constraint, each with a reason
      3. rank the survivors by model probability
  The model becomes a scoring function over the feasible set, not a top-3 gate.

WHAT IS DELIBERATELY NOT DONE HERE
  Seasonal water need (water_mm_seasonal) is NOT checked against the app's
  forecast rainfall. The forecast is a 15-day sum; the requirement is a whole
  -season total. Comparing them would silently "prove" every crop is water
  -starved. Irrigation dependence comes from the profile table; the forecast
  only schedules individual waterings (see planner/irrigation.py).
"""

from dataclasses import dataclass, field as dc_field
from typing import Optional

from .profiles import MIN_IRRIGATION_POWER_HOURS, PROFILES, Profile


@dataclass
class Resources:
    """What the farmer told us. All optional - missing means 'do not filter on it'."""
    budget_rs_per_acre: Optional[float] = None
    electricity_hours_per_day: Optional[float] = None   # dependable 3-phase hours
    has_existing_planting: set[str] = dc_field(default_factory=set)
    sow_month: Optional[int] = None                     # 1-12; None = ignore season


@dataclass
class Verdict:
    crop: str
    feasible: bool
    blockers: list[str]      # why it cannot be grown; empty if feasible
    warnings: list[str]      # feasible, but the farmer should know


def _in_window(month: int, window: tuple[int, int]) -> bool:
    """Month-range test that handles windows wrapping past December."""
    start, end = window
    if start <= end:
        return start <= month <= end
    return month >= start or month <= end


def evaluate(crop: str, resources: Resources) -> Verdict:
    """Apply hard constraints to one crop. Never raises on an unknown crop."""
    profile: Optional[Profile] = PROFILES.get(crop)
    if profile is None:
        return Verdict(crop, False, [f"no resource profile for '{crop}'"], [])

    blockers: list[str] = []
    warnings: list[str] = []

    # --- budget ---
    cost = profile["cost_rs_per_acre"]
    if resources.budget_rs_per_acre is not None and cost > resources.budget_rs_per_acre:
        gap = cost - resources.budget_rs_per_acre
        blockers.append(
            f"over budget by Rs {gap:,.0f}/acre "
            f"(needs Rs {cost:,}/acre)"
        )

    # --- perennial establishment gate ---
    # cost_rs_per_acre for a perennial is one year's UPKEEP of an established
    # planting. A farmer without the planting cannot start it this season at
    # that price, so budget alone must never let a perennial through.
    if profile["perennial"] and crop not in resources.has_existing_planting:
        blockers.append(
            "perennial - the figure shown is annual upkeep of an established "
            "planting, not the multi-year cost of establishing one"
        )

    # --- irrigation vs electricity ---
    hours = resources.electricity_hours_per_day
    if profile["needs_irrigation"] and hours is not None:
        if hours < MIN_IRRIGATION_POWER_HOURS:
            blockers.append(
                f"needs irrigation but only {hours:g}h/day of dependable supply "
                f"({MIN_IRRIGATION_POWER_HOURS:g}h needed to run a pump)"
            )
        elif hours < MIN_IRRIGATION_POWER_HOURS + 2:
            warnings.append("irrigation supply is tight; a power cut mid-season is a real risk")

    # --- season ---
    window = profile["sow_window"]
    if resources.sow_month is not None and window is not None:
        if not _in_window(resources.sow_month, window):
            blockers.append(
                f"out of season - sown in months {window[0]}-{window[1]}, "
                f"not month {resources.sow_month}"
            )

    if profile["note"]:
        warnings.append(profile["note"])

    return Verdict(crop, not blockers, blockers, warnings)


def rank_feasible(
    probabilities: dict[str, float],
    resources: Resources,
) -> tuple[list[dict], list[dict]]:
    """Split all scored crops into (feasible, rejected), each ranked by model probability.

    Args:
        probabilities: crop label -> model probability, for ALL model classes.
        resources: the farmer's stated constraints.

    Returns:
        (feasible, rejected) - both sorted by probability descending. Rejected
        entries keep their blockers so the UI can show "why not X".
    """
    feasible: list[dict] = []
    rejected: list[dict] = []

    for crop, probability in probabilities.items():
        verdict = evaluate(crop, resources)
        profile = PROFILES.get(crop)
        row = {
            "crop": crop,
            "model_probability": round(float(probability), 4),
            "cost_rs_per_acre": profile["cost_rs_per_acre"] if profile else None,
            "water_mm_seasonal": profile["water_mm_seasonal"] if profile else None,
            "season": profile["season"] if profile else None,
            "duration_days": profile["duration_days"] if profile else None,
            "perennial": profile["perennial"] if profile else None,
            "blockers": verdict.blockers,
            "warnings": verdict.warnings,
        }
        (feasible if verdict.feasible else rejected).append(row)

    feasible.sort(key=lambda r: r["model_probability"], reverse=True)
    rejected.sort(key=lambda r: r["model_probability"], reverse=True)
    return feasible, rejected
