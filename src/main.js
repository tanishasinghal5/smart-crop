import { farmApi } from './services/farmApi.js';

const app = document.querySelector('#app');
// Real text (Google, Gemini, the farmer) goes into innerHTML, so escape it.
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[c]);
// Farm and soil live in this browser until /api/farm exists. Storage can be blocked, so never rely on it.
const load = (key, fallback) => { try { return { ...fallback, ...JSON.parse(localStorage.getItem(key)) }; } catch { return fallback; } };
const store = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} };
const EMPTY_FARM = { name: '', district: '', state: '', lat: null, lng: null, area: '', crop: '' };
const EMPTY_SOIL = { n: '', p: '', k: '', ph: '' };
const state = {
  page: 'dashboard', loading: false, toast: '', user: null, weather: null,
  farm: load('krishiFarm', EMPTY_FARM),
  soil: load('krishiSoil', EMPTY_SOIL), selectedCrop: 0,
  disease: null, uploadName: '', messages: [{ role: 'ai', text: 'Namaste! Ask me anything about your farm — crops, soil, water, pests or weather.' }]
};
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
    if (saved?.fetchedAt && Date.now() - saved.fetchedAt < WX_TTL_MS) { state.weather = saved; render(); return; }
  }
  state.weather = 'loading'; render();
  try { state.weather = await farmApi.getWeather(state.farm.lat, state.farm.lng); store(key, state.weather); }
  catch { state.weather = 'error'; }
  render();
}
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
    added ? (hasPh ? `pH ${esc(state.soil.ph)} · your entries` : 'pH not added yet') : 'Enter or upload values', 'gold');
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
const recommendations = [
  { name:'Soybean', score:86, color:'#4f8f52', summary:'Strong fit for your current soil and seasonal conditions.', good:['Soil pH is in the ideal range','Rainfall outlook supports germination','Good district performance'], risk:'Heavy rainfall is possible next week.' },
  { name:'Pigeon pea', score:81, color:'#c28a31', summary:'A resilient, lower-water option for the Kharif season.', good:['Tolerates your soil type','Moderate water requirement','Good market stability'], risk:'Allow space for longer crop duration.' },
  { name:'Maize', score:72, color:'#d9b23b', summary:'Suitable if irrigation can be available during dry spells.', good:['Nutrient levels are workable','Growing degree days are favourable'], risk:'Needs attentive water management.' }
];

function render() {
  app.innerHTML = `<aside class="sidebar"><a class="brand" data-page="dashboard"><span class="brand-mark">✦</span><span>krishi<span>ai</span></span></a><div class="farm-chip"><span class="pin">⌖</span><div><small>YOUR FARM</small><strong>${esc(farmName())}</strong></div></div><nav>${nav.map(([id,label])=>`<button class="nav-item ${state.page===id?'active':''}" data-page="${id}"><i>${icons[id]}</i>${label}</button>`).join('')}</nav><div class="sidebar-bottom"><a class="nav-item" href="index.html" style="text-decoration:none"><i>←</i>Back to home</a><button class="help">? Help centre</button><div class="user"><div class="avatar">${esc(initials())}</div><div><strong>${esc(userName())}</strong><small>${state.user ? 'Signed in' : '<a href="login.html" style="color:#d8e987">LOG IN</a>'}</small></div><span>⌄</span></div></div></aside><main><header><button class="mobile-menu" id="menu">☰</button><div class="crumb"><span>${nav.find(n=>n[0]===state.page)?.[1]}</span><small>${esc(farmLine())}</small></div><div class="header-actions"><button class="icon-button">${icons.bell}<b></b></button><a class="profile" href="${state.user ? 'profile.html' : 'login.html'}" title="${state.user ? esc(userName()) : 'Log in'}" style="text-decoration:none">${esc(initials())}</a></div></header><section class="content">${page()}</section></main><div class="toast ${state.toast?'show':''}">${esc(state.toast)}</div>`;
  bind();
}

function page(){ return ({dashboard, farm, soil, crops, health, disease, advisor})[state.page](); }
const metric = (icon,label,value,detail,tone='') => `<article class="metric ${tone}"><div class="metric-icon">${icon}</div><small>${label}</small><strong>${value}</strong><span>${detail}</span></article>`;
const action = (icon,title,text,target) => `<button class="quick-action" data-page="${target}"><i>${icon}</i><div><strong>${title}</strong><span>${text}</span></div><b>→</b></button>`;

function dashboard(){ return `<div class="intro"><div><p class="eyebrow">${greeting()}</p>${hasFarm() ? '<h1>Your farm is looking <em>healthy.</em></h1><p class="lede">Here’s a clear view of what matters for your field today.</p>' : '<h1>Let’s set up <em>your farm.</em></h1><p class="lede">Pick your farm location to get weather, crop and field advice for it.</p>'}</div><button class="primary" data-page="farm">${hasFarm() ? 'Manage farm' : 'Set farm location'} <span>→</span></button></div><div class="metrics">${metric('◒','FIELD HEALTH','Healthy','NDVI 0.63 · stable','green')}${wxMetric('☔','RAINFALL FORECAST',w=>`${w.rain7d} mm`,()=>'Next 7 days · Open-Meteo','blue')}${soilMetric()}${wxMetric('☼','TEMPERATURE',w=>deg(w.temperature),w=>`Feels like ${deg(w.feelsLike)} · humidity ${w.humidity==null?'—':Math.round(w.humidity)+'%'}`,'orange')}</div><div class="grid dashboard-grid"><section class="panel health-hero"><div class="panel-top"><div><p class="eyebrow">SATELLITE INSIGHT</p><h2>Vegetation health</h2></div><button class="text-button" data-page="health">View field health →</button></div><div class="health-main"><div class="gauge"><svg viewBox="0 0 120 70"><path d="M10 60 A50 50 0 0 1 110 60"/><path class="gauge-fill" d="M10 60 A50 50 0 0 1 110 60"/></svg><strong>0.63</strong><span>NDVI score</span></div><div><strong class="status healthy-dot">Healthy vegetation</strong><p>Your crop cover is consistent and responding well to recent rainfall.</p><span class="chip positive">↑ 8% from last month</span></div></div><div class="mini-chart"><span>0.8</span><svg viewBox="0 0 440 90" preserveAspectRatio="none"><defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop stop-color="#6da66f" stop-opacity=".28"/><stop offset="1" stop-color="#6da66f" stop-opacity="0"/></linearGradient></defs><path class="area" d="M0 78 L45 66 L88 70 L132 49 L176 54 L220 38 L264 45 L308 27 L352 35 L396 15 L440 20 V90 H0Z"/><path class="line" d="M0 78 L45 66 L88 70 L132 49 L176 54 L220 38 L264 45 L308 27 L352 35 L396 15 L440 20"/></svg><span>Jun&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Jul&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Aug&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Sep</span></div></section><section class="panel recommendations"><div class="panel-top"><div><p class="eyebrow">CROP PLANNER</p><h2>Top recommendations</h2></div><button class="text-button" data-page="crops">See all →</button></div>${recommendations.slice(0,3).map((c,i)=>`<button class="rec-row" data-page="crops" data-crop="${i}"><span class="rank">0${i+1}</span><div><strong>${c.name}</strong><small>${c.summary}</small></div><b>${c.score}%</b><span class="score-ring" style="--score:${c.score};--color:${c.color}"></span></button>`).join('')}</section></div><div class="bottom-grid"><section><div class="section-heading"><div><p class="eyebrow">KEEP MOVING</p><h2>Quick actions</h2></div></div><div class="quick-grid">${action('⌖','Set farm location','Pin your field on a map','farm')}${action('◈','Add soil report','Enter or upload values','soil')}${action('⊕','Scan a crop leaf','Check for disease','disease')}${action('◌','Ask AI advisor','Get field-specific help','advisor')}</div></section>${alertsPanel()}</div>`; }

function farm(){return `<div class="intro compact"><div><p class="eyebrow">FIELD SETUP</p><h1>Where is your <em>farm?</em></h1><p class="lede">Your location helps us tailor weather, satellite and crop advice.</p></div></div><div class="grid farm-grid"><section class="panel map-card"><div class="map-toolbar"><div class="place-box"><input id="place-search" placeholder="Search your village, town or district" value="${esc(state.farm.name)}" autocomplete="off"/><ul id="place-results" class="place-results" hidden></ul></div><button class="primary small" id="search-place">Search</button></div><p class="place-hint" id="place-status" hidden></p><div class="demo-map"><div class="field-shape"></div><button class="map-pin" title="Farm location">⌖</button></div><div class="map-actions"><button class="secondary" id="locate">⌖ Use current location</button><button class="text-button" id="polygon">◇ Draw farm boundary</button></div></section><section class="panel location-details"><p class="eyebrow">CURRENT FIELD</p><h2>${esc(farmName())}</h2>${hasFarm() ? '<span class="chip positive">● Location selected</span>' : '<span class="chip">No location yet</span>'}<div class="data-list"><div><span>Latitude</span><strong>${hasFarm() ? state.farm.lat.toFixed(4) + '°' : '—'}</strong></div><div><span>Longitude</span><strong>${hasFarm() ? state.farm.lng.toFixed(4) + '°' : '—'}</strong></div><div><span>District</span><strong>${esc([state.farm.district, state.farm.state].filter(Boolean).join(', ') || '—')}</strong></div><div><span>Season</span><strong>${seasonNow()}</strong></div></div><label>Farm area (acres)<input id="area-input" type="number" min="0" step="0.1" value="${esc(state.farm.area)}" placeholder="Not added"/></label><label>Current crop / plan<input id="crop-input" value="${esc(state.farm.crop)}" placeholder="Not added"/></label><button class="primary full" id="save-farm">Save field context →</button><p class="setup-note">Search and location use Google Maps through our server. A live map view comes later.</p></section></div>`}
function soil(){return `<div class="intro compact"><div><p class="eyebrow">SOIL PROFILE</p><h1>Know your soil, <em>grow with confidence.</em></h1><p class="lede">Enter a recent report or upload a soil health card for review.</p></div></div><div class="two-tabs"><button class="tab active">Manual input</button><button class="tab" id="upload-tab">Upload soil card</button></div><div class="grid soil-grid"><section class="panel soil-form"><div class="form-head"><h2>Soil nutrient values</h2><span class="chip">mg/kg except pH</span></div><div class="field-grid">${[['n','Nitrogen (N)'],['p','Phosphorus (P)'],['k','Potassium (K)'],['ph','pH level']].map(([k,l])=>`<label>${l}<input id="soil-${k}" type="number" min="0" step="0.1" value="${esc(state.soil[k])}" placeholder="Not added"/></label>`).join('')}</div><button class="primary" id="save-soil">Save soil values →</button></section><section class="soil-side"><article class="panel soil-score"><p class="eyebrow">CURRENT SOIL HEALTH</p><div class="score">78<span>/100</span></div><strong>Good foundation</strong><p>Your pH and potassium levels support the current crop recommendations.</p><div class="progress"><i style="width:78%"></i></div></article><article class="note-card"><i>✦</i><div><strong>A report is best</strong><p>Use values from a lab report taken within the last 12 months for more reliable advice.</p></div></article></section></div>`}
function crops(){ if(!hasFarm()) return needFarm('Crop advice needs your farm’s location for its weather and season.'); const c=recommendations[state.selectedCrop]; return `<div class="intro compact split"><div><p class="eyebrow">CROP PLANNER · ${seasonNow().toUpperCase()}</p><h1>What should you <em>grow?</em></h1><p class="lede">Recommendations use your soil, farm location, weather and field condition.</p></div><span class="context-pill">◈ Soil added&nbsp;&nbsp; · &nbsp;&nbsp;⌖ Location set</span></div><div class="crop-layout"><section class="crop-list">${recommendations.map((x,i)=>`<button class="crop-option ${i===state.selectedCrop?'selected':''}" data-crop="${i}"><span class="crop-number">0${i+1}</span><div><strong>${x.name}</strong><p>${x.summary}</p></div><b>${x.score}%<small>suitability</small></b><i>→</i></button>`).join('')}</section><section class="panel crop-detail"><div class="detail-hero" style="--accent:${c.color}"><div><p>BEST MATCH</p><h2>${c.name}</h2><span>${c.score}% suitability</span></div><div class="detail-score">${c.score}<small>%</small></div></div><div class="detail-body"><h3>Why this works for your field</h3><p class="detail-summary">${c.summary}</p><div class="factor-list">${c.good.map(x=>`<div class="factor good">✓ <span>${x}</span></div>`).join('')}<div class="factor caution">! <span><strong>Watch for:</strong> ${c.risk}</span></div></div><div class="field-context"><span>FIELD CONTEXT</span><p>${esc(farmName())} · pH ${esc(state.soil.ph || '—')} · NDVI 0.63 · 42 mm forecast</p></div><button class="primary full" data-page="advisor">Ask advisor about ${c.name} →</button><p class="backend-note">Reasons shown here are demo data. Production uses the explanation returned by the crop recommendation API.</p></div></section></div>`}
function health(){if(!hasFarm()) return needFarm('Field health is read from satellite images of your farm, so we need to know where it is.');return `<div class="intro compact split"><div><p class="eyebrow">SATELLITE FIELD HEALTH</p><h1>Your crop cover is <em>thriving.</em></h1><p class="lede">A simple view of vegetation, weather and changes in your field.</p></div><button class="secondary" id="refresh-health">↻ Refresh data</button></div><div class="metrics health-metrics">${metric('◒','CURRENT NDVI','0.63','Healthy · ↑ 8% this month','green')}${wxMetric('☔','RAINFALL',w=>`${w.rain7d} mm`,()=>'Next 7 days · Open-Meteo','blue')}${wxMetric('☼','TEMPERATURE',w=>deg(w.temperature),w=>`Humidity ${w.humidity==null?'—':Math.round(w.humidity)+'%'}`,'orange')}</div><section class="panel full-chart"><div class="panel-top"><div><p class="eyebrow">VEGETATION INDEX</p><h2>NDVI trend</h2></div><span class="chip positive">↑ Improving</span></div><div class="big-chart"><div class="axis">0.8<br/>0.7<br/>0.6<br/>0.5<br/>0.4</div><svg viewBox="0 0 850 250" preserveAspectRatio="none"><defs><linearGradient id="bigarea" x1="0" x2="0" y1="0" y2="1"><stop stop-color="#6da66f" stop-opacity=".3"/><stop offset="1" stop-color="#6da66f" stop-opacity="0"/></linearGradient></defs><path class="area" d="M0 200 L100 170 L200 180 L300 130 L400 150 L500 92 L600 115 L700 50 L850 70 V250 H0Z"/><path class="line" d="M0 200 L100 170 L200 180 L300 130 L400 150 L500 92 L600 115 L700 50 L850 70"/></svg></div><div class="months">Jun <span>Jul</span><span>Aug</span><span>Sep</span><span>Today</span></div></section><div class="bottom-grid"><section class="panel insight-card"><p class="eyebrow">WHAT THIS MEANS</p><h2>Consistent green cover</h2><p>Vegetation is stronger than the previous observation. Keep monitoring after heavy rain.</p></section>${alertsPanel()}</div>`}
function disease(){let result=state.disease;return `<div class="intro compact"><div><p class="eyebrow">DISEASE DETECTION</p><h1>What’s happening to <em>your crop?</em></h1><p class="lede">Upload a clear leaf photo and we’ll check it for visible disease signs.</p></div></div><div class="disease-layout"><section class="panel upload-card"><label class="dropzone ${state.uploadName?'has-file':''}" for="leaf-file"><input id="leaf-file" type="file" accept="image/*" capture="environment" hidden/><span class="upload-icon">⌁</span><strong>${esc(state.uploadName) || 'Drop a leaf photo here'}</strong><p>${state.uploadName ? 'Ready to analyse' : 'or tap to choose from your phone or computer'}</p><span class="secondary small">Choose photo</span></label><div class="photo-tips"><strong>For a better result</strong><span>• Use natural light</span><span>• Keep the leaf in focus</span><span>• Capture affected areas</span></div><button class="primary full" id="analyse" ${state.uploadName?'':'disabled'}>${state.loading?'Analysing leaf…':'Analyse photo →'}</button></section>${result?diseaseResult(result):`<section class="empty-result"><div class="empty-art">⌁</div><h2>Your result will appear here</h2><p>We’ll clearly tell you whether a condition looks likely, possible, or needs a closer look.</p></section>`}</div>`}
function diseaseResult(r){return `<section class="panel disease-result"><p class="eyebrow">ANALYSIS RESULT</p><span class="confidence ${r.status}">${r.status==='high'?'HIGH CONFIDENCE':'POSSIBLE CONDITION'}</span><h2>${r.name}</h2><div class="confidence-row"><strong>${r.confidence}%</strong><span>model confidence</span><div class="progress"><i style="width:${r.confidence}%"></i></div></div><h3>Signs detected</h3><ul>${r.symptoms.map(x=>`<li>${x}</li>`).join('')}</ul><div class="action-box"><span>RECOMMENDED NEXT STEP</span><p>${r.action}</p></div><p class="diagnosis-note">This is a decision-support result, not a definitive diagnosis. If symptoms spread, consult a local agriculture officer.</p></section>`}
function advisor(){return `<div class="advisor-head"><div><p class="eyebrow">YOUR FIELD-SMART ASSISTANT</p><h1>Ask anything about <em>your farm.</em></h1><p class="lede">Advice is based on your selected field, soil, weather and crop context.</p></div><div class="advisor-context"><span>⌖ ${esc(hasFarm() ? farmName() : 'No farm set')}</span><span>◈ pH ${esc(state.soil.ph || '—')}</span><span>◒ NDVI 0.63</span></div></div><section class="chat panel"><div class="chat-top"><div class="advisor-avatar">✦</div><div><strong>Krishi AI Advisor</strong><span><i></i> Field context connected</span></div><button class="text-button">Clear chat</button></div><div class="messages">${state.messages.map(m=>`<div class="message ${m.role}">${m.role==='ai'?'<div class="mini-avatar">✦</div>':''}<div>${esc(m.text)}</div></div>`).join('')}${state.loading?'<div class="message ai"><div class="mini-avatar">✦</div><div class="typing"><i></i><i></i><i></i></div></div>':''}</div><div class="suggestions"><span>Try asking</span>${['Should I irrigate tomorrow?','Is soybean a good choice now?','How can I improve my soil?'].map(q=>`<button class="suggestion" data-question="${q}">${q}</button>`).join('')}</div><form class="chat-input" id="chat-form"><button type="button" class="mic" title="Voice input">${icons.mic}</button><input id="chat-text" placeholder="Ask about your field…" autocomplete="off"/><button class="send" aria-label="Send">↑</button></form></section>`}

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
  }, 300);
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
function setFarmPlace(place) {
  state.farm = { ...state.farm, name: place.name || place.label || '', district: place.district || '', state: place.state || '', lat: place.lat, lng: place.lng };
  store('krishiFarm', state.farm);
  toast(`Farm set to ${state.farm.name}`); // toast() re-renders: card, sidebar and header all update
  loadWeather(); // the new location's weather
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

function bind(){document.querySelectorAll('[data-page]').forEach(x=>x.onclick=()=>{state.page=x.dataset.page; if(x.dataset.crop) state.selectedCrop=+x.dataset.crop; render()});document.querySelectorAll('[data-crop]').forEach(x=>x.onclick=()=>{state.selectedCrop=+x.dataset.crop; render()});
 document.querySelector('#save-farm')?.addEventListener('click',()=>{state.farm.crop=document.querySelector('#crop-input').value.trim();state.farm.area=document.querySelector('#area-input').value;store('krishiFarm',state.farm);toast('Farm context saved');}); document.querySelector('#locate')?.addEventListener('click',useGps);document.querySelector('#search-place')?.addEventListener('click',pickFirstPlace);document.querySelector('#place-search')?.addEventListener('input',e=>runPlaceSearch(e.target.value));document.querySelector('#place-search')?.addEventListener('keydown',e=>{if(e.key==='Enter')pickFirstPlace();});document.querySelector('#polygon')?.addEventListener('click',()=>toast('Not available yet'));
 document.querySelector('#save-soil')?.addEventListener('click',()=>{['n','p','k','ph'].forEach(k=>state.soil[k]=document.querySelector(`#soil-${k}`).value);store('krishiSoil',state.soil);toast('Soil values saved');});document.querySelector('#upload-tab')?.addEventListener('click',()=>toast('Upload extraction connects to your backend when available.'));document.querySelector('#refresh-health')?.addEventListener('click',()=>loadWeather(true));
 document.querySelector('#leaf-file')?.addEventListener('change',e=>{state.uploadName=e.target.files[0]?.name||'';render()});document.querySelector('#analyse')?.addEventListener('click',async()=>{state.loading=true;render();state.disease=await farmApi.analyseLeaf();state.loading=false;render();});document.querySelector('#chat-form')?.addEventListener('submit',sendQuestion);document.querySelectorAll('[data-question]').forEach(x=>x.onclick=()=>sendQuestion(null,x.dataset.question));}
async function sendQuestion(e,q){e?.preventDefault();const input=document.querySelector('#chat-text');const text=q||input.value.trim();if(!text||state.loading)return;state.messages.push({role:'user',text});state.loading=true;render();const answer=await farmApi.askAdvisor(text,state);state.messages.push({role:'ai',text:answer});state.loading=false;render();document.querySelector('.messages')?.scrollTo({top:9999,behavior:'smooth'});}
function toast(text){state.toast=text;render();setTimeout(()=>{state.toast='';render()},2600)}
render();
loadWeather();
farmApi.currentUser().then(user=>{state.user=user;render();});
