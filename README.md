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
├── input_guard.py               Training-distribution and input validation logic
├── server.py                    Flask server and primary API
├── bundle.pkl                   Serialized crop recommendation model
├── crop_disease_mobilenetv2.keras Server-side disease model
├── disease-model.tflite         Browser-side disease model
├── krishi_sahayak/              Optional Gemini + Chroma RAG assistant
│   ├── backend/main.py          FastAPI chat, upload, and weather endpoints
│   └── frontend/                Standalone assistant UI
├── src/features/crop-calendar/ React crop-calendar component implementation
└── render.yaml                  Render deployment configuration
```

The primary production path is the vanilla HTML/CSS/JavaScript app served by `server.py`. The React files under `src/features/crop-calendar` are a reusable component implementation and are not built by the current root project because there is no root `package.json` or frontend bundler configuration.

## Requirements

- Python 3.10 or newer is recommended.
- A modern browser with JavaScript enabled.
- Approximately 200 MB or more of memory for the loaded ML models.
- Optional: an OpenAI API key and model name for the Flask/Vercel farm assistant.
- Optional: a Google OAuth client ID for Google sign-in.
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

| Variable | Used by | Purpose |
| --- | --- | --- |
| `SECRET_KEY` | Flask | Signs sessions. Set this in every deployed environment. |
| `OPENAI_API_KEY` | Flask and `api/chat.js` | Enables the Kisan AI/Mita assistant. Keep it server-side. |
| `OPENAI_MODEL` | Flask and `api/chat.js` | OpenAI Responses API model name. |
| `GOOGLE_CLIENT_ID` | Flask | Enables Google sign-in. |
| `PIN_LENGTH` | Flask | PIN length; defaults to `4`. |
| `AUTH_DB_PATH` | Flask | Optional SQLite database path; defaults to `data/users.db`. |
| `PORT` | Flask/hosting | Listening port; defaults to `8080`. |

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

### Farm assistant options

There are two assistant integrations:

1. **Primary app assistant:** `server.py` and `api/chat.js` call the OpenAI Responses API using `OPENAI_API_KEY` and `OPENAI_MODEL`.
2. **Krishi Sahayak RAG assistant:** `krishi_sahayak/backend/main.py` uses Gemini, LangChain, and ChromaDB. It can ingest PDF/TXT knowledge files and answer questions from the stored documents.

The floating assistant widget loads `krishi_sahayak/frontend/index.html`. To use its RAG backend, configure `krishi_sahayak/backend/.env` with `GEMINI_API_KEY` and run the separate FastAPI service described below.

## API reference

The Flask service in `server.py` exposes:

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/` | Serves `index.html`. |
| `POST` | `/api/recommend` | Returns top crop recommendations from numeric field inputs. |
| `POST` | `/api/disease` | Accepts multipart field `photo`; returns top disease predictions. |
| `POST` | `/api/chat` | Sends a question, context, language, and recent history to the configured AI model. |
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

The optional RAG backend exposes:

| Method | Route | Description |
| --- | --- | --- |
| `POST` | `/api/chat` | Answers a question with Gemini and retrieved ChromaDB context. |
| `POST` | `/api/upload` | Ingests a PDF or TXT file into the ChromaDB collection. |
| `GET` | `/api/weather?lat=&lon=` | Returns the current placeholder weather response. |

## Running Krishi Sahayak separately

The RAG assistant has its own Python environment and dependency list:

```bash
cd krishi_sahayak/backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Set GEMINI_API_KEY in .env
uvicorn main:app --reload --port 8001
```

Serve its standalone frontend from another terminal:

```bash
cd krishi_sahayak/frontend
python3 -m http.server 5500
```

Open [http://localhost:5500/index.html](http://localhost:5500/index.html). Docker Compose is also available from `krishi_sahayak/` and starts the FastAPI backend on port `8001` plus an Nginx frontend on port `80`.

## Deployment

`render.yaml` describes the hosted Flask deployment:

```bash
pip install -r requirements.txt
gunicorn server:app --bind 0.0.0.0:$PORT --workers 1 --threads 4 --timeout 120
```

The single worker is intentional because each process loads the recommendation model and may load the disease model. Configure `SECRET_KEY`, `OPENAI_API_KEY`, `OPENAI_MODEL`, and, if needed, `GOOGLE_CLIENT_ID` in the hosting provider’s secret environment settings. The SQLite auth database is local to the service filesystem; use a persistent disk or replace it with a managed database for production accounts.

## Development notes and limitations

- There is currently no root frontend build or package manager configuration; edit the HTML, CSS, and JavaScript directly.
- No automated test suite is included. Validate changes manually by starting `server.py` and checking planner, dashboard, disease, login, and assistant flows.
- The frontend may use external Google Fonts and Open-Meteo, so fully offline use is limited even though local model assets are bundled.
- The default Flask session secret is intentionally insecure and must not be used in production.
- The Flask server blocks direct requests for sensitive model, environment, Python, database, and pickle files.
- Disease and crop predictions should be treated as probabilistic guidance. Image quality, crop variety, regional conditions, and model training coverage affect results.
- The RAG weather endpoint currently returns fixed demo values rather than querying a live weather provider.

## License

See [LICENSE](LICENSE).