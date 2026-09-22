def get_district_geometry(state, district, ee_module=None):
    if ee_module is None:
        from .client import initialize
        ee_module = initialize()
    collection = ee_module.FeatureCollection("FAO/GAUL/2015/level2")
    india = collection.filter(ee_module.Filter.eq("ADM0_NAME", "India"))
    state_matches = india.filter(ee_module.Filter.eq("ADM1_NAME", state))
    district_matches = state_matches.filter(ee_module.Filter.eq("ADM2_NAME", district))
    if district_matches.size().getInfo() == 0:
        states = state_matches.aggregate_array("ADM1_NAME").distinct().getInfo()
        districts = state_matches.aggregate_array("ADM2_NAME").distinct().getInfo()
        raise ValueError(
            f"District {district!r} was not found in state {state!r}. "
            f"Matching states={states!r}; available districts sample={districts[:20]!r}"
        )
    return district_matches.geometry()