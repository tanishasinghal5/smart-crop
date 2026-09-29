# TerraByte Smart Crop

TerraByte Smart Crop is a farmer-focused field planning and crop intelligence application. It combines soil readings, weather signals, crop economics, crop-health image analysis, and multilingual assistance into a static web experience backed by a small Flask service.

The application is designed to help a farmer move from field data to an actionable season plan:

1. Enter or scan soil readings and add weather information.
2. Validate the readings and rank suitable crops with the bundled ML model.
3. Review weather impact, soil health, market indicators, restoration rotations, and estimated economics.
4. Select a crop to create a growing calendar with stages, tasks, tips, and reminders.
5. Optionally check a leaf photo or ask the farm assistant a question.

> Recommendations are decision support, not a replacement for local agricultural extension advice, soil testing, or certified agronomy guidance.

## Features

- **Crop recommendation:** ranks up to five crops from nitrogen, phosphorus, potassium, temperature, humidity, pH, and rainfall inputs.
- **Input protection:** detects impossible values, suspicious unit scales, and readings outside the training distribution before they are used for recommendations.
- **Weather-aware planning:** uses browser geolocation and Open-Meteo geocoding/forecast services when available, with local fallback values for offline or unavailable requests.
- **Soil restoration:** suggests rotation and green-manure options based on nutrient conditions.
- **Season planner:** compares goals such as maximum profit, safest bet, low water use, and low investment using bundled growth and price data.
- **Crop calendar:** shows crop progress, growing stages, weather impact, today’s tasks, farming tips, and optional browser notifications.
- **Disease check:** accepts a leaf image and runs the TensorFlow Lite model in the browser where supported. The Flask endpoint provides a server-side Keras fallback.
- **Farm assistant:** provides multilingual text and voice interaction. The main app supports English, Hindi, Marathi, and Telugu UI/content strings.
- **Authentication:** supports phone + username + PIN accounts and optional Google sign-in through the Flask service.
- **Printable summary:** creates a printable field recommendation report from the dashboard.
- **Responsive static frontend:** no frontend build step is required for the primary app.

## Repository layout

```text
smart-crop/
├── index.html                  Landing page
├── planner.html                Soil, weather, goals, and planning workflow
├── dashboard.html              Recommendations, economics, calendar, and summary
├── disease.html                Leaf image disease checker
├── login.html                  Authentication UI
├── profile.html                Profile management UI
├── app.js                      Shared frontend logic, state, APIs, and translations
├── styles.css                  Main visual system
├── growth-engine.js             Season planning and crop economics
├── growth-planner-data.js       Crop profiles and planning data
├── mandi-prices-data.js         Indicative market price data
├── krishi-dashboard.html        Farmer dashboard (src/main.js, src/services/farmApi.js)
├── input_guard.py               Training-distribution and input validation logic
├── server.py                    Flask server and primary API
├── user_store.py                User accounts in Firestore (SQLite fallback)
├── bundle.pkl                   Serialized crop recommendation model
├── crop_disease_mobilenetv2.keras Server-side disease model
├── disease-model.tflite         Browser-side disease model
├── crop_model/                  Percy's crop pipeline and Earth Engine helpers
├── krishi_sahayak/frontend/     The 🌱 chat widget (answers via /api/chat)
├── tests/smoke.py               One-command check of the live site
├── src/features/crop-calendar/ React crop-calendar component implementation
├── Dockerfile                   Cloud Run image
└── render.yaml                  Old Render deployment configuration
```

The primary production path is the vanilla HTML/CSS/JavaScript app served by `server.py`. The React files under `src/features/crop-calendar` are a reusable component implementation and are not built by the current root project because there is no root `package.json` or frontend bundler configuration.

## Requirements

- Python 3.10 or newer is recommended.
- A modern browser with JavaScript enabled.
- Approximately 200 MB or more of memory for the loaded ML models.
- A Gemini API key for the soil card reader, disease advice and farm chat.
- Optional: a Google Maps server key (village search), Earth Engine access (Field Health) and a Google OAuth client ID (Google sign-in). See `.env.example`.
- Optional: TensorFlow/Keras if server-side disease inference is required. Browser-side TFLite inference is the normal fallback.

## Local setup

From the `smart-crop` directory:

```bash
cd smart-crop
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Create a local environment file:

```bash
cp .env.example .env
```

At minimum, set a non-default session secret for anything beyond a throwaway local run:

```dotenv
SECRET_KEY=replace-with-a-long-random-value
```

Start the application:

```bash
python server.py
```

Open [http://localhost:8080](http://localhost:8080). The server serves the static pages and the `/api/*` routes from the same origin, which avoids cross-origin issues and allows authentication cookies to work correctly.

### Optional environment variables

`.env.example` lists every setting with a short explanation. The main ones:

| Variable | Purpose |
| --- | --- |
| `SECRET_KEY` | Signs sessions. Set this in every deployed environment. |
| `GEMINI_API_KEY` | Soil card, disease advice and farm chat (Gemini). |
| `GEMINI_MODEL`, `GEMINI_FALLBACK_MODEL` | Main and backup Gemini models. |
| `MAPS_SERVER_KEY` | Village search and GPS to village name (Google Maps). |
| `EARTH_ENGINE_PROJECT_ID` | Field Health satellite data (Earth Engine). |
| `GOOGLE_CLIENT_ID` | Enables Google sign-in. |
| `AUTH_STORE` | `firestore` (default) or `sqlite`. |
| `PIN_LENGTH` | PIN length; defaults to `4`. |
| `PORT` | Listening port; defaults to `8080`. |

## How the primary stack works

### Frontend

The pages are plain HTML files. `app.js` is shared across the landing page, planner, dashboard, authentication, and disease-check flows. It stores field and profile state in browser `localStorage`, including:

- `terraField` for the current field readings and forecast
- `terraProfile` for the local profile state
- `terraLanguage` for the selected language
- `terraTheme` for the colour mode
- `terraSelectedCrop` for the selected crop plan
- `terraCalendar_<crop>` for calendar progress and task state

The frontend first attempts `/api/recommend`. If the service is unavailable, the dashboard falls back to its local ranking logic. Weather is fetched from Open-Meteo when the browser can obtain a location; cached or sample values keep the planning UI usable when it cannot.

### Crop recommendation model

`bundle.pkl` contains the serialized recommendation model. The Flask service expects these numeric fields:

```json
{
  "N": 90,
  "P": 42,
  "K": 38,
  "temperature": 27,
  "humidity": 65,
  "ph": 6.5,
  "rainfall": 164
}
```

The model returns the five highest-probability crops from its 25-class label set. `input_guard.py` contains the validation and unit-scale guidance used by the planner UI; run it independently when working with training data or changing input ranges.

### Disease detection

The disease page uses `disease-model.tflite` and the files under `vendor/tflite/` for client-side inference. The browser path does not require TensorFlow on the server. The Flask `/api/disease` endpoint lazily loads `crop_disease_mobilenetv2.keras`, resizes an uploaded image to 224 x 224, and returns the top three predictions. If Keras cannot load, the endpoint returns `503` while the browser detector can still be used.

### Farm assistant

The floating 🌱 chat widget (`krishi_sahayak/frontend/`) and the dashboard's AI Advisor both call `POST /api/chat` in `server.py`, which answers with Gemini. If the main model is busy or out of free calls, the server tries `GEMINI_FALLBACK_MODEL`. There is no separate chat server.

## API reference

The Flask service in `server.py` exposes:

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/` | Serves `index.html`. |
| `POST` | `/api/recommend` | Returns top crop recommendations from numeric field inputs. |
| `POST` | `/api/disease` | Accepts multipart field `photo`; returns top disease predictions. |
| `POST` | `/api/chat` | Answers a farm question with Gemini, using the context, language and recent history sent. |
| `POST` | `/api/soil-card` | Reads a Soil Health Card photo or PDF with Gemini. |
| `POST` | `/api/disease/advice` | Gemini second opinion, severity and steps for a leaf diagnosis. |
| `GET` | `/api/places`, `/api/place`, `/api/reverse-geocode` | Village search and GPS to village name (Google Maps). |
| `POST` | `/api/satellite` | Sentinel-2 NDVI, CHIRPS rain and ERA5 for a farm (Earth Engine). |
| `GET` | `/api/auth/config` | Returns PIN configuration and available Google client configuration. |
| `POST` | `/api/auth/register` | Creates a phone + username + PIN account. |
| `POST` | `/api/auth/login` | Logs in with phone, username, and PIN. |
| `POST` | `/api/auth/google` | Verifies a Google credential and creates or links an account. |
| `GET` | `/api/auth/me` | Returns the current session user. |
| `POST` | `/api/auth/logout` | Clears the current session. |
| `POST` | `/api/auth/profile` | Updates the signed-in user’s name. |
| `POST` | `/api/auth/phone` | Adds or changes a signed-in user’s phone number. |
| `POST` | `/api/auth/pin` | Adds or changes a signed-in user’s PIN. |
| `POST` | `/api/auth/delete` | Deletes the signed-in user and session. |

Example recommendation request:

```bash
curl -X POST http://localhost:8080/api/recommend \
  -H 'Content-Type: application/json' \
  -d '{"N":90,"P":42,"K":38,"temperature":27,"humidity":65,"ph":6.5,"rainfall":164}'
```

## Deployment

The live site runs on **Google Cloud Run** (region `asia-south1`), built from the `Dockerfile`. From the project folder:

```bash
gcloud run deploy smart-crop --source . --region=asia-south1 --allow-unauthenticated --service-account=run-backend@smart-crop-hack.iam.gserviceaccount.com --memory=2Gi --cpu=2
```

The keys come from Secret Manager; accounts are stored in Firestore, so they survive deploys. After a deploy, check the site with `python tests/smoke.py <url>`. `render.yaml` is the older Render setup and is no longer used.

## Development notes and limitations

- There is currently no root frontend build or package manager configuration; edit the HTML, CSS, and JavaScript directly.
- `tests/smoke.py` checks every live route in about a minute (`--gemini` also checks Gemini). Still click through the planner, dashboard, disease, login and chat flows after UI changes.
- The frontend may use external Google Fonts and Open-Meteo, so fully offline use is limited even though local model assets are bundled.
- The default Flask session secret is intentionally insecure and must not be used in production.
- The Flask server blocks direct requests for sensitive model, environment, Python, database, and pickle files.
- Disease and crop predictions should be treated as probabilistic guidance. Image quality, crop variety, regional conditions, and model training coverage affect results.

## License

See [LICENSE](LICENSE).