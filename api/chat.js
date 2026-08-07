/* Vercel/Node serverless handler. Keep OPENAI_API_KEY on the server only. */
module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!process.env.OPENAI_API_KEY || !process.env.OPENAI_MODEL) return res.status(503).json({ error: 'AI service is not configured' });
  const { question, language = 'English', context = {}, history = [] } = req.body || {};
  if (!question || typeof question !== 'string') return res.status(400).json({ error: 'A question is required' });

  const instructions = `You are Kisan AI, a concise and practical farm advisor for farmers in India. Reply only in ${language}. Explain in simple, respectful language. You can answer general farm questions about crops, soil, irrigation, seasonal planning, weather, pests and markets. Use the supplied field context when relevant. Do not invent local prices, weather, regulations, diagnoses or pesticide dosage. For dangerous pest, chemical or disease situations, advise the farmer to consult a local agricultural extension officer or certified agronomist. Keep answers under 150 words and use short bullets only when useful.`;
  const input = [{ role: 'user', content: `Field context: ${JSON.stringify(context)}\nConversation: ${JSON.stringify(history.slice(-6))}\nFarmer question: ${question}` }];
  try {
    const response = await fetch('https://api.openai.com/v1/responses', { method: 'POST', headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ model: process.env.OPENAI_MODEL, instructions, input }) });
    if (!response.ok) throw new Error(`Model request failed: ${response.status}`);
    const result = await response.json();
    const answer = result.output_text || result.output?.flatMap(item => item.content || []).filter(item => item.type === 'output_text').map(item => item.text).join('');
    if (!answer) throw new Error('No answer returned');
    return res.status(200).json({ answer });
  } catch (error) { return res.status(502).json({ error: 'Kisan AI is temporarily unavailable' }); }
};
