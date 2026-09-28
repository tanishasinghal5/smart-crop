def get_district_geometry(state, district, ee_module=None):
    if ee_module is None:
        from .client import initialize
        ee_module = initialize()
    collection = ee_module.FeatureCollection("FAO/GAUL/2025/level2")
    # GAUL 2025 renamed ADM*_NAME to GAUL*_NAME. Keep a small compatibility
    # fallback for test doubles and older boundary collections.
    try:
        fields = collection.aggregate_array("GAUL0_NAME").distinct().getInfo()
    except Exception:
        fields = []
    country_field, state_field, district_field = (
        ("GAUL0_NAME", "GAUL1_NAME", "GAUL2_NAME") if fields and any(fields)
        else ("ADM0_NAME", "ADM1_NAME", "ADM2_NAME")
    )
    india = collection.filter(ee_module.Filter.eq(country_field, "India"))
    state_matches = india.filter(ee_module.Filter.eq(state_field, state))
    if state_matches.size().getInfo() == 0:
        available = india.aggregate_array(state_field).distinct().getInfo()
        raise ValueError(f"State {state!r} was not found in India GAUL boundaries. Available sample={available[:20]!r}")
    district_matches = state_matches.filter(ee_module.Filter.eq(district_field, district))
    if district_matches.size().getInfo() == 0:
        districts = state_matches.aggregate_array(district_field).distinct().getInfo()
        raise ValueError(
            f"District {district!r} was not found in state {state!r}. "
            f"Available districts sample={districts[:20]!r}"
        )
    if district_matches.size().getInfo() != 1:
        raise ValueError(f"District {district!r} did not resolve to exactly one boundary")
    return district_matches.geometry()
