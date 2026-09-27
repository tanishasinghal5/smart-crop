# Poirot plan — backend, Google Cloud, and joining it all together

> **The team-facing API list lives in [api-contract.md](api-contract.md).**
> That is the file you paste in the team chat at 11:00 on Day 1. This file is your own task list.

---

## Progress (updated 2026-09-27)

| | Task | Notes |
|---|---|---|
| DONE | 1 Google Cloud project + billing | `smart-crop-hack`, project number 286027085179 |
| DONE | 2 Spending alert | |
| DONE | 3 Old leaked Gemini key deleted | The live key was never committed; only the dead one was exposed |
| DONE | 4 Earth Engine applied for | **Step 7 (Percy's project access) STILL ON HOLD** |
| DONE | 5 16 Google APIs enabled | Verified one by one |
| DONE | 6 Firestore | Native mode, `asia-south1`, verified |
| DONE | 7 Service account | `run-backend@smart-crop-hack.iam.gserviceaccount.com`, 6 roles, **0 key files** |
| DONE | 8 Two Maps keys | Server key in Secret Manager; browser key restricted to localhost:8080/5173/3000 |
| NEXT | 9 Give Harry the browser key | ⭐ He is blocked on this |
| | 10 Gemini + data.gov.in keys into Secret Manager | |
| | 11 First Cloud Run deploy | |
| | 12-13 Branches + publish contract | Overtaken by events, see below |
| | 14+ | See the replan note |

### Must not be forgotten
- **After Task 11:** add the real Cloud Run address to `maps-browser-key`. Until then Harry's map works on his laptop and **fails on the live site**. It will look like his bug; it is not.
- **Task 4, Step 7:** Percy cannot test real Earth Engine data until he has project access.

### Replan note (2026-09-27)
The team did not wait for the contract. Three branches now exist and none are merged:
`feature/crop-model-pipeline` (Percy), `disease-new` (Katniss), `codex/krishi-ai-frontend` (Harry),
plus `feature/soil-from-location` (recovered work).

This changes three things:
1. **Task 14 (splitting `server.py`) should be dropped.** Katniss has added 96 lines to `server.py`. Splitting it now means redoing her work by hand for no demo benefit.
2. **Merging is now the critical path**, not publishing the contract.
3. **Two people added Node** (`src/geminiProxy.js`, `server.mjs`) plus two different `package.json` files. The plan is one Flask service. `.env.example` and `package.json` are the only real merge conflicts.

Still open with the team:
- Harry: is the new Vite app replacing the existing site, or a side experiment?
- Katniss: can the Gemini call move from JavaScript into Python?

Also note: Percy's `get_environment_features(state, district, year, season)` gives **district-level historical** data for training. `/api/satellite` needs **one field, right now** (`fetch_indices(lat, lon)`, Sentinel-2). Nobody has built that yet. And his `client.py` uses browser login, which cannot work on Cloud Run — it needs the service account.

---

## Why this plan exists

The guide in `hack2skill.docx` splits the work between four people. You are **Hercule Poirot**. Your job is the **backend** (the server), **Google Cloud**, and **joining everyone's work together**.

The guide says it plainly: *"nothing reaches production without going through his APIs."* The other three wait for you:

- **Harry** — screens, maps, farmer experience
- **Percy** — crop model + satellite data
- **Katniss** — leaf disease detection

So your first job is not code. It is to **publish the list of APIs by 11:00 on Day 1** so nobody sits idle.

There is also a rule from the hackathon: **you must use Google AI.** Gemini, Maps, Earth Engine, Firebase, Cloud Run, BigQuery, Cloud Speech. Right now the app uses several non-Google services. Some must be swapped.

---

## What the app has today

| The guide expects | What is really there |
|---|---|
| A Flask server | Yes — `server.py`. But one big file, 484 lines, everything inside it |
| Firebase login + Firestore | No. It uses cookies and a small SQLite file at `data/users.db` |
| Cloud Run | No. It goes to Render (`render.yaml`). No Dockerfile |
| Gemini | No. `/api/chat` calls **OpenAI**, and the key is missing, so it fails |
| Satellite / NDVI | No. Nothing at all in the code |
| Google Maps | No map anywhere. Location is just a text box |
| Saving answers to reuse (cache) | No |
| `/api/farm`, `/api/satellite`, `/api/recommend-crop`, `/api/soil-card`, `/api/advisor` | None of them exist |

### Three problems you must know about

**1. The login will break on Cloud Run.**
Users are stored in a file (`data/users.db`). Cloud Run gives each copy of your server its own empty disk, and wipes it on every deploy. So a farmer who signs up on one copy cannot log in on another. Everyone disappears when you redeploy.
→ So saving data in **Firestore is a must**, not a choice. (Changing the *login screen* to Firebase is still optional. That difference is what keeps Harry safe.)

**2. The chat box on the website is already broken.**
`krishi_sahayak/frontend/widget.js` is loaded on **all five pages**. It opens a chat that talks to `http://localhost:8001` (`krishi_sahayak/frontend/script.js:61`). That address only exists on your own laptop. On the internet it fails.
It gets worse: that server uses two Gemini model names that **do not exist**, and its search index is **empty** — 0 items in it.
→ Fix this on **Day 1**, not Day 3.

**3. Private files are being served to anyone.**
Flask shares the whole project folder. It blocks a few file types (`server.py:169`) but not `.txt`. So `merge_conflicts.txt` (117 KB of leftover junk) can be downloaded by anyone right now.

### One piece of good news
The screens already work out `state`, `district` (`app.js:3091`) and the season (`app.js:3149`). So the new crop API can get what it needs. **Harry does not need to build anything new for this.**

---

## Five rules to follow all three days

1. **Only add. Never break.** New APIs sit next to the old ones. Old replies keep all their old fields. Harry's code keeps working for three days without a single change.
2. **Firebase is added, not swapped in.** `/api/auth/*` must keep the exact same inputs and outputs for three days. No exceptions.
3. **Do not install TensorFlow on Cloud Run.** It is about 600 MB and makes startup slow. Use **Gemini** to read leaf photos instead. Bonus: Gemini can also say how bad it is and what to do — the old model cannot do that.
4. **Every reply carries `meta.source`.** It says `live`, `cache`, `cache_stale`, or `mock`. This one field tells the whole team what is real and what is still fake. No meetings needed.
5. **Fake replies never fail.** If something breaks, send saved or fake data — and say so in `meta.source`. The demo must never die. But never pretend fake data is real.

---

# The task list

Each task below is small. Do one, check it works, then start the next.

---

## DAY 1, MORNING — the 9-to-11 team block

This is the most important two hours of the three days.

### Task 1 — Make the Google Cloud project (09:00)
Create the project. **Add billing first**, because Cloud Run, Maps and Speech will not switch on without it.
**Done when:** the project exists and billing is linked.

### Task 2 — Set a spending alert (09:02)
Set a budget alert at ₹500 with an email warning.
**Why:** two minutes now saves a nasty surprise later.

> **Will linking a card cost money?**
> **No. Linking a card and being charged are two different things.** Nothing is taken when you link it.
> - New accounts get **$300 free for 90 days**. While you are on this free trial, Google will **not** charge you automatically when the money runs out. The account just pauses until you choose to upgrade. That is your safety net.
> - Many services are **always free up to a limit**, even without the trial: Cloud Run about 2 million requests a month, Firestore about 50,000 reads and 20,000 writes a day, Cloud Build 120 minutes a day, BigQuery 1 TB of queries a month. Gemini through AI Studio has a free level too.
> - **Three things can actually cost money:**
>   1. **`min-instances=1`** — this keeps one server awake all the time, so it charges by the hour instead of by the request. It is only a few dollars, and the free credit covers it. Turn it on Day 2 evening, and **turn it off after the demo.**
>   2. **Earth Engine** — free for study and research, paid for business use. The sign-up form asks you to pick. **Choose the non-commercial / academic option.** This is the one choice that could give you a real bill.
>   3. **Maps** — Google swapped the old $200 monthly credit for per-API free call limits in 2025. Check the current numbers when you switch it on. The plan saves map lookups for 30 days partly to stay inside the free limit.
> - Numbers change, so check the live pricing page when you turn each service on. Do not trust these figures blindly.

### Task 3 — Cancel the old leaked Gemini key (09:05)
**Checked on 2026-09-22 — this is smaller than it first looked.**

A Gemini key was committed in `afdeb92` (the first commit) and untracked later in `d4c3fa6` on 2026-08-12. It is still readable in git history.

**But the key in use today is a different one**, so the key was already replaced at some point:

| | |
|---|---|
| Key in git history | ends `...0R3yZQ` |
| Key in use today | ends `...q44dcg` |

Both `.env` files are properly ignored now, and nothing secret-looking is tracked. So all that is left:

1. Check whether `github.com/tanishasinghal5/smart-crop` is public. If it is, the old key is readable by anyone.
2. Go to **https://aistudio.google.com/apikey**
3. Find the key ending **`0R3yZQ`** and delete it. If it is not listed, you already removed it.
4. **Do not delete the one ending `q44dcg`** — the chat uses that today.

**Do not clean git history now.** Rewriting history while four people have branches will cost you half a day. Deleting the key is what actually matters. Clean history after the hackathon.

**Done when:** the key ending `0R3yZQ` is gone from AI Studio.

### Task 4 — Apply for Earth Engine (09:10)
Do this early. It is the **only thing with a waiting time you cannot control**, and Percy's whole job depends on it.
Sign up the project *and* a service account. Pick the **non-commercial / academic** option.
**Done when:** the application is submitted.

### Task 5 — Switch on the services you need (09:15)
Turn on: Cloud Run, Cloud Build, Artifact Registry, Secret Manager, Firestore, Identity Toolkit, Gemini (Generative Language), Geocoding, Places, Maps, Speech-to-Text, Text-to-Speech, Translation, BigQuery, Earth Engine.
**Done when:** all show as enabled.

### Task 6 — Set up Firebase and Firestore (09:30)
Add Firebase to the **same** project. Create Firestore in **Native mode**, region **`asia-south1`** (same region as Cloud Run, so it is fast). Turn on Google and Phone sign-in.
**Done when:** you can see an empty Firestore database.

### Task 7 — Make the service account (09:45)
Create `run-backend@`. Give it these roles: `datastore.user`, `secretmanager.secretAccessor`, `bigquery.jobUser`, `bigquery.dataViewer`, `earthengine.writer`, `aiplatform.user`. Add it to the Earth Engine project too.
**Done when:** the account exists with all six roles.

### Task 8 — Make two Maps keys (10:00)
- `maps-server-key` — locked to specific APIs, for your server.
- `maps-browser-key` — locked to your website address plus localhost, for the browser.

### Task 9 — Give Harry the browser key (10:15) ⭐
**This is the most time-critical handover of the whole hackathon.** The map is Harry's biggest piece of work and he cannot start without this key.
**Done when:** Harry confirms he has it.

### Task 10 — Make the last two keys (10:20)
A new Gemini key (put it in Secret Manager, never in a file). Sign up for a free data.gov.in key — it is instant.

### Task 11 — Deploy the app exactly as it is (10:40)
Run `gcloud run deploy --source .` on the **current, unchanged** server.py.
**Why:** you are not testing your new code. You are testing that deploying works at all, and you want a live web address.
**Done when:** you have a working URL.

### Task 12 — Make the branches (10:55)
There is no `develop` branch yet. Make `develop` from `main`, then `feature/backend-poirot`, `feature/frontend-harry`, `feature/ml-percy`, `feature/disease-katniss`. Protect `main`. Only you merge into it.

### Task 13 — Send the team three things (11:00) ⭐
1. The live Cloud Run URL
2. **[api-contract.md](api-contract.md)** — the frozen API list
3. That same file also holds Percy's and Katniss's function shapes

**A live URL at 11:00 beats a perfect design at 15:00.**
**After this moment, nobody changes the design.**

---

## DAY 1, AFTERNOON — tidy up and make everything answer

### Task 14 — Split server.py into folders (about 2 hours)
Leave a tiny `server.py` behind with three lines:
```python
from backend.app import create_app
app = create_app()
```
Keep the Windows port check at `server.py:468` — it is genuinely useful.
**Why this way:** `gunicorn server:app` and `python server.py` both keep working, and nobody has to learn anything new.

New shape:
```
backend/
  app.py       starts the app, loads the routes
  config.py    reads settings (use python-dotenv)
  routes/      auth farm satellite crop disease soil_card advisor voice geo mandi meta
  services/    cache earth_engine crop_model crop_recommender disease_model
               maps weather speech mandi bigquery growth
  gemini/      client.py prompts.py
  firebase/    admin.py auth.py store.py
  mocks/       fake replies as .json files
  data/        crop_agronomy.json   ← Percy's crop table
```

**Important rule: move the code only. Change nothing.** Then log in on your laptop to check it still works. Then commit. Only after that do you start adding new things. Never mix a move with a change — if something breaks you will not know which one did it.

If you want this smaller, do it in three commits: move the login code, check, commit. Then the crop code. Then the disease code.

> Small note: the current settings reader at `server.py:45` does not remove quote marks. So `KEY="abc"` loads *with* the quotes still attached. `python-dotenv` fixes this.

### Task 15 — Fix the file sharing (10 minutes)
Change `server.py:166` from "block these types" to "**allow only these types**": `html js css jpg jpeg png webp svg tflite mp4 woff2 json`. Block the folders `/data`, `/backend`, `/krishi_sahayak/backend`.
**Done when:** `merge_conflicts.txt` gives a 404.

### Task 16 — Load the crop model later, not at startup (30 minutes)
Right now `bundle.pkl` (10.6 MB) loads the moment the app starts (`server.py:62`). On Cloud Run this makes the first start slow.
Copy the pattern already used for the disease model at `server.py:95`: load it the first time someone asks. Then add a small background thread that loads it quietly after startup.
**Done when:** the app answers `/healthz` straight away.

### Task 17 — Set the cookie safety settings (10 minutes)
Set `SESSION_COOKIE_HTTPONLY`, `SESSION_COOKIE_SECURE`, `SESSION_COOKIE_SAMESITE`. None are set today.

### Task 18 — Write the save-and-reuse helper (cache) (1 hour)
Two layers:
- **Layer 1:** a dictionary inside the running app. Fast and free.
- **Layer 2:** a `cache` collection in Firestore. Shared by every copy of the server, and it survives restarts. Reading it takes about 30 ms. Asking Earth Engine takes 3 to 15 seconds.

**Do not use Memorystore (Redis).** It needs extra network setup — about 40 minutes you do not have.

**One trick that matters most:** round latitude and longitude to **3 decimal places** (about 110 metres) when making the key. Without this, a farmer moving the map pin slightly means you never reuse anything.

| What | Keep for | | What | Keep for |
|---|---|---|---|---|
| Satellite / NDVI | 24 hours | | Reverse geocode | 30 days |
| Weather now | 1 hour | | Mandi prices | 6 hours |
| Weather 30-day total | 12 hours | | District history | 7 days |
| Place search | 30 days | | Gemini explanation | 1 hour |
| | | | Soil card, advisor | **never save** |

Three behaviours matter more than the exact times:
1. **Use old data when live data fails.** If the real call breaks and you have an expired saved copy, send it and mark it `cache_stale`. **This is what stops the demo dying on stage.**
2. **Remember failures for 5 minutes**, so a broken service is not hit 50 times during a demo.
3. **Add `POST /api/cache/warm`** behind a password. Before the demo, run it for your three demo locations. Fifteen minutes of work that turns your slowest case into your fastest.

### Task 19 — Save data in Firestore (2 hours)
All fields, advice, disease checks and cache go to Firestore. **No screen changes needed.**

Keep fields at the **top level**, not inside users. `/api/advisor` only receives a `field_id`, so a flat layout is one quick lookup.
```
users/{uid}          name, phone, email, language, how_they_signed_in, created_at
fields/{field_id}    uid, name, latitude, longitude, area, state, district,
                     soil: {N, P, K, ph, source, confirmed_by_farmer},
                     current_crop, sowing_date, season,
                     last_satellite: {ndvi, ndvi_date, ndvi_status, fetched_at},
                     created_at, updated_at
  /advisories/{id}      question, answer, language, context_snapshot, created_at
  /disease_checks/{id}  disease, confidence, severity, recommendation, created_at
  /recommendations/{id} season, top3[], confidence_level, explanation, created_at
cache/{key}          namespace, value, expires_at
```
**Firestore rules: block all direct access from browsers.** Everything goes through your server. Three lines, and it removes a whole class of nasty surprises.

### Task 20 — Connect Gemini (1 hour)
Use the **`google-genai`** library. Not `langchain-google-genai`.
Write only three functions: `generate_text`, `extract_json`, `explain_recommendation`.
For reading soil cards, use `response_mime_type="application/json"` with a schema. **Never try to pull numbers out of plain text with pattern matching** — that is why structured output exists.

### Task 21 — Delete the second chat server (1 hour) ⭐
- Point `krishi_sahayak/frontend/script.js:61` at `/api/advisor` instead of `localhost:8001`
- Delete the whole `krishi_sahayak/backend/` folder
- Delete `api/chat.js`
- Delete the OpenAI code at `server.py:408-461`
- Delete the duplicate `setupAssistant` at `app.js:4547` (it is declared twice and the second one hides the first)

Keep the chat bubble itself — it already looks fine on all five pages.
**Result:** one server, one port, one chat.

### Task 22 — Make all seven APIs answer with fake data (2 hours)
The fake answers must be:
1. **The same every time for the same place.** Build the random numbers from the rounded location. If the numbers jump around, Harry cannot tell a layout bug from a data change.
2. **Believable.** NDVI `0.42`, not `0.99`. Rain `112.4`. Temperature `29.4`. Disease `"Tomato Late Blight"`, confidence `0.87`. A fake that looks fake teaches the team nothing.

### Task 23 — Write the Dockerfile and deploy (1 hour)
```dockerfile
FROM python:3.11-slim
ENV PYTHONUNBUFFERED=1 PIP_NO_CACHE_DIR=1 PORT=8080
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
RUN useradd -m app && chown -R app /app
USER app
CMD exec gunicorn backend.app:app --bind :$PORT --workers 1 --threads 8 \
    --timeout 120 --graceful-timeout 20 --access-logfile -
```
`--workers 1` because `render.yaml:7` already notes each copy uses about 200 MB. `--threads 8` because the work is mostly waiting for other services.

Leave out of the build: `.git/` (57 MB), `data/`, `__pycache__/`, `krishi_sahayak/backend/`, the `.mp4`, `merge_conflicts*.txt`, `input_guard*.py`, `fix_conflicts.py`, `docx guide/`, `crop_disease_mobilenetv2.keras`, and every `.pkl` **except** `bundle.pkl`.

**Keep the 60 MB of photos.** The app uses them as fallback crop pictures (`app.js:2596`). Moving them elsewhere is about 45 minutes of edits in `app.js` and would clash with Harry's work. A 2-minute build is fine.

Settings: `--memory=2Gi --cpu=2 --concurrency=8 --timeout=120 --max-instances=4`. Keys through Secret Manager, never inside the image.

### Task 24 — Copy users into Firestore when they log in (1 hour)
When someone logs in the normal way, also write their record into Firestore. **Login behaves exactly the same as before.** Also start accepting Firebase tokens — nothing sends them yet, but the door is open.

### Task 25 — Evening check (20:00)
Run a shape-only test against the live URL. It just checks all seven APIs reply with the right fields.
**If this passes, all three teammates can work for two days no matter what is still fake.**

---

## DAY 2 — swap fake for real

**Use one switch per service**, not one big switch. `EE_ENABLED`, `GEMINI_ENABLED`, `MAPS_ENABLED`, `SPEECH_ENABLED`, `BQ_ENABLED`, `MANDI_ENABLED`. All start off. Turn on **one at a time** and test before the next.
**Why:** one big switch means five things break together and you cannot tell which.

Also keep `MOCK_FALLBACK=1` today: if a real call fails, quietly use the fake one.

### Task 26 — Real satellite data
Plug in Percy's `fetch_indices`, behind the cache. If Earth Engine has not approved yet, keep the fake and say so in `meta.source`. **Do not wait.**

### Task 27 — Crop scoring, in four steps
This is the part the guide cares most about. It must not become "the model said soybean, so soybean".

1. **Pick candidates using farming rules, no AI.** Filter the 25 crops (`server.py:55`) by season, climate band, and whether the crop is even grown in that state. You get 6 to 10 crops. Uses `backend/data/crop_agronomy.json`, which Percy fills in.
2. **Score each one** out of 100 on three things: `soil_fit` (how close N/P/K/pH are to what the crop likes), `climate_fit` (temperature and rain), `regional_fit` (how much of that district grows it). **The old XGBoost model becomes a fourth score, `model_fit` — one opinion among four, not the answer.** Weights `.30 / .30 / .20 / .20`, kept in settings so you can adjust on Day 3 without redeploying.
3. **Sort and take the top 3.**
4. **Decide how sure you are.**
   - `high` — top score 70+, clearly ahead of second place, soil confirmed by the farmer, satellite data live
   - `medium` — score 55+, or some numbers were estimated → add a note about the doubt
   - `low` — anything else → still show three crops, but set `action_required` and let Gemini lead with the warning

Then Gemini writes the explanation **from these scores**, with clear instructions: *"Here is the ranking and the reasons. Explain it simply. Do not change the order and do not suggest a different crop."*

### Task 28 — Disease reading through Gemini
Keep a setting `DISEASE_BACKEND=gemini|keras|browser` so Katniss can compare on her own laptop.
Also fix this: the disease name list is written **twice**, in `server.py:70` and `app.js:5345`, with a comment admitting they must be kept in step. Serve the list from the server instead.

### Task 29 — Soil card reading through Gemini
This replaces Tesseract, which runs in the browser and is not a Google service.

### Task 30 — The advisor with real context
Your server gathers all of this itself, never trusting the browser. Fetch them at the same time, with an 8-second limit:

| Piece | Where it comes from |
|---|---|
| Soil | The field record, including where the numbers came from |
| Weather | Weather service, saved for 1 hour |
| NDVI | The copy stored on the field record |
| Crop | The field record plus the latest recommendation |
| Growth stage | **Worked out, not stored** — days since sowing → stage. About 30 minutes using the table already in `growth-planner-data.js` |
| Disease history | Last 3 checks |
| Mandi price | Latest price for that crop |

The prompt has three parts:
1. **Instructions** — who it is, plus the safety rules. **Copy the existing ones at `server.py:423-432`** rather than writing new ones; they are already well written. Add this line: *"Every number you give must appear in the CONTEXT below. If it is not there, say you do not have it."*
2. **CONTEXT** — short JSON where **every value says where it came from and how old it is**: `{"ndvi": {"value": 0.42, "as_of": "2026-09-18", "source": "sentinel2"}}`. This is what stops the AI sounding confident about things it does not know.
3. **The question**, plus the last 6 messages.

**For other languages, ask Gemini to answer in that language directly. Do not translate afterwards** — translating is slower and gives worse farming Hindi, Marathi and Telugu than Gemini writing it directly.

**The old search index is dropped, not postponed.** It has 0 items in it, its model names do not exist, and it rebuilds itself on every single request. If the pitch really needs it, the honest 45-minute version is 10 to 20 pages of ICAR farming guidance in one text file, filtered by crop and added to the prompt. No vector database.

### Task 31 — Maps for place search
Your `/api/places` and `/api/reverse-geocode` must return **the exact same shape the app already builds** (`{name, state, district, lat, lng, label, source}`). Then Harry changes a web address and nothing else. Keep the offline list at `app.js:3069` as a backup.

### Task 32 — Voice
Cloud Speech-to-Text and Text-to-Speech.

### Task 33 — Real mandi prices
From data.gov.in, saved for 6 hours.
**Why this matters:** the current prices come from a file dated **2026-08-12** with no way to refresh it. A judge who checks one price against data.gov.in will find it wrong. Keep the old file as a backup so nothing goes blank, but make the live data the main source and show the date.

### Task 34 — Turn on `min-instances=1` (evening)
Do it **now, not Day 3**, so you get a full day of watching how it behaves before it matters.

---

## DAY 3 — no new features at all

This is the guide's rule, and it is the one that saves projects.

### Task 35 — Turn off the fake fallback (09:00)
Set `MOCK_FALLBACK=0`. **After this moment the test cannot pass using fake data.** This is your honesty gate.

### Task 36 — Write and run the test script
`tests/smoke.py`, run against the **live URL**, not your laptop. Run it at 10:00, 14:00 and 30 minutes before the demo.

| # | Test | What it checks |
|---|---|---|
| 1 | Health | Everything answers in under 10 seconds |
| 2 | New farmer | Sign up → save field → read it back the same |
| 3 | Satellite | NDVI between 0 and 1, and **`meta.source` is `live`** |
| 4 | Soil card | All four values have a confidence, and `requires_confirmation` is `true` |
| 5 | Crop advice | Exactly 3, sorted, explanation in the right language |
| 6 | **Low confidence** | Deliberately silly inputs (pH 4.1, N 5, rain 20mm) must give `low` **and** `action_required: "soil_test"`. **This proves the confidence check is real and not decoration. A judge will ask.** |
| 7 | Disease | A known bad leaf gives a name, severity and advice |
| 8 | Advisor context | Hindi question gives a Hindi answer **containing a number that is also in the context you sent**. Cheap, and it proves the context is really being used |
| 9 | Languages | Same question in Marathi and Telugu |
| 10 | Voice | Speak then transcribe, and the text matches |
| 11 | Cache | Call satellite twice — the second says `cache` and takes under 300 ms |
| 12 | Breaking it | With wrong Earth Engine keys it **still returns 200**, marked `cache_stale` or `mock`. **Never a crash on stage.** |

### Task 37 — The accuracy page
You build the page; Percy and Katniss supply the numbers. Two files, `crop_metrics.json` and `disease_metrics.json`, served by `GET /api/model-info`.

**Rule: any accuracy number said out loud must be on that page.**

Two warnings for the team:
- Percy must split the data **by year, not randomly**, or the same district-crop patterns appear in both training and testing and the score looks fake-good.
- The crop score must be labelled *"on a public 2,200-row synthetic dataset"*. `TechRush\ml\crop_recommendation_extended.csv` is a well-known Kaggle practice file. A judge who spots an unlabelled "99% accurate" claim will doubt everything else you said.

### Task 38 — Last safety bits
Add a limit on PIN login attempts (there is none today).

---

## Which non-Google services must go

**Must be replaced** — all of these are on the demo path and all have a Google version:

| Now | Where | Replace with |
|---|---|---|
| Open-Meteo place search | `app.js:3085` | Google Maps, via `/api/places` |
| BigDataCloud reverse lookup | `app.js:3121` | Google Maps, via `/api/reverse-geocode` |
| Tesseract photo reading | `app.js:2811` | Gemini, via `/api/soil-card` |
| HuggingFace Whisper voice | `asr-worker.js` | Cloud Speech-to-Text |
| OpenAI chat | `server.py:408` | Gemini, via `/api/advisor` |

**Can stay, but move them to the server and label them clearly:**
- **Open-Meteo forecast** (`app.js:3181`) — Google has no free public weather API unless the Maps Weather API is available to you. **Be precise on stage:** the rain and temperature that feed the *model* come from Earth Engine (CHIRPS and ERA5-Land), which **are** Google. Open-Meteo is only the 7-day forecast strip.
- **ISRIC SoilGrids** (`app.js:3238`) — no Google version exists, and it is the same kind of public source as FAO and WHO, which the rules allow. Label it "estimate — please check against your Soil Health Card".

**Fine as they are:** the browser's built-in voice input (`app.js:3551`) is a browser feature, not a service — keep it as a backup. And `disease-model.tflite` is your own model running in the browser, which is already the main path.

---

## Files

**Create:** the `backend/` folders, `Dockerfile`, `.dockerignore`, `.gcloudignore`, `tests/smoke.py`.
**Change:** `server.py` → three lines. `requirements.txt` → add `google-genai`, `firebase-admin`, `google-cloud-firestore`, `google-cloud-speech`, `google-cloud-texttospeech`, `google-cloud-bigquery`, `earthengine-api`, `googlemaps`, `python-dotenv`; remove `requests`; **never add `tensorflow`, `langchain` or `chromadb`**. `.gitignore` → add `*.env`, `.secret_key`, `*-key.json`, `serviceAccount*.json`.
**Delete:** `krishi_sahayak/backend/`, `api/chat.js`, `fix_conflicts.py`, `input_guard (1).py`, `merge_conflicts*.txt`.

## How to check your work

1. On your laptop: `python server.py`. The home page, the old login and `/api/recommend` must all still work after the folder move. **Run this before every commit.**
2. Try each new API with `curl` and check every reply has `meta.source`.
3. Deploy and run the same checks against the live URL.
4. `pytest tests/smoke.py --base-url <your-url>` — all 12 pass, nothing unexpectedly says `mock`.
5. Open it on a phone-sized screen and click through the whole journey.

## What could go wrong, worst first

1. **Earth Engine approval is slow.** Nobody controls this. Apply at 09:10. **Decide at noon on Day 2:** if it has not come, ship the satellite part as clearly-labelled fake and say "pipeline built, waiting for Earth Engine approval". That is true, and it survives questions far better than a made-up number. Percy keeps working either way because his function shape is fixed from hour 2.
2. **Login breaks on Cloud Run.** Certain to happen without Firestore. Tasks 19 and 24 fix it. Emergency backup: `--max-instances=1` makes the old way *seem* to work for one demo — keep it in your pocket, do not rely on it.
3. **Changing login breaks something that already works.** Avoided entirely by rule 2: add, never swap.
4. **The old leaked Gemini key.** Lower risk than first thought — it was already replaced, so today's key was never committed. Just delete the dead one (ending `0R3yZQ`) from AI Studio at 09:05. Do not rewrite git history during the hackathon. Also delete the old copy of the project at `TechRush\terrabyte\smart-crop` from any laptop you will share on screen — it contains a secret key file.
5. **Slow first request.** The 10.6 MB model file is the cause. Tasks 16 and 34 handle it. Backup: steps 1 and 2 of the scoring do not need that file at all, so you can answer while it loads.
6. **The broken chat bubble.** Already broken today. If you skip Task 21, someone will open it during the demo.
7. **The app faking intelligence by itself.** `score()` at `app.js:2706` can never return below 61%. And if `/api/recommend` fails, `app.js:2716` quietly shows a hand-written list of 8 crops — so **a server outage looks like confident advice**. The `meta.source` field is the fix: Harry shows an "offline estimate" badge.
8. **Someone changes the API list after 11:00.** One file, one version number in `/api/config`, and changes need your approval. **Escape hatch: adding a new optional field is always allowed without asking.** That is what stops people going around the rule.

## What to drop if you run out of time

Drop in this order: the old search index (already going) → TensorFlow on the server → BigQuery beyond the single district query → Redis → API version prefixes → splitting the website and server onto different addresses → rewriting git history → moving the photos → the translation service.

**First real thing to drop if Day 2 runs late: Cloud voice.** The browser's own voice input already works for English and Hindi. Voice is one tick on the checklist. The satellite data and the advisor are the actual pitch.

**Never drop:** the frozen API list, the fake replies, the cache, Cloud Run, or the Day 3 tests.
