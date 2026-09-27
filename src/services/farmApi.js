// Single integration boundary. Replace the mock functions with fetch calls when
// VITE_API_BASE_URL and backend routes are available. UI does not hide failures.
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
export const farmApi = {
  async analyseLeaf() { await wait(1200); return { status:'high', name:'Tomato Late Blight', confidence:91, symptoms:['Brown lesions on leaf edges','Irregular dark patches','Leaf discoloration'], action:'Remove severely affected leaves and avoid overhead irrigation. Your local extension officer can confirm the treatment plan.' }; },
  async askAdvisor(question, context) { await wait(900); if (/irrigat/i.test(question)) return 'Rainfall of about 42 mm is forecast within the next 7 days. Hold off on routine irrigation today, then check soil moisture after the rain. Your vegetation score is healthy, so there is no immediate water-stress signal.'; if (/soybean/i.test(question)) return 'Soybean is currently your strongest match at 86% suitability. Your pH of 6.7 and the expected rainfall both support it. Watch the heavy-rain forecast and ensure drainage is clear before sowing.'; return `For your ${context.farm.name} field, I’d start with your soil pH of ${context.soil.ph}, healthy NDVI of 0.63, and the incoming rainfall. Could you tell me a little more about the crop stage or the issue you’re seeing?`; }
};
