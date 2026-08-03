const intro = document.querySelector('#intro');
const skipIntro = document.querySelector('#skipIntro');
const form = document.querySelector('#cropForm');
const phMethods = document.querySelectorAll('.method');
const phArea = document.querySelector('.ph-area');
const upload = document.querySelector('#healthCard');
const ph = document.querySelector('#ph');
const locationButton = document.querySelector('#locationButton');
const weatherHelp = document.querySelector('#weatherHelp');
const forecast = document.querySelector('#forecast');

function closeIntro() { intro.classList.add('hide'); }
skipIntro.addEventListener('click', closeIntro);
setTimeout(closeIntro, 4750);

phMethods.forEach(button => button.addEventListener('click', () => {
  phMethods.forEach(item => item.classList.toggle('active', item === button));
  const scanning = button.dataset.method === 'scan';
  phArea.classList.toggle('scanning', scanning);
  ph.required = !scanning;
}));

function getTesseract() {
  if (window.Tesseract) return Promise.resolve(window.Tesseract);
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js';
    script.onload = () => resolve(window.Tesseract);
    script.onerror = () => reject(new Error('OCR library unavailable'));
    document.head.appendChild(script);
  });
}

function pHFromText(text) {
  const match = text.match(/(?:soil\s*)?p\s*\.?\s*h\s*(?:value)?\s*[:=\-]?\s*(1[0-4](?:\.\d+)?|[0-9](?:\.\d+)?)/i);
  return match ? Number(match[1]) : null;
}

upload.addEventListener('change', async () => {
  if (!upload.files.length) return;
  const label = document.querySelector('.upload-zone b');
  const help = document.querySelector('.upload-zone small');
  label.textContent = 'Reading your Soil Health Card…';
  help.textContent = upload.files[0].name;
  try {
    const Tesseract = await getTesseract();
    const result = await Tesseract.recognize(upload.files[0], 'eng', { logger: () => {} });
    const extractedPh = pHFromText(result.data.text);
    if (extractedPh === null) throw new Error('No pH value found');
    ph.value = extractedPh.toFixed(1);
    label.textContent = `pH ${ph.value} extracted from your card`;
    help.textContent = 'Please check the reading before continuing';
    ph.required = false;
  } catch {
    label.textContent = 'We couldn’t read the pH value';
    help.textContent = 'Please switch to “Enter manually” and add the pH from your card.';
    ph.required = true;
  }
});

function setWeather(location = 'Your field', values = { temperature: 27.4, humidity: 74, rainfall: 164 }, source = 'Daily forecast + 14-day seasonal estimate') {
  Object.entries(values).forEach(([id, value]) => document.querySelector(`#${id}`).value = value);
  weatherHelp.textContent = `15-day outlook ready for ${location}. We’ve added today’s conditions and estimated rainfall across the next 14 days.`;
  forecast.querySelector('b').textContent = location;
  forecast.querySelector('small').textContent = source;
  locationButton.innerHTML = '<span>✓</span> Location added';
}

async function loadLocalForecast(position) {
  const { latitude, longitude } = position.coords;
  const query = new URLSearchParams({
    latitude: latitude.toFixed(4), longitude: longitude.toFixed(4),
    current: 'temperature_2m,relative_humidity_2m',
    daily: 'precipitation_sum', forecast_days: '15', timezone: 'auto'
  });
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${query}`);
  if (!response.ok) throw new Error('Weather service unavailable');
  const data = await response.json();
  const totalRainfall = data.daily.precipitation_sum.reduce((total, amount) => total + (amount || 0), 0);
  setWeather('Your local field', {
    temperature: Number(data.current.temperature_2m.toFixed(1)),
    humidity: Math.round(data.current.relative_humidity_2m),
    rainfall: Number(totalRainfall.toFixed(1))
  }, 'Live today + 14-day rainfall forecast');
}

locationButton.addEventListener('click', async () => {
  locationButton.disabled = true;
  locationButton.textContent = 'Finding your field…';
  if (!navigator.geolocation) { setWeather('Sample local outlook', undefined, 'Sample values — location unavailable'); locationButton.disabled = false; return; }
  navigator.geolocation.getCurrentPosition(async position => {
    try { await loadLocalForecast(position); }
    catch { setWeather('Sample local outlook', undefined, 'Sample values — weather service unavailable'); }
    locationButton.disabled = false;
  }, () => { setWeather('Sample local outlook', undefined, 'Sample values — location permission unavailable'); locationButton.disabled = false; }, { timeout: 6000, maximumAge: 300000 });
});

const crops = [
  { name: 'Rice', image: 'preview (3).webp', minRain: 140, temp: 27, ph: 6.2, tags: ['Warm season', 'Moisture-loving'], copy: 'Strong moisture and warm conditions make this a natural fit for your field.' },
  { name: 'Maize', image: 'preview (1).webp', minRain: 80, temp: 25, ph: 6.4, tags: ['Versatile', 'Fast growing'], copy: 'Your available nutrients and balanced pH support a vigorous maize crop.' },
  { name: 'Coffee', image: 'preview (2).webp', minRain: 120, temp: 23, ph: 6.1, tags: ['Perennial', 'High value'], copy: 'A humid outlook and gently acidic soil offer a promising coffee environment.' },
  { name: 'Millet', image: 'preview.webp', minRain: 45, temp: 28, ph: 6.7, tags: ['Resilient', 'Low water'], copy: 'A resilient choice that keeps your rotation productive under variable rainfall.' },
  { name: 'Groundnut', image: 'preview (5).webp', minRain: 65, temp: 26, ph: 6.3, tags: ['Soil builder', 'Warm season'], copy: 'Its nutrient needs align well with your field and it helps diversify the soil.' },
  { name: 'Tomato', image: 'preview (4).webp', minRain: 60, temp: 24, ph: 6.4, tags: ['High value', 'Well drained'], copy: 'Moderate rainfall and a near-neutral pH create a sound starting point for tomatoes.' }
];

function scoreCrop(crop, data) {
  const weather = 100 - Math.min(38, Math.abs(data.temperature - crop.temp) * 4) - Math.min(25, Math.abs(data.rainfall - crop.minRain) * .15);
  const soil = 100 - Math.min(30, Math.abs(data.ph - crop.ph) * 18) - Math.min(16, Math.abs(data.nitrogen - 75) * .08);
  const humidity = 100 - Math.min(18, Math.abs(data.humidity - 70) * .55);
  return Math.max(62, Math.round((weather * .42 + soil * .42 + humidity * .16)));
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  Object.keys(data).forEach(key => data[key] = Number(data[key]));
  if (!data.ph && ph.value) data.ph = Number(ph.value);
  if (!data.ph) { alert('Please enter a soil pH value or upload a Soil Health Card.'); return; }
  const chosen = crops.map(crop => ({...crop, score: scoreCrop(crop, data)})).sort((a, b) => b.score - a.score).slice(0, 3);
  document.querySelector('#recommendations').innerHTML = chosen.map((crop, index) => `
    <article class="crop-card" style="--crop-image:url('${crop.image}')"><span class="crop-rank">0${index + 1} / BEST FIT</span><span class="confidence">${crop.score}%</span><h3>${crop.name}</h3><p>${crop.copy}</p><div class="crop-tags">${crop.tags.map(tag => `<span>${tag}</span>`).join('')}</div></article>`).join('');
  document.querySelector('#resultSummary').textContent = `A ${data.ph < 6 ? 'gently acidic' : data.ph > 7 ? 'slightly alkaline' : 'balanced'} soil profile with ${data.rainfall >= 110 ? 'reliable' : 'measured'} moisture potential.`;
  const wait = data.rainfall > 140 ? 'After harvest + 14–21 days' : 'After harvest + 10–14 days';
  document.querySelector('#sowDate').textContent = wait;
  const results = document.querySelector('#results');
  results.classList.add('show');
  setTimeout(() => results.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
});
