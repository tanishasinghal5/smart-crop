// Single integration boundary: every server call goes through here. The Flask
// server serves this page, so paths are same-origin. UI does not hide failures.

// Calls the Flask server; on failure throws the server's own message.
export async function api(path, options = {}) {
  const response = await fetch(path, { credentials: 'same-origin', ...options });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw Object.assign(new Error(data.error || `Request failed (${response.status})`), { status: response.status, code: data.code });
  return data;
}

// Monsoon onset moves north over June, so kharif starts later in the north.
// Copied from seasonFor in app.js — keep the two in step.
function seasonFor(today, lat) {
  const month = today.getMonth() + 1, year = today.getFullYear();
  const onsetOffsetDays = Math.round(Math.max(0, Math.min(30, (lat - 8) * 1.15)));
  if (month >= 6 && month <= 9) {
    const start = new Date(year, 5, 1);
    start.setDate(start.getDate() + onsetOffsetDays);
    return { season: 'kharif', start };
  }
  if (month >= 10 || month <= 2) return { season: 'rabi', start: new Date(month >= 10 ? year : year - 1, 9, 1) };
  return { season: 'zaid', start: new Date(year, 2, 1) };
}
const isoDate = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

// PlantVillage class order comes from /disease-labels.json — the one copy,
// shared with server.py and app.js. It is loaded with the model.
function prettyDisease(label) {
  const clean = part => part.replace(/_/g, ' ').replace(/\s+/g, ' ').trim();
  const [crop, condition = ''] = label.split('___');
  return { crop: clean(crop), condition: clean(condition) || 'unknown' };
}
// tfjs + tflite runtime is vendored (same-origin) — Chrome blocks the WASM
// loader from a cross-origin CDN. Same loader as getDiseaseModel in app.js.
const TFLITE_DIR = '/vendor/tflite/';
let diseaseModelPromise = null;
function getDiseaseModel() {
  if (!diseaseModelPromise)
    diseaseModelPromise = (async () => {
      const load = src => new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src; script.onload = resolve; script.onerror = reject;
        document.head.appendChild(script);
      });
      const labelsReq = fetch('/disease-labels.json').then(r => {
        if (!r.ok) throw new Error(`Disease labels failed (${r.status})`);
        return r.json();
      });
      if (!window.tf) await load(TFLITE_DIR + 'tf.min.js');
      if (!window.tflite) await load(TFLITE_DIR + 'tf-tflite.min.js');
      window.tflite.setWasmPath(TFLITE_DIR);
      const [model, labels] = await Promise.all([window.tflite.loadTFLiteModel('/disease-model.tflite'), labelsReq]);
      return { model, labels };
    })().catch(error => { diseaseModelPromise = null; throw error; });
  return diseaseModelPromise;
}
async function detectDiseaseInBrowser(file) {
  const { model, labels } = await getDiseaseModel();
  const tf = window.tf;
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 224;
  canvas.getContext('2d').drawImage(bitmap, 0, 0, 224, 224);
  bitmap.close();
  // The saved model rescales internally, so raw 0-255 pixels go in as-is.
  const pixels = tf.browser.fromPixels(canvas).toFloat().expandDims(0);
  const output = model.predict(pixels);
  const probabilities = await output.data();
  pixels.dispose(); output.dispose();
  // A list that doesn't match the model would put wrong names on leaves.
  if (probabilities.length !== labels.length)
    throw new Error(`Model has ${probabilities.length} classes but ${labels.length} labels`);
  return Array.from(probabilities.keys())
    .sort((a, b) => probabilities[b] - probabilities[a])
    .slice(0, 3)
    .map(i => {
      const label = labels[i];
      const { crop, condition } = prettyDisease(label);
      return { label, crop, condition, healthy: condition.toLowerCase() === 'healthy', probability: probabilities[i] };
    });
}

export const farmApi = {
  // The signed-in user, or null when nobody is signed in.
  async currentUser() { try { return (await api('/api/auth/me')).user; } catch { return null; } },
  // The signed-in farmer's saved farm and soil ({farm, soil, updated_at}),
  // kept in Firestore so every device shows the same farm.
  async getFarm() { return api('/api/farm'); },
  async saveFarm(body) {
    return api('/api/farm', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
    });
  },
  // Village search — Google Places through the Flask server. The session token
  // makes the typing and the final pick count as one billed Google session.
  async searchPlaces(q, session, signal) {
    const data = await api(`/api/places?q=${encodeURIComponent(q)}&limit=8${session ? `&session=${encodeURIComponent(session)}` : ''}`, { signal });
    return data.places || [];
  },
  async placeDetails(placeId, session) {
    return api(`/api/place?id=${encodeURIComponent(placeId)}${session ? `&session=${encodeURIComponent(session)}` : ''}`);
  },
  async reverseGeocode(lat, lng) {
    return api(`/api/reverse-geocode?lat=${encodeURIComponent(lat)}&lng=${encodeURIComponent(lng)}`);
  },
  // 7-day weather — Open-Meteo, the same keyless service the planner page
  // uses. It is a forecast; Earth Engine supplies measured past data instead
  // and joins at the Field Health step.
  async getWeather(lat, lng) {
    const base = `latitude=${lat.toFixed(4)}&longitude=${lng.toFixed(4)}`;
    // The crop model wants rain SO FAR THIS SEASON, which only the archive has.
    // Same method as the planner (fetchClimate in app.js) so both pages agree:
    // archive from the season start to 5 days ago, bridged with 5 forecast days.
    const today = new Date();
    const { season, start } = seasonFor(today, lat);
    const archiveEnd = new Date(today);
    archiveEnd.setDate(archiveEnd.getDate() - 5);
    const useArchive = archiveEnd > start;
    const forecastReq = fetch('https://api.open-meteo.com/v1/forecast?' + base
      + '&current=temperature_2m,relative_humidity_2m,apparent_temperature'
      + '&daily=precipitation_sum,temperature_2m_max,temperature_2m_min'
      + '&forecast_days=7&timezone=auto').then(r => {
      if (!r.ok) throw new Error(`Weather failed (${r.status})`);
      return r.json();
    });
    const archiveReq = useArchive
      ? fetch('https://archive-api.open-meteo.com/v1/archive?' + base
        + `&start_date=${isoDate(start)}&end_date=${isoDate(archiveEnd)}&daily=precipitation_sum&timezone=auto`)
        .then(r => (r.ok ? r.json() : null)).catch(() => null)
      : Promise.resolve(null);
    const [data, archive] = await Promise.all([forecastReq, archiveReq]);
    const sum = list => (list || []).reduce((total, n) => total + (n || 0), 0);
    const forecastDaily = data.daily?.precipitation_sum || [];
    return {
      temperature: data.current?.temperature_2m ?? null,
      feelsLike: data.current?.apparent_temperature ?? null,
      humidity: data.current?.relative_humidity_2m ?? null,
      rain7d: Math.round(sum(forecastDaily)),
      seasonRain: Math.round(sum(archive?.daily?.precipitation_sum) + sum(forecastDaily.slice(0, 5))),
      season, seasonStart: isoDate(start),
      fetchedAt: Date.now(),
    };
  },
  // Field health from space — Sentinel-2 NDVI + CHIRPS rain + ERA5, via
  // Earth Engine on our server (Percy's get_current_field_environment).
  // The first call for a place takes 10-30 s; the server keeps it for 24 h.
  async getSatellite(lat, lng) {
    return api('/api/satellite', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ latitude: lat, longitude: lng }),
    });
  },
  // Top 3 crops with an honest confidence level (/api/recommend-crop): the
  // trained model + Percy's scoring + a check that the inputs look like the
  // training data. `explain: true` adds Gemini's plain-words explanation.
  async recommendCrops(body) {
    return api('/api/recommend-crop', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
    });
  },
  // Reads a Soil Health Card photo/PDF — Gemini on our server. The reply is a
  // draft (requires_confirmation): the farmer checks the values, then saves.
  async readSoilCard(file) {
    const body = new FormData();
    body.append('file', file);
    return api('/api/soil-card', { method: 'POST', body });
  },
  // Leaf disease — Katniss's model runs in the browser (fast, free); the
  // server's /api/disease is only the backup when the browser model can't load.
  // Returns the top 3 predictions: {label, crop, condition, healthy, probability}.
  async detectDisease(file) {
    try { return await detectDiseaseInBrowser(file); }
    catch {
      const body = new FormData();
      body.append('photo', file);
      const data = await api('/api/disease', { method: 'POST', body });
      if (!data.predictions?.length) throw new Error('No result from the disease model.');
      return data.predictions;
    }
  },
  // Second opinion: the server checks photo quality, then Gemini says whether
  // the photo supports the diagnosis, how severe it looks, and 3 steps.
  async diseaseAdvice(file, top, language = 'en') {
    const body = new FormData();
    body.append('photo', file);
    body.append('label', top.label);
    body.append('confidence', String(top.probability));
    body.append('language', language);
    return api('/api/disease/advice', { method: 'POST', body });
  },
  // Farm advisor — Gemini through /api/chat (the same route as the chat
  // bubble). `context` holds only real farm data; `history` the last turns.
  async askAdvisor(question, history, context, language = 'English') {
    const data = await api('/api/chat', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, history, context, language }),
    });
    return data.answer;
  },
  // Voice — Google Cloud Speech-to-Text / Text-to-Speech through our server.
  // `lang` is en / hi / mr / te.
  async transcribe(blob, lang) {
    const body = new FormData();
    body.append('audio', blob, blob.type.includes('ogg') ? 'question.ogg' : 'question.webm');
    body.append('language', lang);
    return (await api('/api/voice/transcribe', { method: 'POST', body })).text;
  },
  async speak(text, lang) { // -> an MP3 Blob
    const response = await fetch('/api/voice/speak', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, language: lang }),
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw Object.assign(new Error(data.error || `Could not read aloud (${response.status})`), { status: response.status });
    }
    return response.blob();
  },
};
