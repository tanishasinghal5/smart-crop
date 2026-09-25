// src/geminiProxy.js
import express from "express";
import { askGemini } from "./geminiService.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.post("/api/gemini", async (req, res) => {
  const { prompt, options } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Missing 'prompt' field." });
  }
  try {
    const answer = await askGemini(prompt, options);
    res.json({ answer });
  } catch (e) {
    console.error("Gemini error:", e);
    res.status(500).json({ error: e.message });
  }
});

const port = process.env.GEMINI_PROXY_PORT ?? 3001;
app.listen(port, () => console.log(`Gemini proxy listening on http://localhost:${port}`));
