import os


def initialize():
    try:
        import ee
    except ImportError as exc:
        raise RuntimeError("Install earthengine-api before running the Earth Engine pilot.") from exc
    project = os.environ.get("EARTH_ENGINE_PROJECT_ID")
    if not project:
        raise RuntimeError("Set EARTH_ENGINE_PROJECT_ID to your Google Cloud project ID.")
    try:
        ee.Initialize(project=project)
    except Exception as exc:
        raise RuntimeError(
            "Earth Engine initialization failed. Run `earthengine authenticate`, then retry."
        ) from exc
    return ee