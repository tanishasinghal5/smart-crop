import { farmApi } from './services/farmApi.js';

const app = document.querySelector('#app');
// Real text (Google, Gemini, the farmer) goes into innerHTML, so escape it.
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[c]);
// Farm and soil live in this browser until /api/farm exists. Storage can be blocked, so never rely on it.
const load = (key, fallback) => { try { return { ...fallback, ...JSON.parse(localStorage.getItem(key)) }; } catch { return fallback; } };
const store = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} };
const EMPTY_FARM = { name: '', district: '', state: '', lat: null, lng: null, area: '', crop: '' };
const EMPTY_SOIL = { n: '', p: '', k: '', ph: '', source: '' };
const legacyField = (() => { try { return JSON.parse(localStorage.getItem('terraField') || '{}'); } catch { return {}; } })();
const legacyPlace = (() => { try { return JSON.parse(localStorage.getItem('terraPlace') || '{}'); } catch { return {}; } })();
const legacyFarm = {
  ...EMPTY_FARM,
  name: legacyPlace.name || legacyPlace.label || '',
  district: legacyPlace.district || '', state: legacyPlace.state || '',
  lat: legacyPlace.lat ?? legacyPlace.latitude ?? null,
  lng: legacyPlace.lng ?? legacyPlace.longitude ?? null,
};
const initialFarm = load('krishiFarm', legacyFarm);
for (const key of ['name', 'district', 'state', 'lat', 'lng'])
  if (initialFarm[key] === '' || initialFarm[key] == null) initialFarm[key] = legacyFarm[key];
const initialSoil = load('krishiSoil', EMPTY_SOIL);
for (const [key, oldKey] of [['n', 'nitrogen'], ['p', 'phosphorus'], ['k', 'potassium'], ['ph', 'ph']])
  if (initialSoil[key] === '' || initialSoil[key] == null) initialSoil[key] = legacyField[oldKey] ?? legacyField[oldKey.toUpperCase()] ?? '';
if (!initialSoil.source && ['n', 'p', 'k', 'ph'].some(key => initialSoil[key] !== '')) initialSoil.source = 'from your saved field plan';
const state = {
  page: 'dashboard', pageStack: [], loading: false, toast: '', user: null, weather: null, crops: null, satellite: null,
  farm: initialFarm,
  soil: initialSoil, selectedCrop: 0,
  diseaseBusy: false, diseaseAdvice: null, diseaseError: '',
  soilTab: 'manual', soilDraft: null, soilBusy: false, soilNotes: [], soilError: '', soilFileName: '',
  lang: (() => { try { return localStorage.getItem('krishiLang') || 'en'; } catch { return 'en'; } })(),
  recording: false, speaking: null,
  disease: null, uploadName: '', messages: [] // the welcome line is drawn by advisor(), not stored here
};
if (['n', 'p', 'k', 'ph'].some(key => state.soil[key] !== '')) store('krishiSoil', state.soil);
if (state.farm.lat != null && state.farm.lng != null) store('krishiFarm', state.farm);
const hasFarm = () => state.farm.lat != null && state.farm.lng != null;
const farmName = () => hasFarm() ? (state.farm.name || `${state.farm.lat.toFixed(3)}, ${state.farm.lng.toFixed(3)}`) : 'No farm set yet';
const farmLine = () => hasFarm() ? farmName() + (state.farm.area ? ` · ${state.farm.area} acres` : '') : 'No farm set yet';
const userName = () => state.user?.username || 'Guest';
const initials = () => userName().split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
function seasonNow(d = new Date()) { const m = d.getMonth() + 1, y = d.getFullYear(); if (m >= 6 && m <= 10) return `Kharif ${y}`; if (m >= 11) return `Rabi ${y}-${String(y + 1).slice(2)}`; if (m <= 3) return `Rabi ${y - 1}-${String(y).slice(2)}`; return `Zaid ${y}`; }
function greeting() { const h = new Date().getHours(); const part = h < 12 ? 'MORNING' : h < 17 ? 'AFTERNOON' : 'EVENING'; return state.user ? `GOOD ${part}, ${esc(userName().split(/\s+/)[0].toUpperCase())}` : `GOOD ${part}`; }
const needFarm = what => `<section class="panel empty-result"><div class="empty-art">⌖</div><h2>Set your farm location first</h2><p>${what}</p><button class="primary" data-page="farm">Set farm location →</button></section>`;

// --- Weather: Open-Meteo forecast for the farm, saved in the browser for an
// hour per location (rounded to ~110 m) so page hops don't refetch it.
const WX_TTL_MS = 60 * 60 * 1000;
const wx = () => (state.weather && typeof state.weather === 'object') ? state.weather : null;
const deg = v => v == null ? '—' : `${Math.round(v)}°`;
async function loadWeather(force = false) {
  if (!hasFarm()) { state.weather = null; return; }
  const key = `krishiWx:${state.farm.lat.toFixed(3)},${state.farm.lng.toFixed(3)}`;
  if (!force) {
    const saved = load(key, null);
    // seasonRain check: copies saved before crop advice existed lack it.
    if (saved?.fetchedAt && saved.seasonRain != null && Date.now() - saved.fetchedAt < WX_TTL_MS) { state.weather = saved; render(); loadCrops(); return; }
  }
  state.weather = 'loading'; render();
  try { state.weather = await farmApi.getWeather(state.farm.lat, state.farm.lng); store(key, state.weather); }
  catch { state.weather = 'error'; }
  render();
  loadCrops();
}

// --- Crop advice: the trained model (/api/recommend) on 7 real numbers —
// soil from Soil Health, temperature/humidity/season rain from the weather.
const SOIL_KEYS = ['n', 'p', 'k', 'ph'];
const CROP_NAMES = { kidneybeans: 'Kidney beans', pigeonpeas: 'Pigeon pea', mungbean: 'Mung bean', mothbeans: 'Moth bean', blackgram: 'Black gram', chickpea: 'Chickpea', muskmelon: 'Muskmelon', watermelon: 'Watermelon' };
const cropName = c => CROP_NAMES[c] || c.charAt(0).toUpperCase() + c.slice(1);
const CROP_COLORS = ['#4f8f52', '#c28a31', '#d9b23b'];
const soilMissing = () => SOIL_KEYS.filter(k => state.soil[k] === '' || state.soil[k] == null || !Number.isFinite(+state.soil[k]));
function cropInputs() {
  const w = wx();
  if (!hasFarm() || soilMissing().length || !w || w.temperature == null || w.humidity == null) return null;
  return { N: +state.soil.n, P: +state.soil.p, K: +state.soil.k, ph: +state.soil.ph,
    temperature: w.temperature, humidity: w.humidity, rainfall: w.seasonRain };
}
let cropsFor = ''; // the inputs the current advice was made from
const satSettled = () => state.satellite && state.satellite !== 'loading';
function cropRequest(inputs, explain = false) {
  return { ...inputs, latitude: state.farm.lat, longitude: state.farm.lng,
    state: state.farm.state || undefined, district: state.farm.district || undefined, season: wx()?.season,
    soil_source: /card/.test(state.soil.source || '') ? 'card' : 'typed', explain, language: 'en' };
}
async function loadCrops() {
  const inputs = cropInputs();
  if (!inputs) { state.crops = null; cropsFor = ''; return; }
  // Wait for the satellite reading: the server then uses it straight from its
  // cache (no second 20 s Earth Engine call) and it counts toward confidence.
  if (!satSettled()) return; // loadSatellite() calls loadCrops() when it finishes
  const key = JSON.stringify(inputs);
  if (key === cropsFor && state.crops) return; // same numbers — same answer
  cropsFor = key;
  state.crops = 'loading'; render();
  try {
    const data = await farmApi.recommendCrops(cropRequest(inputs));
    if (cropsFor !== key) return; // a newer request replaced this one
    state.crops = { list: data.recommendations || [], inputs, confidence: data.confidence_level,
      reasons: data.confidence_reasons || [], action: data.action_required, explanation: null };
    state.selectedCrop = 0;
  } catch (err) { if (cropsFor === key) state.crops = { error: err.message }; }
  render();
}
// Gemini's plain-words explanation — only on request, to save free calls.
async function explainCrops() {
  const c = state.crops;
  if (!c?.list || c.explanation === 'loading') return;
  c.explanation = 'loading'; render();
  try {
    const data = await farmApi.recommendCrops(cropRequest(c.inputs, true));
    c.explanation = data.explanation ? { text: data.explanation }
      : { error: data.explanation_error?.status === 429 ? 'Gemini has reached today’s free limit — the ranking above still stands.' : (data.explanation_error?.error || 'No explanation right now.') };
  } catch (err) { c.explanation = { error: err.message }; }
  render();
}
const cropPct = c => Math.max(1, Math.round((c.score ?? c.probability) * 100));
// A metric card that is honest about loading and failure — never a fake number.
function wxMetric(icon, label, value, detail, tone) {
  if (!hasFarm()) return metric(icon, label, '—', 'Set your farm location', tone);
  if (!state.weather || state.weather === 'loading') return metric(icon, label, '…', 'Loading weather…', tone);
  if (state.weather === 'error') return metric(icon, label, '—', 'Weather unavailable right now', tone);
  return metric(icon, label, value(state.weather), detail(state.weather), tone);
}
function soilMetric() {
  const added = ['n', 'p', 'k', 'ph'].filter(k => state.soil[k] !== '' && state.soil[k] != null).length;
  const hasPh = state.soil.ph !== '' && state.soil.ph != null;
  return metric('◈', 'SOIL HEALTH', added ? `${added}/4 values` : 'Not added',
    added ? (hasPh ? `pH ${esc(state.soil.ph)} · ${esc(state.soil.source || 'typed by you')}` : 'pH not added yet') : 'Enter or upload values', 'gold');
}
function alertsPanel() {
  const w = wx(), items = [];
  if (w) items.push(w.rain7d >= 10
    ? `<div class="alert"><i>☔</i><div><strong>Rain expected this week</strong><p>About ${w.rain7d} mm over the next 7 days — plan irrigation and spraying around it.</p></div></div>`
    : `<div class="alert"><i>☼</i><div><strong>Dry week ahead</strong><p>Only about ${w.rain7d} mm of rain expected in the next 7 days — plan irrigation.</p></div></div>`);
  return `<section class="panel alerts"><div class="panel-top"><div><p class="eyebrow">ATTENTION</p><h2>Weather watch</h2></div><span class="chip">${items.length} new</span></div>${items.join('') || '<p class="setup-note">Weather alerts appear here once your farm location and weather are loaded.</p>'}</section>`;
}

const icons = { dashboard:'▦', farm:'⌖', soil:'◈', crops:'✦', health:'⌁', disease:'⊕', advisor:'◌', bell:'◔', arrow:'→', mic:'◉' };
const nav = [['dashboard','Dashboard'],['farm','My Farm'],['soil','Soil Health'],['crops','Crop Advice'],['health','Field Health'],['disease','Disease Scan'],['advisor','AI Advisor']];

let farmMap = null;
let farmMarker = null;
function render() {
  if (farmMap) { farmMap.remove(); farmMap = null; farmMarker = null; }
  app.innerHTML = `<aside class="sidebar"><a class="brand" data-page="dashboard"><span class="brand-mark">✦</span><span>terra<span>byte</span></span></a><div class="farm-chip"><span class="pin">⌖</span><div><small>YOUR FARM</small><strong>${esc(farmName())}</strong></div></div><nav>${nav.map(([id,label])=>`<button class="nav-item ${state.page===id?'active':''}" data-page="${id}"><i>${icons[id]}</i>${label}</button>`).join('')}</nav><div class="sidebar-bottom"><a class="nav-item" href="index.html" style="text-decoration:none"><i>←</i>Back to home</a><button class="help">? Help centre</button><div class="user"><div class="avatar">${esc(initials())}</div><div><strong>${esc(userName())}</strong><small>${state.user ? 'Signed in' : '<a href="login.html" style="color:#d8e987">LOG IN</a>'}</small></div><span>⌄</span></div></div></aside><main><header><button class="mobile-menu" id="menu">☰</button><div class="page-nav">${state.page !== 'dashboard' ? '<button class="back-button" id="page-back">← Back</button>' : ''}<div class="crumb"><span>${nav.find(n=>n[0]===state.page)?.[1]}</span><small>${esc(farmLine())}</small></div></div><div class="header-actions"><button class="icon-button">${icons.bell}<b></b></button><a class="profile" href="${state.user ? 'profile.html' : 'login.html'}" title="${state.user ? esc(userName()) : 'Log in'}" style="text-decoration:none">${esc(initials())}</a></div></header><section class="content">${page()}</section></main><div class="toast ${state.toast?'show':''}">${esc(state.toast)}</div>`;
  bind();
}

function navigateTo(page) {
  if (page === state.page) return;
  state.pageStack.push(state.page);
  state.page = page;
  render();
}
function navigateBack() {
  state.page = state.pageStack.pop() || 'dashboard';
  render();
}

function page(){ return ({dashboard, farm, soil, crops, health, disease, advisor})[state.page](); }
const metric = (icon,label,value,detail,tone='') => `<article class="metric ${tone}"><div class="metric-icon">${icon}</div><small>${label}</small><strong>${value}</strong><span>${detail}</span></article>`;
const action = (icon,title,text,target) => `<button class="quick-action" data-page="${target}"><i>${icon}</i><div><strong>${title}</strong><span>${text}</span></div><b>→</b></button>`;

// --- Field health from space (Sentinel-2 NDVI via Earth Engine). Kept in the
// browser for 12 h per location; the server also keeps it for 24 h.
const SAT_TTL_MS = 12 * 60 * 60 * 1000;
const sat = () => (state.satellite && typeof state.satellite === 'object' && !state.satellite.error) ? state.satellite : null;
const NDVI_TEXT = {
  poor: ['Poor', 'Very little green cover — bare soil, just sown, or crops under stress.'],
  moderate: ['Moderate', 'Some green cover — young crops, or patchy growth.'],
  good: ['Good', 'Healthy green cover.'],
  very_good: ['Very good', 'Dense, healthy green cover.'],
};
async function loadSatellite(force = false) {
  if (!hasFarm()) { state.satellite = null; return; }
  const key = `krishiSat:${state.farm.lat.toFixed(3)},${state.farm.lng.toFixed(3)}`;
  if (!force) {
    const saved = load(key, null);
    if (saved?.savedAt && Date.now() - saved.savedAt < SAT_TTL_MS) { state.satellite = saved; render(); loadCrops(); return; }
  }
  state.satellite = 'loading'; render();
  try {
    state.satellite = { ...(await farmApi.getSatellite(state.farm.lat, state.farm.lng)), savedAt: Date.now() };
    if (state.satellite.meta?.source !== 'cache_stale') store(key, state.satellite); // never keep an old reading as if new
  }
  catch (err) { state.satellite = { error: err.message }; }
  render();
  loadCrops(); // crop advice waits for the satellite reading
}
// When Earth Engine is down the server sends the last real reading, marked
// cache_stale — say so, with its date, instead of passing it off as today's.
const staleNote = s => s?.meta?.source === 'cache_stale' ? `<p class="soil-warn">Saved reading from ${esc((s.meta.saved_at || s.meta.generated_at || '').slice(0, 10))} — live satellite data is unavailable right now.</p>` : '';
// The NDVI panel on the Dashboard and Field Health pages — every state honest.
function ndviPanel(){
  const box=(art,title,text,btn='')=>`<div class="empty-result ndvi-soon"><div class="empty-art">${art}</div><h2>${title}</h2><p>${text}</p>${btn}</div>`;
  if(!hasFarm()) return box('◒','Set your farm location','Crop health is read from satellite photos of your farm.','<button class="primary" data-page="farm">Set farm location →</button>');
  if(!state.satellite||state.satellite==='loading') return box('◒','Reading satellite photos…','Sentinel-2 photos of your farm, through Google Earth Engine. The first time takes up to 30 seconds.');
  if(state.satellite.error) return box('!','Satellite data unavailable',esc(state.satellite.error),'<button class="primary" id="retry-sat">Try again</button>');
  const s=sat();
  if(s.ndvi==null) return box('☁','No clear satellite photo this month','Clouds covered your farm in every Sentinel-2 photo from the last 30 days. Please check again in a few days.');
  const [label,meaning]=NDVI_TEXT[s.ndvi_status]||['—',''];
  const pct=Math.max(0,Math.min(100,Math.round(s.ndvi*100)));
  return `<div class="health-main"><div class="gauge"><svg viewBox="0 0 120 70"><path d="M10 60 A50 50 0 0 1 110 60"/><path class="gauge-fill" d="M10 60 A50 50 0 0 1 110 60" pathLength="100" style="stroke-dasharray:${pct} 100"/></svg><strong>${s.ndvi.toFixed(2)}</strong><span>NDVI score</span></div><div><strong class="status ${s.ndvi_status==='poor'?'':'healthy-dot'}">${label} green cover</strong><p>${meaning}</p><span class="chip">${s.observation_count} clear photo${s.observation_count===1?'':'s'} · last ${s.window_days} days${s.quality_flag==='limited_observations'?' · limited data':''}</span>${staleNote(s)}</div></div>`;
}
function dashboard(){ return `<div class="intro"><div><p class="eyebrow">${greeting()}</p>${hasFarm() ? '<h1>Your farm <em>at a glance.</em></h1><p class="lede">Here’s a clear view of what matters for your field today.</p>' : '<h1>Let’s set up <em>your farm.</em></h1><p class="lede">Pick your farm location to get weather, crop and field advice for it.</p>'}</div><button class="primary" data-page="farm">${hasFarm() ? 'Manage farm' : 'Set farm location'} <span>→</span></button></div><div class="metrics">${satMetric()}${wxMetric('☔','RAINFALL FORECAST',w=>`${w.rain7d} mm`,()=>'Next 7 days · Open-Meteo','blue')}${soilMetric()}${wxMetric('☼','TEMPERATURE',w=>deg(w.temperature),w=>`Feels like ${deg(w.feelsLike)} · humidity ${w.humidity==null?'—':Math.round(w.humidity)+'%'}`,'orange')}</div><div class="grid dashboard-grid"><section class="panel health-hero"><div class="panel-top"><div><p class="eyebrow">SATELLITE INSIGHT</p><h2>Vegetation health</h2></div><button class="text-button" data-page="health">View field health →</button></div>${ndviPanel()}</section><section class="panel recommendations"><div class="panel-top"><div><p class="eyebrow">CROP PLANNER</p><h2>Top recommendations</h2></div><button class="text-button" data-page="crops">See all →</button></div>${cropGate()?`<p class="setup-note">${!hasFarm()?'Set your farm location to get crop advice.':soilMissing().length?'Add your soil values to get crop advice.':state.crops?.error?'Crop advice is unavailable right now.':'Working out your crops…'}</p>`:cropRows()}</section></div><div class="bottom-grid"><section><div class="section-heading"><div><p class="eyebrow">KEEP MOVING</p><h2>Quick actions</h2></div></div><div class="quick-grid">${action('⌖','Set farm location','Pin your field on a map','farm')}${action('◈','Add soil report','Enter or upload values','soil')}${action('⊕','Scan a crop leaf','Check for disease','disease')}${action('◌','Ask AI advisor','Get field-specific help','advisor')}</div></section>${alertsPanel()}</div>`; }

function farm(){return `<div class="intro compact"><div><p class="eyebrow">FIELD SETUP</p><h1>Where is your <em>farm?</em></h1><p class="lede">Search for your village, then click or drag the pin to the exact field location.</p></div></div><div class="grid farm-grid"><section class="panel map-card"><div class="map-toolbar"><div class="place-box"><input id="place-search" placeholder="Search your village, town or district" value="${esc(state.farm.name)}" autocomplete="off"/><ul id="place-results" class="place-results" hidden></ul></div><button class="primary small" id="search-place">Search</button></div><p class="place-hint" id="place-status" hidden></p><div id="farm-map" class="farm-map" role="application" aria-label="Map to choose your farm location"></div><div class="map-actions"><button class="secondary" id="locate">⌖ Use current location</button><button class="text-button" id="map-center">◎ Center on farm</button></div></section><section class="panel location-details"><p class="eyebrow">CURRENT FIELD</p><h2>${esc(farmName())}</h2>${hasFarm() ? '<span class="chip positive">● Location selected</span>' : '<span class="chip">No location yet</span>'}<div class="data-list"><div><span>Latitude</span><strong>${hasFarm() ? state.farm.lat.toFixed(4) + '°' : '—'}</strong></div><div><span>Longitude</span><strong>${hasFarm() ? state.farm.lng.toFixed(4) + '°' : '—'}</strong></div><div><span>District</span><strong>${esc([state.farm.district, state.farm.state].filter(Boolean).join(', ') || '—')}</strong></div><div><span>Season</span><strong>${seasonNow()}</strong></div></div><label>Farm area (acres)<input id="area-input" type="number" min="0" step="0.1" value="${esc(state.farm.area)}" placeholder="Not added"/></label><label>Current crop / plan<input id="crop-input" value="${esc(state.farm.crop)}" placeholder="Not added"/></label><button class="primary full" id="save-farm">Save field context →</button><p class="setup-note">Satellite readings cover an area around this pin. Drag the pin to place it on your field.</p>${accountNote()}</section></div>`}
function soil(){const draft=state.soilDraft||{};const val=k=>draft[k]!=null&&draft[k]!==''?draft[k]:state.soil[k];return `<div class="intro compact"><div><p class="eyebrow">SOIL PROFILE</p><h1>Know your soil, <em>grow with confidence.</em></h1><p class="lede">Enter a recent report or upload a soil health card for review.</p></div></div><div class="two-tabs"><button class="tab ${state.soilTab==='manual'?'active':''}" id="manual-tab">Manual input</button><button class="tab ${state.soilTab==='upload'?'active':''}" id="upload-tab">Upload soil card</button></div><div class="grid soil-grid"><section class="panel soil-form">${state.soilTab==='upload'?`<div class="form-head"><h2>Read a Soil Health Card</h2><span class="chip">JPG · PNG · WebP · PDF</span></div><label class="dropzone ${state.soilFileName?'has-file':''}" for="soil-file"><input id="soil-file" type="file" accept="image/jpeg,image/png,image/webp,application/pdf" hidden/><span class="upload-icon">◈</span><strong>${esc(state.soilFileName)||'Choose a photo or PDF of the card'}</strong><p>${state.soilFileName?'Ready to read':'A clear photo of the values table works best'}</p><span class="secondary small">Choose file</span></label><button class="primary" id="read-card" ${state.soilFileName&&!state.soilBusy?'':'disabled'}>${state.soilBusy?'Reading card…':'Read card →'}</button>${state.soilError?`<p class="soil-warn">${esc(state.soilError)}</p>`:''}<p class="setup-note">Gemini reads the card on our server. You always check the values before they are saved.</p>`:`<div class="form-head"><h2>Soil nutrient values</h2><span class="chip">kg/ha except pH</span></div><div class="field-grid">${[['n','Nitrogen (N)'],['p','Phosphorus (P)'],['k','Potassium (K)'],['ph','pH level']].map(([k,l])=>`<label>${l}<input id="soil-${k}" type="number" min="0" step="0.1" value="${esc(val(k))}" placeholder="Not added"/></label>`).join('')}</div>${state.soilNotes.length?`<div class="soil-notes"><strong>Read from your card — please check:</strong><ul>${state.soilNotes.map(w=>`<li>${esc(w)}</li>`).join('')}</ul></div>`:''}<button class="primary" id="save-soil">Save soil values →</button>`}</section><section class="soil-side">${soilSide()}<article class="note-card"><i>✦</i><div><strong>A report is best</strong><p>Use values from a lab report taken within the last 12 months for more reliable advice.</p></div></article></section></div>`}
function soilSide(){const labels={n:'Nitrogen (N)',p:'Phosphorus (P)',k:'Potassium (K)',ph:'pH'};const added=['n','p','k','ph'].filter(k=>state.soil[k]!==''&&state.soil[k]!=null).length;return `<article class="panel soil-score"><p class="eyebrow">SAVED SOIL VALUES</p><div class="data-list">${['n','p','k','ph'].map(k=>`<div><span>${labels[k]}</span><strong>${state.soil[k]!==''&&state.soil[k]!=null?esc(state.soil[k]):'—'}</strong></div>`).join('')}</div><p class="setup-note">${added?`${added} of 4 values saved · ${esc(state.soil.source||'typed by you')}. These feed your crop advice.`:'No values saved yet. Type them in or read your Soil Health Card.'}</p>${accountNote()}</article>`}
// Why there is no crop advice yet — or null when there is some to show.
function cropGate(){
  const box=(art,title,text,btn='')=>`<section class="panel empty-result"><div class="empty-art">${art}</div><h2>${title}</h2><p>${text}</p>${btn}</section>`;
  if(!hasFarm()) return needFarm('Crop advice needs your farm’s location for its weather and season.');
  const missing=soilMissing();
  if(missing.length) return box('◈','Add your soil values first',`The crop model needs N, P, K and pH. Missing: ${missing.map(k=>k==='ph'?'pH':k.toUpperCase()).join(', ')}.`,'<button class="primary" data-page="soil">Add soil values →</button>');
  if(state.weather==='error') return box('☁','Weather unavailable','Crop advice needs this season’s rain and today’s temperature, and the weather service could not be reached.','<button class="primary" id="retry-weather">Try again</button>');
  if(!wx()||state.weather==='loading'||state.crops==='loading'||!state.crops) return box('✦','Working out your crops…',satSettled()?'Using your soil values and this season’s weather.':'Reading satellite photos of your farm first — up to 30 seconds the first time.');
  if(state.crops.error) return box('!','Crop advice unavailable',esc(state.crops.error),'<button class="primary" id="retry-crops">Try again</button>');
  return null;
}
// How sure the advice is, and why — from /api/recommend-crop. A low level
// leads with what to do about it (usually a soil test).
function confidenceBox(){const c=state.crops;if(!c?.confidence) return '';const word={high:'High',medium:'Medium',low:'Low'}[c.confidence]||c.confidence;const act={soil_test:'Get a soil test at your nearest soil testing lab or Krishi Vigyan Kendra, then enter the values from the card — the advice will be more reliable.',expert_review:'Please confirm this advice with your local agriculture officer or Krishi Vigyan Kendra before sowing.'}[c.action];return `<section class="panel confidence-box ${c.confidence}"><div><p class="eyebrow">HOW SURE IS THIS ADVICE?</p><h2>${word} confidence</h2></div>${act?`<p class="confidence-action">⚠ ${act}</p>`:''}<ul>${c.reasons.map(r=>`<li>${esc(r)}</li>`).join('')}</ul></section>`;}
function explanationBox(){const e=state.crops?.explanation;if(e&&e.text) return `<div class="action-box"><span>WHY THIS RANKING · GEMINI</span><p>${esc(e.text)}</p></div>`;if(e==='loading') return '<div class="action-box"><span>WHY THIS RANKING · GEMINI</span><p>Asking Gemini…</p></div>';return `${e?.error?`<p class="soil-warn">${esc(e.error)}</p>`:''}<button class="secondary full" id="explain-crops">Explain this ranking in simple words (Gemini)</button>`;}
function cropRows(){return state.crops.list.map((c,i)=>`<button class="rec-row" data-page="crops" data-crop="${i}"><span class="rank">0${i+1}</span><div><strong>${esc(cropName(c.crop))}</strong><small>Model match for your soil and season</small></div><b>${cropPct(c)}%</b><span class="score-ring" style="--score:${cropPct(c)};--color:${CROP_COLORS[i]}"></span></button>`).join('')}
function crops(){ const gate=cropGate(); const head=`<div class="intro compact split"><div><p class="eyebrow">CROP PLANNER · ${seasonNow().toUpperCase()}</p><h1>What should you <em>grow?</em></h1><p class="lede">Ranked by our crop model from your soil values and this season’s weather.</p></div>${hasFarm()?`<span class="context-pill">◈ Soil: ${esc(state.soil.source||'typed by you')}&nbsp;&nbsp; · &nbsp;&nbsp;⌖ ${esc(farmName())}</span>`:''}</div>`; if(gate) return head+gate; const list=state.crops.list, i=Math.min(state.selectedCrop,list.length-1), c=list[i], inp=state.crops.inputs, w=wx(); return `${head}${confidenceBox()}<div class="crop-layout"><section class="crop-list">${list.map((x,j)=>`<button class="crop-option ${j===i?'selected':''}" data-crop="${j}"><span class="crop-number">0${j+1}</span><div><strong>${esc(cropName(x.crop))}</strong><p>${j===0?'Closest match to your field':'Also a good match'}</p></div><b>${cropPct(x)}%<small>model match</small></b><i>→</i></button>`).join('')}</section><section class="panel crop-detail"><div class="detail-hero" style="--accent:${CROP_COLORS[i]}"><div><p>${i===0?'BEST MATCH':`OPTION ${i+1}`}</p><h2>${esc(cropName(c.crop))}</h2><span>${cropPct(c)}% model match</span></div><div class="detail-score">${cropPct(c)}<small>%</small></div></div><div class="detail-body"><h3>What this is based on</h3><div class="data-list"><div><span>Nitrogen (N)</span><strong>${inp.N} kg/ha</strong></div><div><span>Phosphorus (P)</span><strong>${inp.P} kg/ha</strong></div><div><span>Potassium (K)</span><strong>${inp.K} kg/ha</strong></div><div><span>pH</span><strong>${inp.ph}</strong></div><div><span>Temperature now</span><strong>${deg(inp.temperature)}C</strong></div><div><span>Humidity now</span><strong>${Math.round(inp.humidity)}%</strong></div><div><span>Rain this season</span><strong>${inp.rainfall} mm</strong></div></div>${explanationBox()}<div class="field-context"><span>FIELD CONTEXT</span><p>${esc(farmName())} · ${esc(w?.season?w.season.charAt(0).toUpperCase()+w.season.slice(1):seasonNow())} season since ${esc(w?.seasonStart||'—')} · weather: Open-Meteo</p></div><button class="primary full" data-page="advisor">Ask advisor about ${esc(cropName(c.crop))} →</button><p class="backend-note">The % is how closely your numbers match fields where this crop grew in the model’s training data — not a yield promise. For growing tips, ask the advisor.</p></div></section></div>`}
function health(){if(!hasFarm()) return needFarm('Field health is read from satellite images of your farm, so we need to know where it is.');return `<div class="intro compact split"><div><p class="eyebrow">SATELLITE FIELD HEALTH</p><h1>How is your <em>field doing?</em></h1><p class="lede">Satellite photos of your farm through Google Earth Engine, plus this week’s weather.</p></div><button class="secondary" id="refresh-health">↻ Refresh</button></div><div class="metrics health-metrics">${satMetric('CURRENT NDVI')}${wxMetric('☔','RAINFALL',w=>`${w.rain7d} mm`,()=>'Next 7 days · Open-Meteo','blue')}${wxMetric('☼','TEMPERATURE',w=>deg(w.temperature),w=>`Humidity ${w.humidity==null?'—':Math.round(w.humidity)+'%'}`,'orange')}</div><section class="panel full-chart"><div class="panel-top"><div><p class="eyebrow">VEGETATION INDEX · SENTINEL-2</p><h2>Crop greenness (NDVI)</h2></div></div>${ndviPanel()}</section><div class="bottom-grid">${satDetails()}${alertsPanel()}</div>`}
function satMetric(label='FIELD HEALTH'){if(!hasFarm()) return metric('◒',label,'—','Set your farm location','green');if(!state.satellite||state.satellite==='loading') return metric('◒',label,'…','Reading satellite photos…','green');if(state.satellite.error) return metric('◒',label,'—','Satellite data unavailable','green');const s=sat();if(s.ndvi==null) return metric('◒',label,'—','No clear photo this month','green');return metric('◒',label,(NDVI_TEXT[s.ndvi_status]||['—'])[0],`NDVI ${s.ndvi.toFixed(2)} · Sentinel-2`,'green');}
// Earth Engine's measured past data next to the forecast: rain that fell,
// average temperature and soil moisture over the last 30 days.
function satDetails(){const s=sat();if(!s) return '';const v=(x,unit)=>x==null?'—':`${x}${unit}`;return `<section class="panel insight-card"><p class="eyebrow">LAST 30 DAYS · EARTH ENGINE</p><h2>Measured on your farm</h2><div class="data-list"><div><span>Rain that fell (CHIRPS)</span><strong>${v(s.rainfall_30d,' mm')}</strong></div><div><span>Average temperature (ERA5)</span><strong>${v(s.temperature,'°C')}</strong></div><div><span>Topsoil moisture (ERA5)</span><strong>${s.soil_moisture==null?'—':Math.round(s.soil_moisture*100)+'%'}</strong></div><div><span>Area checked</span><strong>${s.buffer_m/1000} km around your farm</strong></div></div><p class="setup-note">${s.meta?.source==='cache_stale'?'Old saved reading (live data unavailable)':s.meta?.source==='cache'?'Saved reading':'Fresh reading'} · ${esc((s.meta?.generated_at||'').slice(0,10))}. The area includes roads and houses near your farm, which lower the score.</p></section>`;}
function disease(){return `<div class="intro compact"><div><p class="eyebrow">DISEASE DETECTION</p><h1>What’s happening to <em>your crop?</em></h1><p class="lede">Upload a clear leaf photo and we’ll check it for visible disease signs.</p></div></div><div class="disease-layout"><section class="panel upload-card"><label class="dropzone ${state.uploadName?'has-file':''}" for="leaf-file"><input id="leaf-file" type="file" accept="image/*" capture="environment" hidden/>${leafPreviewUrl?`<img class="leaf-preview" src="${leafPreviewUrl}" alt="Your leaf photo"/>`:'<span class="upload-icon">⌁</span>'}<strong>${esc(state.uploadName) || 'Drop a leaf photo here'}</strong><p>${state.uploadName ? 'Ready to analyse — tap to change' : 'or tap to choose from your phone or computer'}</p><span class="secondary small">Choose photo</span></label><div class="photo-tips"><strong>For a better result</strong><span>• Use natural light</span><span>• Keep the leaf in focus</span><span>• One leaf, filling the photo</span></div><button class="primary full" id="analyse" ${state.uploadName&&!state.diseaseBusy?'':'disabled'}>${state.diseaseBusy?'Analysing leaf…':'Analyse photo →'}</button></section>${state.diseaseError?`<section class="empty-result"><div class="empty-art">!</div><h2>Could not check this photo</h2><p>${esc(state.diseaseError)}</p></section>`:state.disease?diseaseResult(state.disease):`<section class="empty-result"><div class="empty-art">⌁</div><h2>Your result will appear here</h2><p>We’ll clearly tell you whether a condition looks likely, possible, or needs a closer look.</p></section>`}</div>`}
// Confidence levels match the server's CONF_THRESHOLDS (0.80 / 0.60).
function diseaseLevel(p){return p>=0.8?{cls:'',text:'LIKELY'}:p>=0.6?{cls:'possible',text:'POSSIBLE — CHECK THE OTHER MATCHES'}:{cls:'unsure',text:'NOT SURE — PLEASE RETAKE THE PHOTO'};}
function diseaseResult(predictions){const top=predictions[0],pct=Math.round(top.probability*100),lvl=diseaseLevel(top.probability);const name=top.healthy?`${top.crop} — looks healthy`:`${top.crop} ${top.condition}`;return `<section class="panel disease-result"><p class="eyebrow">ANALYSIS RESULT</p><span class="confidence ${lvl.cls}">${lvl.text}</span><h2>${esc(name)}</h2><div class="confidence-row"><strong>${pct}%</strong><span>model confidence</span><div class="progress"><i style="width:${pct}%"></i></div></div>${predictions.length>1?`<h3>Other possible matches</h3><ul>${predictions.slice(1).map(p=>`<li>${esc(p.healthy?`${p.crop} — healthy`:`${p.crop} ${p.condition}`)} · ${Math.round(p.probability*100)}%</li>`).join('')}</ul>`:''}${adviceBox(top)}<p class="diagnosis-note">This is a decision-support result, not a definitive diagnosis. If symptoms spread, consult a local agriculture officer.</p></section>`}
function adviceBox(top){const a=state.diseaseAdvice;const box=(body)=>`<div class="action-box"><span>SECOND OPINION · GEMINI</span>${body}</div>`;if(top.probability<0.6) return box('<p>The model is not sure about this photo, so no advice is given. Photograph one affected leaf in daylight, filling the frame.</p>');if(a==='loading') return box('<p>Checking the photo and getting advice…</p>');if(!a) return '';if(a.error) return box(`<p>⚠ ${esc(a.error)}</p>`);if(a.skipped) return '';const severity={none:'None',low:'Low',moderate:'Moderate',severe:'Severe'}[a.severity];const agree=a.gemini_agrees==='no'?`<p>⚠ Gemini does not think this photo shows ${esc(top.condition)}. Check the other matches, or ask your local agriculture office.</p>`:a.gemini_agrees==='unsure'?'<p>⚠ Gemini could not confirm this from the photo.</p>':'';return box(`${agree}${severity?`<p><strong>Severity:</strong> ${severity}</p>`:''}${a.summary?`<p>${esc(a.summary)}</p>`:''}${a.steps?.length?`<p><strong>What to do:</strong></p><ul>${a.steps.map(s=>`<li>${esc(s)}</li>`).join('')}</ul>`:''}`);}
function advisor(){const w=wx(),top=state.crops?.list?.[0];const chips=[`⌖ ${esc(hasFarm()?farmName():'No farm set')}`,`◈ pH ${esc(state.soil.ph||'—')}`,w?`☔ ${w.rain7d} mm this week`:''].filter(Boolean);const suggestions=['Should I irrigate this week?',top?`Is ${cropName(top.crop)} a good choice now?`:'Which crop suits my field this season?','How can I improve my soil?'];const first=state.user?`, ${userName().split(/\s+/)[0]}`:'';const welcome=`Namaste${first}! Ask me anything about your farm — crops, soil, water, pests or weather.${hasFarm()?'':' Set your farm location for advice about your own field.'}`;const bubble=(m,i)=>`<div class="message ${m.role}">${m.role==='ai'?'<div class="mini-avatar">✦</div>':''}<div class="${m.error?'chat-error':''}">${m.role==='ai'&&!m.error?mdLite(m.text):esc(m.text)}${i!=null&&m.role==='ai'&&!m.error?`<button class="speak" data-speak="${i}" title="${state.speaking===i?'Stop':'Read aloud'}">${state.speaking===i?'■ Stop':'🔊 Listen'}</button>`:''}</div></div>`;return `<div class="advisor-head"><div><p class="eyebrow">YOUR FIELD-SMART ASSISTANT</p><h1>Ask anything about <em>your farm.</em></h1><p class="lede">Answers from Gemini, using your saved farm, soil, weather and crop data.</p></div><div class="advisor-context">${chips.map(c=>`<span>${c}</span>`).join('')}</div></div><section class="chat panel"><div class="chat-top"><div class="advisor-avatar">✦</div><div><strong>TerraByte Advisor</strong><span><i></i> ${hasFarm()?'Using your farm data':'No farm set — general advice'}</span></div><select id="advisor-lang" class="lang-select" aria-label="Answer language">${Object.entries(LANGS).map(([k,[label]])=>`<option value="${k}" ${state.lang===k?'selected':''}>${label}</option>`).join('')}</select><button class="text-button" id="clear-chat">Clear chat</button></div><div class="messages">${bubble({role:'ai',text:welcome})}${state.messages.map((m,i)=>bubble(m,i)).join('')}${state.loading?'<div class="message ai"><div class="mini-avatar">✦</div><div class="typing"><i></i><i></i><i></i></div></div>':''}</div><div class="suggestions"><span>Try asking</span>${suggestions.map(q=>`<button class="suggestion" data-question="${esc(q)}">${esc(q)}</button>`).join('')}</div><form class="chat-input" id="chat-form"><button type="button" class="mic ${state.recording?'recording':''}" id="mic" title="${state.recording?'Stop and send':'Speak your question'}">${state.recording?'■':'🎤'}</button><input id="chat-text" placeholder="${state.recording?'Listening… tap ■ when you finish':'Ask about your field… or tap 🎤 to speak'}" autocomplete="off"/><button class="send" aria-label="Send">↑</button></form></section>`}
// Gemini answers use **bold** and bullet lines. Escape first, then turn only
// those two patterns into HTML — nothing from the answer runs as code.
function mdLite(text){let out='',list=false;for(const raw of esc(text).split('\n')){const line=raw.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');const item=line.match(/^\s*[-*•]\s+(.*)/);if(item){if(!list){out+='<ul>';list=true;}out+=`<li>${item[1]}</li>`;}else{if(list){out+='</ul>';list=false;}if(line.trim())out+=`<p>${line}</p>`;}}return out+(list?'</ul>':'');}
// Only real data goes to Gemini — anything not filled in is left out.
function advisorContext(){const c={},w=wx();if(hasFarm()){c.farm={name:state.farm.name,district:state.farm.district||undefined,state:state.farm.state||undefined,area_acres:state.farm.area||undefined,current_crop:state.farm.crop||undefined};}if(w){c.season={name:w.season,started:w.seasonStart};c.weather={temperature_c:w.temperature,humidity_pct:w.humidity,rain_next_7_days_mm:w.rain7d,rain_this_season_mm:w.seasonRain,source:'Open-Meteo'};}const soil={};for(const k of SOIL_KEYS)if(state.soil[k]!==''&&state.soil[k]!=null)soil[k==='ph'?'pH':k.toUpperCase()+'_kg_per_ha']=+state.soil[k];if(Object.keys(soil).length)c.soil={...soil,source:state.soil.source||'typed by farmer'};const s=sat();if(s&&s.ndvi!=null)c.satellite_last_30_days={ndvi:s.ndvi,ndvi_status:s.ndvi_status,clear_photos:s.observation_count,rain_fell_mm:s.rainfall_30d,avg_temperature_c:s.temperature,source:'Sentinel-2, CHIRPS, ERA5 via Google Earth Engine'};if(state.crops?.list){c.crop_model_top3=state.crops.list.map(x=>({crop:cropName(x.crop),match_pct:cropPct(x)}));c.crop_advice_confidence={level:state.crops.confidence,reasons:state.crops.reasons};}const d=state.disease?.[0];if(d)c.last_leaf_scan={result:d.healthy?`${d.crop} healthy`:`${d.crop} ${d.condition}`,model_confidence_pct:Math.round(d.probability*100),severity:state.diseaseAdvice?.severity};return c;}

// --- Village search: Google Places through our server (same routes as the planner).
// The dashboard redraws the whole page on every state change, which would throw
// the cursor out of the search box — so the drop-down is updated directly here,
// and the full redraw only happens once a place is actually picked.
let placeResults = [], placeSession = null, placeDebounce = 0, placeAbort = null;
const newPlaceSession = () => crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
function setPlaceStatus(text) { const el = document.querySelector('#place-status'); if (el) { el.textContent = text; el.hidden = !text; } }
function showPlaceResults(places) {
  const list = document.querySelector('#place-results');
  if (!list) return;
  list.innerHTML = places.map((p, i) => `<li data-i="${i}"><strong>${esc(p.name)}</strong><span>${esc(p.detail || p.label || '')}</span></li>`).join('');
  list.hidden = !places.length;
  list.querySelectorAll('li').forEach(li => { li.onclick = () => pickPlace(places[+li.dataset.i]); });
}
function runPlaceSearch(text) {
  clearTimeout(placeDebounce); placeAbort?.abort();
  placeSession ||= newPlaceSession(); // one session: all the typing plus the pick
  const q = text.trim();
  if (q.length < 2) { placeResults = []; showPlaceResults([]); setPlaceStatus(''); return; }
  setPlaceStatus('Searching…');
  placeDebounce = setTimeout(async () => {
    placeAbort = new AbortController();
    try {
      placeResults = await farmApi.searchPlaces(q, placeSession, placeAbort.signal);
      showPlaceResults(placeResults);
      setPlaceStatus(placeResults.length ? '' : 'No matching place found.');
    } catch (error) {
      if (error?.name === 'AbortError') return;
      placeResults = []; showPlaceResults([]);
      setPlaceStatus('Could not search right now — check your connection.');
    }
  }, 600);
}
function pickFirstPlace() { if (placeResults.length) pickPlace(placeResults[0]); }
async function pickPlace(place) {
  const session = placeSession; placeSession = null;
  placeResults = []; showPlaceResults([]);
  setPlaceStatus('Loading place…');
  try { // suggestions carry no coordinates — /api/place resolves the pick
    const full = place.lat != null ? place : await farmApi.placeDetails(place.placeId, session);
    setFarmPlace(full);
  } catch { setPlaceStatus('Could not load this place — please try again.'); }
}
// --- The farm on the farmer's account (/api/farm, Firestore). Signed in: the
// account's farm wins on load and every save goes to it too. Guests keep
// using this browser only.
async function syncToAccount() {
  if (!state.user) return;
  try { await farmApi.saveFarm({ farm: state.farm, soil: state.soil }); }
  catch { toast('Saved on this device only — could not reach your account.'); }
}
async function loadAccountFarm() {
  let saved;
  try { saved = await farmApi.getFarm(); } catch { return; } // keep this browser's copy
  if (saved.farm?.lat != null) {
    const moved = saved.farm.lat !== state.farm.lat || saved.farm.lng !== state.farm.lng;
    state.farm = { ...EMPTY_FARM, ...saved.farm };
    if (saved.soil) {
      state.soil = { ...state.soil, ...saved.soil };
      for (const [key, oldKey] of [['n', 'N'], ['p', 'P'], ['k', 'K'], ['ph', 'ph']])
        if (state.soil[key] === '' || state.soil[key] == null) state.soil[key] = legacyField[oldKey === 'ph' ? 'ph' : oldKey.toLowerCase()] ?? '';
    }
    store('krishiFarm', state.farm); store('krishiSoil', state.soil);
    render();
    if (moved) { cropsFor = ''; loadWeather(); loadSatellite(); } else loadCrops();
  } else if (hasFarm()) {
    syncToAccount(); // first sign-in on this device: keep the farm already set up here
  }
}
const accountNote = () => state.user ? '' : '<p class="setup-note"><a href="login.html">Log in</a> to keep your farm on all your devices.</p>';
function setFarmPlace(place) {
  state.farm = { ...state.farm, name: place.name || place.label || '', district: place.district || '', state: place.state || '', lat: place.lat, lng: place.lng };
  store('krishiFarm', state.farm);
  syncToAccount();
  toast(`Farm set to ${state.farm.name}`); // toast() re-renders: card, sidebar and header all update
  loadWeather(); // the new location's weather
  loadSatellite(); // and its satellite reading
}
function initializeFarmMap() {
  const element = document.querySelector('#farm-map');
  if (!element) return;
  if (!window.L) {
    element.innerHTML = '<p class="map-fallback">Map tiles could not load. Search for your village or use GPS to set the farm location.</p>';
    return;
  }
  const center = hasFarm() ? [state.farm.lat, state.farm.lng] : [22.9734, 78.6569];
  farmMap = window.L.map(element, { scrollWheelZoom: true }).setView(center, hasFarm() ? 15 : 5);
  window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(farmMap);
  const chooseCoordinates = async (lat, lng) => {
    element.dataset.selecting = 'true';
    setPlaceStatus('Pin set — finding the nearest place…');
    try {
      const place = await farmApi.reverseGeocode(lat, lng);
      setFarmPlace({ ...place, lat, lng });
    } catch {
      setFarmPlace({ name: `${lat.toFixed(4)}, ${lng.toFixed(4)}`, lat, lng });
    }
  };
  if (hasFarm()) {
    farmMarker = window.L.marker(center, { draggable: true }).addTo(farmMap);
    farmMarker.bindPopup('Your farm — drag this pin to adjust the location.');
    farmMarker.on('dragend', () => {
      const point = farmMarker.getLatLng();
      chooseCoordinates(point.lat, point.lng);
    });
  }
  farmMap.on('click', event => {
    if (farmMarker) farmMarker.setLatLng(event.latlng);
    else {
      farmMarker = window.L.marker(event.latlng, { draggable: true }).addTo(farmMap);
      farmMarker.on('dragend', () => {
        const point = farmMarker.getLatLng();
        chooseCoordinates(point.lat, point.lng);
      });
    }
    chooseCoordinates(event.latlng.lat, event.latlng.lng);
  });
  window.setTimeout(() => farmMap?.invalidateSize(), 0);
}
function useGps() {
  if (!navigator.geolocation) return setPlaceStatus('This browser has no location support — please search instead.');
  setPlaceStatus('Getting your location…');
  navigator.geolocation.getCurrentPosition(async pos => {
    const { latitude, longitude } = pos.coords;
    try { setFarmPlace(await farmApi.reverseGeocode(latitude, longitude)); }
    catch { setFarmPlace({ name: `${latitude.toFixed(3)}, ${longitude.toFixed(3)}`, lat: latitude, lng: longitude }); }
  }, () => setPlaceStatus('Could not get your location — please search instead.'), { enableHighAccuracy: true, timeout: 10000 });
}
document.addEventListener('click', e => { if (!e.target.closest('.place-box')) showPlaceResults([]); });

// --- Soil card reading (Gemini through /api/soil-card). The reply is only a
// draft: it fills the manual boxes and the farmer must press Save to keep it.
let soilCardFile = null; // the chosen File object lives outside render state
async function readSoilCard() {
  if (!soilCardFile || state.soilBusy) return;
  state.soilBusy = true; state.soilError = ''; render();
  try {
    const data = await farmApi.readSoilCard(soilCardFile);
    const extracted = data.extracted || {};
    state.soilDraft = {};
    for (const [ours, theirs] of [['n', 'N'], ['p', 'P'], ['k', 'K'], ['ph', 'ph']])
      state.soilDraft[ours] = extracted[theirs]?.value ?? '';
    state.soilNotes = data.warnings || [];
    state.soilTab = 'manual'; // show the boxes so the farmer can check and save
    toast('Card read — check the values, then press Save');
  } catch (err) {
    state.soilError = err.status === 429
      ? 'The card reader has reached today’s free limit — please type the values by hand.'
      : err.message;
  }
  state.soilBusy = false; render();
}

// --- Leaf disease: browser model first, then Gemini's second opinion, which
// is extra — the model's result shows straight away and stays if Gemini fails.
let leafFile = null, leafPreviewUrl = '', leafRun = 0;
function chooseLeaf(file) {
  if (leafPreviewUrl) URL.revokeObjectURL(leafPreviewUrl);
  leafFile = file || null;
  leafPreviewUrl = leafFile ? URL.createObjectURL(leafFile) : '';
  state.uploadName = leafFile?.name || '';
  state.disease = null; state.diseaseAdvice = null; state.diseaseError = '';
  render();
}
async function analyseLeaf() {
  if (!leafFile || state.diseaseBusy) return;
  const run = ++leafRun, file = leafFile;
  state.diseaseBusy = true; state.disease = null; state.diseaseAdvice = null; state.diseaseError = ''; render();
  try { state.disease = await farmApi.detectDisease(file); }
  catch (err) { state.diseaseError = err.message || 'The disease model could not run.'; }
  state.diseaseBusy = false; render();
  const top = state.disease?.[0];
  if (!top || top.probability < 0.6) return; // too unsure to be worth a Gemini call
  state.diseaseAdvice = 'loading'; render();
  try { const advice = await farmApi.diseaseAdvice(file, top); if (run === leafRun) state.diseaseAdvice = advice; }
  catch (err) {
    if (run !== leafRun) return;
    state.diseaseAdvice = { error: err.code === 'invalid_image_quality' ? `Photo check: ${err.message}`
      : err.status === 429 ? 'Gemini has reached today’s free limit — the model’s result above still stands.'
      : `No second opinion right now (${err.message}). The model’s result above still stands.` };
  }
  if (run === leafRun) render();
}

function bind(){initializeFarmMap();document.querySelector('#page-back')?.addEventListener('click',navigateBack);document.querySelectorAll('[data-page]').forEach(x=>x.onclick=()=>{if(x.dataset.crop) state.selectedCrop=+x.dataset.crop; navigateTo(x.dataset.page)});document.querySelectorAll('[data-crop]').forEach(x=>x.onclick=()=>{state.selectedCrop=+x.dataset.crop; render()});
 document.querySelector('#save-farm')?.addEventListener('click',()=>{state.farm.crop=document.querySelector('#crop-input').value.trim();state.farm.area=document.querySelector('#area-input').value;store('krishiFarm',state.farm);syncToAccount();toast('Farm context saved');}); document.querySelector('#locate')?.addEventListener('click',useGps);document.querySelector('#map-center')?.addEventListener('click',()=>{if(hasFarm())farmMap?.setView([state.farm.lat,state.farm.lng],16,{animate:true});else farmMap?.setView([22.9734,78.6569],5,{animate:true});});document.querySelector('#search-place')?.addEventListener('click',pickFirstPlace);document.querySelector('#place-search')?.addEventListener('input',e=>runPlaceSearch(e.target.value));document.querySelector('#place-search')?.addEventListener('keydown',e=>{if(e.key==='Enter')pickFirstPlace();});
 document.querySelector('#save-soil')?.addEventListener('click',()=>{['n','p','k','ph'].forEach(k=>state.soil[k]=document.querySelector(`#soil-${k}`).value);state.soil.source=state.soilDraft?'from your soil card, checked by you':'typed by you';state.soilDraft=null;state.soilNotes=[];store('krishiSoil',state.soil);syncToAccount();toast('Soil values saved');loadCrops();});document.querySelector('#retry-weather')?.addEventListener('click',()=>loadWeather(true));document.querySelector('#retry-crops')?.addEventListener('click',()=>{cropsFor='';loadCrops();});document.querySelector('#explain-crops')?.addEventListener('click',explainCrops);document.querySelector('#manual-tab')?.addEventListener('click',()=>{state.soilTab='manual';render();});document.querySelector('#upload-tab')?.addEventListener('click',()=>{state.soilTab='upload';render();});document.querySelector('#soil-file')?.addEventListener('change',e=>{soilCardFile=e.target.files[0]||null;state.soilFileName=soilCardFile?.name||'';state.soilError='';render();});document.querySelector('#read-card')?.addEventListener('click',readSoilCard);document.querySelector('#refresh-health')?.addEventListener('click',()=>{loadWeather(true);loadSatellite(true);});document.querySelector('#retry-sat')?.addEventListener('click',()=>loadSatellite(true));
 document.querySelector('#leaf-file')?.addEventListener('change',e=>chooseLeaf(e.target.files[0]));document.querySelector('#analyse')?.addEventListener('click',analyseLeaf);document.querySelector('#chat-form')?.addEventListener('submit',sendQuestion);document.querySelectorAll('[data-question]').forEach(x=>x.onclick=()=>sendQuestion(null,x.dataset.question));document.querySelector('#clear-chat')?.addEventListener('click',()=>{if(state.loading)return;stopSpeaking();state.messages=[];render();});document.querySelector('#mic')?.addEventListener('click',toggleMic);document.querySelectorAll('[data-speak]').forEach(x=>x.onclick=()=>speakMessage(+x.dataset.speak));document.querySelector('#advisor-lang')?.addEventListener('change',e=>{state.lang=e.target.value;try{localStorage.setItem('krishiLang',state.lang);}catch{}render();});}
async function sendQuestion(e,q){e?.preventDefault();const input=document.querySelector('#chat-text');const text=(q||input?.value||'').trim();if(!text||state.loading)return;
 // Last 6 real turns (errors left out) so follow-up questions make sense.
 const history=state.messages.filter(m=>!m.error).slice(-6).map(m=>({role:m.role==='ai'?'assistant':'user',content:m.text}));
 state.messages.push({role:'user',text});state.loading=true;render();
 try{const lang=state.lang;state.messages.push({role:'ai',lang,text:await farmApi.askAdvisor(text,history,advisorContext(),LANGS[lang][1])});}
 catch(err){state.messages.push({role:'ai',error:true,text:err.status===429?'The advisor has reached today’s free limit — please try again tomorrow.':`Sorry, I could not answer right now. ${err.message}`});}
 state.loading=false;render();document.querySelector('.messages')?.scrollTo({top:99999,behavior:'smooth'});}
// --- Voice (Google Cloud Speech-to-Text / Text-to-Speech via our server).
// Tap 🎤 to start, tap ■ to stop; it also stops by itself after 30 seconds.
// The spoken question is sent like a typed one, in the chosen language.
const LANGS = { en: ['English', 'English'], hi: ['हिन्दी', 'Hindi'], mr: ['मराठी', 'Marathi'], te: ['తెలుగు', 'Telugu'] };
let recorder = null, recordTimer = 0, playing = null;
async function toggleMic() {
  if (state.recording) { recorder?.stop(); return; }
  if (state.loading) return;
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) return toast('This browser cannot record — please type your question.');
  const type = ['audio/webm;codecs=opus', 'audio/ogg;codecs=opus'].find(t => MediaRecorder.isTypeSupported(t));
  if (!type) return toast('This browser records in a format we cannot read yet. Please use Chrome or Edge.');
  let stream;
  try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); }
  catch { return toast('Please allow the microphone to ask by voice.'); }
  const chunks = [];
  recorder = new MediaRecorder(stream, { mimeType: type });
  recorder.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };
  recorder.onstop = async () => {
    clearTimeout(recordTimer); stream.getTracks().forEach(t => t.stop());
    recorder = null; state.recording = false;
    const blob = new Blob(chunks, { type });
    if (blob.size < 2000) { render(); return toast('That was too short — tap 🎤 and speak your question.'); }
    state.loading = true; render();
    try { const text = await farmApi.transcribe(blob, state.lang); state.loading = false; sendQuestion(null, text); }
    catch (err) { state.loading = false; render(); toast(err.message); }
  };
  recorder.start(); state.recording = true; render();
  recordTimer = setTimeout(() => { if (recorder?.state === 'recording') recorder.stop(); }, 30000);
}
function stopSpeaking() { if (playing) { playing.pause(); playing = null; } state.speaking = null; }
async function speakMessage(i) {
  const wasThis = state.speaking === i;
  stopSpeaking(); render();
  if (wasThis) return; // the button doubles as Stop
  const m = state.messages[i];
  if (!m) return;
  state.speaking = i; render();
  try {
    const url = URL.createObjectURL(await farmApi.speak(m.text, m.lang || state.lang));
    playing = new Audio(url);
    playing.onended = () => { URL.revokeObjectURL(url); playing = null; state.speaking = null; render(); };
    await playing.play();
  } catch (err) { stopSpeaking(); render(); toast(err.message); }
}
function toast(text){state.toast=text;render();setTimeout(()=>{state.toast='';render()},2600)}
render();
loadWeather();
loadSatellite();
farmApi.currentUser().then(user=>{state.user=user;render();if(user)loadAccountFarm();});
