// Single integration boundary: every server call goes through here. The Flask
// server serves this page, so paths are same-origin. UI does not hide failures.
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

// Calls the Flask server; on failure throws the server's own message.
export async function api(path, options = {}) {
  const response = await fetch(path, { credentials: 'same-origin', ...options });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw Object.assign(new Error(data.error || `Request failed (${response.status})`), { status: response.status, code: data.code });
  return data;
}

export const farmApi = {
  // The signed-in user, or null when nobody is signed in.
  async currentUser() { try { return (await api('/api/auth/me')).user; } catch { return null; } },
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
  // Still mock — replaced in their own steps (disease: step 6, advisor: step 7).
  async analyseLeaf() { await wait(1200); return { status:'high', name:'Tomato Late Blight', confidence:91, symptoms:['Brown lesions on leaf edges','Irregular dark patches','Leaf discoloration'], action:'Remove severely affected leaves and avoid overhead irrigation. Your local extension officer can confirm the treatment plan.' }; },
  async askAdvisor(question, context) { await wait(900); if (/irrigat/i.test(question)) return 'Rainfall of about 42 mm is forecast within the next 7 days. Hold off on routine irrigation today, then check soil moisture after the rain. Your vegetation score is healthy, so there is no immediate water-stress signal.'; if (/soybean/i.test(question)) return 'Soybean is currently your strongest match at 86% suitability. Your pH of 6.7 and the expected rainfall both support it. Watch the heavy-rain forecast and ensure drainage is clear before sowing.'; return `For your ${context.farm.name} field, I’d start with your soil pH of ${context.soil.ph}, healthy NDVI of 0.63, and the incoming rainfall. Could you tell me a little more about the crop stage or the issue you’re seeing?`; }
};
