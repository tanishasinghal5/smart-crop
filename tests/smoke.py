"""Smoke test for the live site: one call per feature, a PASS/FAIL line each.

Run it after every deploy and before the demo:

    python tests/smoke.py https://smart-crop-286027085179.asia-south1.run.app
    python tests/smoke.py http://localhost:8080
    python tests/smoke.py <url> --gemini     # also spend 1 Gemini call

Gemini checks are off by default because the free tier is ~20 calls a day.
Uses only the Python standard library, and changes nothing on the site.
"""
import json
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

PAGES = ['index.html', 'planner.html', 'krishi-dashboard.html', 'disease.html',
         'login.html', 'profile.html', 'dashboard.html']
MODEL_FILES = ['disease-model.tflite', 'vendor/tflite/tf.min.js', 'vendor/tflite/tf-tflite.min.js']
ANAND = (22.554, 72.951)
# Sample soil and weather numbers the crop model accepts.
CROP_INPUT = {'N': 90, 'P': 43, 'K': 254.66, 'ph': 7.2,
              'temperature': 29.2, 'humidity': 71, 'rainfall': 640}

results = []


def call(base, path, body=None, timeout=60):
    """Returns (status, parsed JSON or raw bytes, seconds). Never raises for HTTP errors."""
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(base + path, data=data, method='POST' if data else 'GET',
                                 headers={'Content-Type': 'application/json'} if data else {})
    start = time.time()
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            status, raw = resp.status, resp.read()
    except urllib.error.HTTPError as exc:
        status, raw = exc.code, exc.read()
    try:
        payload = json.loads(raw)
    except ValueError:
        payload = raw
    return status, payload, time.time() - start


def check(name):
    """Runs one check; the check returns a short detail or raises AssertionError."""
    def wrap(fn):
        def run(*args):
            try:
                detail = fn(*args)
                results.append(True)
                print(f'[PASS] {name} - {detail}')
            except Exception as exc:  # noqa: BLE001 — any failure is a FAIL line, never a crash
                results.append(False)
                reason = exc if isinstance(exc, AssertionError) else f'{type(exc).__name__}: {exc}'
                print(f'[FAIL] {name} - {reason}')
        return run
    return wrap


def error_text(status, payload):
    message = payload.get('error') if isinstance(payload, dict) else None
    return f'HTTP {status}' + (f': {message}' if message else '')


@check('Pages load')
def pages(base):
    bad = [p for p in PAGES if call(base, '/' + p)[0] != 200]
    assert not bad, f'not loading: {", ".join(bad)}'
    return f'{len(PAGES)}/{len(PAGES)}'


@check('Login setup')
def auth_config(base):
    status, data, _ = call(base, '/api/auth/config')
    assert status == 200, error_text(status, data)
    return f'PIN length {data.get("pinLength")}, Google sign-in {"on" if data.get("googleSignIn") else "off"}'


@check('Village search')
def places(base):
    status, data, _ = call(base, '/api/places?q=anand&limit=8')
    assert status == 200, error_text(status, data)
    hit = next((p for p in data.get('places', []) if 'Gujarat' in p.get('label', '')), None)
    assert hit, 'Anand, Gujarat not in the results'
    return hit['label']


@check('Place details')
def place(base):
    _, data, _ = call(base, '/api/places?q=anand&limit=8')
    hit = next(p for p in data['places'] if 'Gujarat' in p.get('label', ''))
    status, data, _ = call(base, '/api/place?id=' + urllib.parse.quote(hit['placeId']))
    assert status == 200, error_text(status, data)
    assert abs(data['lat'] - ANAND[0]) < 0.2 and abs(data['lng'] - ANAND[1]) < 0.2, \
        f'wrong position {data.get("lat")}, {data.get("lng")}'
    return f'{data.get("district")}, {data.get("state")} ({data["lat"]:.3f}, {data["lng"]:.3f})'


@check('GPS to village')
def reverse(base):
    status, data, _ = call(base, f'/api/reverse-geocode?lat={ANAND[0]}&lng={ANAND[1]}')
    assert status == 200, error_text(status, data)
    assert data.get('state') == 'Gujarat', f'got state {data.get("state")!r}'
    return data.get('label') or data.get('name')


@check('Crop model')
def recommend(base):
    status, data, secs = call(base, '/api/recommend', CROP_INPUT)
    assert status == 200, error_text(status, data)
    recs = data.get('recommendations', [])
    assert len(recs) == 5, f'expected 5 crops, got {len(recs)}'
    return f'top {recs[0]["crop"]} {round(recs[0]["probability"] * 100)}% in {secs:.1f} s'


@check('Crop model rejects bad input')
def recommend_bad(base):
    status, data, _ = call(base, '/api/recommend', {**CROP_INPUT, 'ph': 20})
    assert status == 400, f'expected HTTP 400, got {status}'
    return data.get('error')


@check('Crop confidence is honest')
def confidence(base):
    # Deliberately silly soil: the model alone still says "88%", so this proves
    # the confidence check is real and not decoration (plan Task 36, test 6).
    silly = {'N': 5, 'P': 5, 'K': 5, 'ph': 4.1, 'temperature': 29, 'humidity': 40,
             'rainfall': 20, 'soil_source': 'typed'}
    status, data, _ = call(base, '/api/recommend-crop', silly)
    assert status == 200, error_text(status, data)
    assert data.get('confidence_level') == 'low', f'silly inputs gave {data.get("confidence_level")!r}, not low'
    assert data.get('action_required') == 'soil_test', f'action_required was {data.get("action_required")!r}'
    return f'silly inputs -> low, soil_test ({len(data.get("recommendations", []))} crops still shown)'


@check('Earth Engine connected')
def ee_health(base):
    status, data, _ = call(base, '/api/satellite/health', timeout=90)
    assert status == 200 and data.get('ok'), error_text(status, data) + f' {data.get("error", "")}'
    return f'project {data.get("project")}'


@check('Satellite data')
def satellite(base):
    body = {'latitude': ANAND[0], 'longitude': ANAND[1]}
    status, first, secs1 = call(base, '/api/satellite', body, timeout=120)
    assert status == 200, error_text(status, first)
    ndvi = first.get('ndvi')
    assert ndvi is None or 0 <= ndvi <= 1, f'NDVI out of range: {ndvi}'
    status, second, secs2 = call(base, '/api/satellite', body, timeout=120)
    assert status == 200, 'second call ' + error_text(status, second)
    assert second['meta']['source'] == 'cache', 'second call was not served from cache'
    return (f'NDVI {ndvi} ({first.get("ndvi_status")}), {first.get("observation_count")} photos, '
            f'{first["meta"]["source"]} in {secs1:.1f} s; 2nd call cache in {secs2:.1f} s')


@check('Disease model files')
def model_files(base):
    bad = [f for f in MODEL_FILES if call(base, '/' + f, timeout=120)[0] != 200]
    assert not bad, f'not loading: {", ".join(bad)}'
    return f'{len(MODEL_FILES)}/{len(MODEL_FILES)}'


@check('Gemini (advisor / chat)')
def gemini(base):
    status, data, secs = call(base, '/api/chat', {'question': 'Reply with the single word OK.',
                                                   'language': 'English'}, timeout=150)
    assert status == 200, error_text(status, data) + (f' [{data.get("details")}]' if isinstance(data, dict) else '')
    return f'answered in {secs:.1f} s: {data.get("answer", "")[:40]!r}'


def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    if not args:
        print(__doc__)
        sys.exit(2)
    base = args[0].rstrip('/')
    print(f'Smoke test: {base}\n')
    for run in (pages, auth_config, places, place, reverse, recommend, recommend_bad,
                confidence, ee_health, satellite, model_files):
        run(base)
    if '--gemini' in sys.argv:
        gemini(base)
    else:
        print('[SKIP] Gemini - add --gemini to spend 1 call checking it')
    passed = sum(results)
    print('-' * 48)
    print(f'{passed} passed, {len(results) - passed} failed')
    sys.exit(0 if passed == len(results) else 1)


if __name__ == '__main__':
    main()
