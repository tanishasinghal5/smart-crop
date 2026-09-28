# Smart Crop — the API list

**Owner:** Poirot (backend). **First frozen:** Day 1, 11:00 (`2026-09-23`). **Updated:** `2026-09-28`.

> **Read this first.** The Day-1 plan below promised fake data first and real data later. We changed course: **there is no fake data any more.** Every route either returns real data or an honest error. The table just below lists what is **live today**. Further down, each planned API is marked:
> ✅ **Live** · ⚠️ **Live, but different from the plan** · ⏳ **Not built**

---

# Live today

Every route here is checked by `python tests/smoke.py <url>` (add `--gemini` to also check Gemini).
Live site: `https://smart-crop-286027085179.asia-south1.run.app`

| Route | You send | You get back | Uses |
|---|---|---|---|
| `GET /api/places?q=anand&session=…` | the text typed, plus a session id | `{places: [{name, detail, label, placeId}]}` — suggestions only, no position | Google Places API (New) |
| `GET /api/place?id=…&session=…` | a `placeId` from the list above | `{name, district, state, lat, lng, label, source}` | Google Places API (New) |
| `GET /api/reverse-geocode?lat=&lng=` | a GPS position | the same place shape as above | Google Geocoding |
| `POST /api/recommend` | JSON `{N, P, K, temperature, humidity, ph, rainfall}` — all 7 required | `{recommendations: [{crop, probability}] × 5, model}` | our trained model on Cloud Run |
| `POST /api/soil-card` | form field `file` (JPG, PNG, WebP or PDF, up to 10 MB) | `{extracted: {N, P, K, ph: {value, unit, raw_text}}, requires_confirmation: true, warnings: [], meta}` | Gemini |
| `POST /api/disease/advice` | form fields `photo`, `label`, `confidence` (0–1), `language` (`en`/`hi`/`mr`/`te`) | `{disease, confidence, severity, gemini_agrees, summary, steps: [3], meta}` | Gemini (after a photo-quality check) |
| `POST /api/disease` | form field `photo` | `{predictions: [3], diagnosis_state, quality, model}` | backup only — needs TensorFlow, so it says "not available" on Cloud Run. The pages run the model **in the browser** instead. |
| `POST /api/chat` | JSON `{question, history?, language?, context?, image_data?}` | `{answer, sources}` | Gemini |
| `POST /api/satellite` | JSON `{latitude, longitude}` | `{ndvi, ndvi_status, observation_count, quality_flag, rainfall_30d, temperature, soil_moisture, window_days, buffer_m, meta}` | Earth Engine: Sentinel-2, CHIRPS, ERA5 |
| `GET /api/satellite/health` | nothing | `{ok, project}` | Earth Engine |
| `/api/auth/*` | see `server.py` — register, login, Google sign-in, phone, PIN, profile, delete, logout, `me` | the signed-in user | Firebase Auth + Firestore |

**Two things every screen should handle:**
- **Gemini can be busy or out of free calls.** You then get HTTP `503` (`gemini_busy`) or `429` (`gemini_quota`). Show the `error` text; never fall back to a made-up answer.
- **`/api/satellite` is slow the first time** (10–30 seconds for a new place). After that it is saved for 24 hours and comes back instantly, with `meta.source: "cache"`.

---

# The Day-1 plan

Kept for reference. Each section is marked with what really happened.

---

## The three rules

**1. These shapes do not change.**
Once frozen, no field is renamed, removed, or changed in type. Build against them with confidence.

**2. Adding a new optional field is always allowed.**
You do not need to ask. This is the escape hatch, so nobody has to work around the freeze. Anything else needs Poirot's sign-off and a version bump.

**3. Nothing is ever `null` when you expect a value.**
If the real service is down, you get saved or fake data instead of an error. Check `meta.source` to see which you got.

> ⚠️ **Changed.** We dropped fake data. A down service now gives an honest error (`{error, code}`), and a value we genuinely don't have is `null` — for example `ndvi` when clouds covered every photo.

---

## What every reply contains

Every successful reply has a `meta` block:

```json
"meta": {
  "source": "live",          // live | cache | cache_stale | mock
  "generated_at": "2026-09-23T10:14:00Z",
  "cache_age_s": 0
}
```

**`meta.source` is the most useful field here.** It tells you what you are looking at:

| Value | Meaning |
|---|---|
| `live` | Real data, fetched just now |
| `cache` | Real data, saved earlier and reused |
| `cache_stale` | Real data, but old — the live service failed, so we sent what we had |
| `mock` | Fake data. The real service is not connected yet |

**Harry:** please show a small badge when `source` is `mock` or `cache_stale`. This stops us accidentally demoing fake numbers as real ones.

> ⚠️ **Partly done.** Only `/api/soil-card`, `/api/disease/advice` and `/api/satellite` send `meta`. `mock` and `cache_stale` never happen, because there is no fake data.

## Errors

Errors always look like this:

```json
{ "error": "A sentence the farmer can read.", "code": "short_code" }
```

Codes: `bad_request`, `not_signed_in`, `field_not_found`, `service_unavailable`, `upstream_timeout`, `model_unavailable`, `rate_limited`, `internal_error`.

## Login

**Login is optional on every API below, for Days 1 and 2.** If you are signed in, your data is saved to your account. If not, everything still works. **No API will refuse you for not being logged in.** Do not build a login wall.

---

# The seven APIs

## `POST /api/farm`
> ⏳ **Not built.** The dashboard keeps the farm in the browser for now.

Save a field, get an id back. You need the `field_id` for the advisor.

```
in:  { "latitude": 18.52, "longitude": 73.85, "area": 2.5,
       "name": "North plot",        // optional
       "state": "Maharashtra",      // optional — server fills it in
       "district": "Pune" }         // optional — server fills it in

out: { "field_id": "f7k2m9x4qp1a",
       "latitude": 18.52, "longitude": 73.85,
       "area": 2.5, "area_unit": "acre",
       "state": "Maharashtra", "district": "Pune",
       "created_at": "...", "meta": {...} }
```

Leave out `state` and `district` if you do not have them — the server works them out from the location using Google Maps.

Also available: `GET /api/farm` (list my fields), `GET /api/farm/<field_id>` (get one).

---

## `POST /api/satellite`
> ⚠️ **Live, different from the plan.** Built on Percy's `get_current_field_environment`. It sends `latitude` and `longitude` only (no `field_id`). `ndvi` is the **average of the clear photos in the last 30 days**, over 1 km around the point. Not there yet: `ndvi_trend`, `ndvi_date`, `ndvi_series`, `cloud_cover_pct`. Added: `observation_count`, `quality_flag`, `soil_moisture`, `window_days`, `buffer_m`. See **Live today** at the top for the real reply.

How healthy the field looks from space.

```
in:  { "latitude": 18.52, "longitude": 73.85,
       "field_id": "f7k2m9x4qp1a" }   // optional

out: { "ndvi": 0.42,
       "ndvi_status": "moderate",      // poor | moderate | good | very_good
       "ndvi_trend": "rising",         // rising | stable | falling
       "rainfall_30d": 112.4,          // mm
       "temperature": 29.4,            // °C
       "ndvi_date": "2026-09-18",
       "ndvi_series": [ { "date": "2026-07-05", "ndvi": 0.31 } ],  // up to 12 points
       "cloud_cover_pct": 12.0,
       "meta": {...} }
```

**NDVI** is a greenness score from 0 to 1. Higher means healthier plants. Use `ndvi_status` for wording rather than showing the raw number alone — farmers read "moderate" more easily than "0.42".

This one can be slow the first time (satellite data takes a few seconds). After that it is saved for 24 hours, so it comes back instantly.

---

## `POST /api/recommend-crop`
> ⏳ **Not built.** It needs Percy's crop table (`crop_agronomy.json`). Use `/api/recommend` — the dashboard and planner both do.

Which crops to plant, with reasons.

```
in:  { "state": "Maharashtra", "district": "Pune", "season": "Kharif",
       "N": 72, "P": 38, "K": 145, "ph": 6.7,
       "latitude": 18.52, "longitude": 73.85,
       "field_id": "f7k2m9x4qp1a",   // optional
       "language": "hi",             // optional, default "en"
       "temperature": 27.1,          // optional — server works it out
       "humidity": 74,               // optional — server works it out
       "rainfall": 164 }             // optional — server works it out

out: { "recommendations": [
         { "crop": "Soybean", "score": 0.86, "rank": 1,
           "soil_fit": 88, "climate_fit": 84, "regional_fit": 91, "model_fit": 79,
           "reasons": ["Suitable rainfall", "Good soil pH", "Widely grown in Pune"],
           "risks": ["Heavy rainfall expected next week"] }
       ],                                     // always exactly 3
       "confidence_level": "high",            // high | medium | low
       "confidence_reasons": ["Soil values confirmed by farmer"],
       "action_required": null,               // null | soil_test | more_info | expert_review
       "explanation": "Soybean suits your field because...",
       "explanation_language": "hi",
       "inputs_used": {...},
       "meta": {...} }
```

**You do not have to send temperature, humidity or rainfall.** The server works those out from the location. Send them only if you already have them.

**`confidence_level` must change what the screen shows:**

| Level | What to show |
|---|---|
| `high` | Show the crops normally |
| `medium` | Show the crops, plus a short note that we are not fully certain |
| `low` | Show the crops, but lead with the warning and show the `action_required` step |

**`action_required`** tells the farmer what would make the answer better — usually a soil test. When it is not `null`, please make it visible. This is a real part of the product, not an error state.

`state`, `district` and `season` come from what the app already works out — see `app.js` for `place.state` and `seasonFor()`. **No new screens needed for this.**

---

## `POST /api/recommend` — the old one
> ✅ **Live.** All 7 inputs are required; the pages get temperature, humidity and this season's rain from Open-Meteo.

**Unchanged. Still works. Not going away during the hackathon.**

Same inputs and same reply as today (`{recommendations: [{crop, probability} × 5], model}`). If you are already using it, keep using it. Move to `/api/recommend-crop` only when you have time.

---

## `POST /api/disease`
> ⚠️ **Different from the plan.** Katniss's model runs **in the browser** (`disease-model.tflite`), which is fast and free. The severity and advice come from a separate route, `POST /api/disease/advice` (Gemini) — see **Live today**. `/api/disease` itself is only a backup and returns the old `predictions` shape; it needs TensorFlow, so it is not available on Cloud Run.

Read a leaf photo.

Send as a file upload. **The field name can be `photo` (what we use today) or `image`. Both work.**

```
in:  multipart form
     photo     = the image file
     field_id  = "f7k2m9x4qp1a"   // optional
     language  = "hi"             // optional

out: { "disease": "Tomato Late Blight",
       "confidence": 0.87,
       "severity": "moderate",           // low | moderate | severe
       "recommendation": "Remove affected leaves and...",
       "healthy": false,
       "crop": "Tomato",
       "predictions": [ { "label": "...", "crop": "Tomato",
                          "condition": "Late blight", "healthy": false,
                          "probability": 0.87 } ],   // 3 items — the old shape, still here
       "model": "...", "meta": {...} }
```

**The old `predictions` list is still there.** Existing code keeps working without changes. The new flat fields (`disease`, `severity`, `recommendation`) are extra.

**Do not force a diagnosis.** If `confidence` is below about 0.60, the reply will say so — show "we cannot tell reliably, please take a clearer photo of one affected leaf in daylight" rather than a disease name. That is better product behaviour, and judges notice it.

---

## `POST /api/soil-card`
> ✅ **Live** (Gemini). Small differences: no `confidence` per value and no `field_id`. The dashboard's Soil Health page does the four steps below.

Read a Soil Health Card photo or PDF.

```
in:  multipart form
     file      = image or pdf
     field_id  = "..."   // optional

out: { "extracted": {
         "N":  { "value": 112, "unit": "kg/ha", "confidence": 0.91,
                 "raw_text": "Available N 112" },
         "P":  {...}, "K": {...}, "ph": {...} },
       "requires_confirmation": true,
       "warnings": ["K not found on the card — please enter it by hand"],
       "meta": {...} }
```

**`requires_confirmation` is always `true`. It is never calculated.**

This matters. An AI reading a photo can misread a number. **The farmer must confirm every value before it is saved.**

**Harry — what the screen must do:**
1. Show all four numbers in boxes the farmer can **edit**
2. Show the `raw_text` next to each one, so they can check it against the card
3. Show anything in `warnings`
4. Nothing is saved until the farmer presses **Confirm**

Never save these values straight from the reply.

---

## `POST /api/advisor`
> ⚠️ **Replaced by `POST /api/chat`.** There is no stored `field_id` yet, so the page sends the farm's real data itself in `context` (farm, season, weather, soil, NDVI, top crops, last leaf scan). Only filled-in values are sent. The reply is `{answer, sources}`; there is no `context_used` yet.

The farm chat. Ask a question, get an answer about *this* field.

```
in:  { "question": "Should I water tomorrow?",
       "field_id": "f7k2m9x4qp1a",
       "language": "hi",                             // optional, default "en"
       "history": [ { "role": "user", "content": "..." } ] }  // optional, last 6

out: { "answer": "...",
       "language": "hi",
       "context_used": { "soil": {...}, "weather": {...}, "ndvi": {...},
                         "crop": "...", "growth_stage": "flowering",
                         "disease_history": [...], "mandi": {...} },
       "advisory_id": "...",
       "meta": {...} }
```

**You only send the question and the `field_id`.** The server looks up the soil, weather, NDVI, crop, growth stage, disease history and market price by itself and gives them to Gemini. Do not try to send that context yourself.

**`context_used` is worth showing.** Print something like *"based on: NDVI 0.42 (18 Sep), pH 6.8 (from soil card)"* under the answer. It shows the advice is grounded in this farmer's actual field, and it costs nothing to add.

Answers come back in the language you ask for — `en`, `hi`, `mr`, `te`.

---

# Smaller APIs

| API | What it does | Status |
|---|---|---|
| `GET /api/places?q=` | Search for a village or town | ⚠️ Live — suggestions only; get the position from `GET /api/place?id=` |
| `GET /api/reverse-geocode?lat=&lng=` | Turn coordinates into a place name | ✅ Live |
| `GET /api/weather?lat=&lng=` | Current weather and 15-day forecast | ⏳ Not built — the pages call Open-Meteo directly |
| `GET /api/mandi?commodity=&state=&district=` | Market prices, live from data.gov.in | ⏳ On hold — data.gov.in key pending |
| `POST /api/voice/transcribe` | Send audio, get text | ⏳ Not built |
| `POST /api/voice/speak` | Send text, get audio back | ⏳ Not built |
| `GET /api/model-info` | Our accuracy numbers, for the demo | ⏳ Not built |
| `GET /api/config` | The contract version | ⏳ Not built |
| `GET /healthz` | Is the server alive | ⏳ Not built — use `GET /api/auth/config` |

---

# For Percy — satellite

> ✅ **Done, with a different name.** Percy wrote `get_current_field_environment(latitude, longitude)` in `crop_model/earth_engine/feature_builder.py`. `/api/satellite` uses it. Still wanted: an NDVI series over time (for a trend chart), the photo date, and the `SCL` band for cloud masking instead of `QA60`.

**Write one function. Nothing else.** No web code, no saving, no error handling beyond raising.

```python
# backend/services/earth_engine.py

class EarthEngineError(Exception):
    """Raise this if you cannot get the data for any reason."""


def fetch_indices(latitude, longitude, *, buffer_m=300, end_date=None) -> dict:
    """Return exactly this dictionary, or raise EarthEngineError."""
    return {
        "ndvi": 0.42,                    # float, 0 to 1, average over the area
        "ndvi_date": "2026-09-18",       # the date of the image used
        "ndvi_series": [                 # up to 12 points over 90 days
            {"date": "2026-07-05", "ndvi": 0.31},
        ],
        "rainfall_30d": 112.4,           # mm, last 30 days (CHIRPS)
        "temperature": 29.4,             # °C, average of last 7 days (ERA5-Land)
        "cloud_cover_pct": 12.0,         # or None
        "source": "sentinel2_sr+chirps+era5_land",
    }
```

**Poirot handles everything else** — the web route, saving results, timeouts, retries, and the fake version. You never touch Flask.

If Earth Engine access has not come through yet, **keep working anyway.** A working fake version of this function is already in the repo, so the rest of the app runs. Swap yours in when you are ready.

---

# For Katniss — disease

> ✅ **Done differently.** The model runs in the browser (`disease-model.tflite`, loaded from `vendor/tflite/`). The confidence limits below are in place (0.80 / 0.60, from `CONF_THRESHOLDS`), and the photo-quality check (`image_guard.py`) runs on the server in `/api/disease/advice`. The 38 disease names are kept in three places that must match: `server.py`, `app.js` and `src/services/farmApi.js`.

**Write one function.**

```python
# backend/services/disease_model.py

def predict_disease(image_bytes: bytes) -> dict:
    """Return exactly this dictionary."""
    return {
        "predictions": [                 # top 3, most likely first
            {"label": "Tomato___Late_blight", "crop": "Tomato",
             "condition": "Late blight", "healthy": False, "probability": 0.87},
        ],
        "disease": "Tomato Late Blight",
        "confidence": 0.87,
        "severity": "moderate",          # low | moderate | severe
    }
```

Two things to build in:

**1. A confidence limit.** Do not force a diagnosis:
- 0.80 and above → give the disease name
- 0.60 to 0.80 → say "possible disease"
- below 0.60 → say "cannot diagnose reliably from this photo"

**2. A photo quality check.** Before predicting, check: is it blurry, is a leaf visible, is there enough light, is there even a plant in it. Gemini can help with this.

Saying "I am not sure" makes the product **more** trustworthy, not less.

---

# Questions

Anything unclear, or you need a field that is not here — message Poirot. **Adding a new optional field is always allowed**, so do not build a workaround. Just ask.
