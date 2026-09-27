// Gemini Service Wrapper
// This module provides a simple function to send prompts to the Gemini API using the @google/generative-ai client.

import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not set in the environment. Please add it to your .env file.");
}

const genAI = new GoogleGenerativeAI(apiKey);
// Choose the model you want to use; gemini-1.5-flash is a good default for chat-like interactions.
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Sends a prompt to Gemini and returns the generated text.
 * @param {string} prompt - The user prompt to send.
 * @param {object} [options] - Optional parameters passed to generateContent.
 * @returns {Promise<string>} The response text from Gemini.
 */
export async function askGemini(prompt, options = {}) {
  if (!prompt) {
    throw new Error("Prompt is required for askGemini.");
  }
  const result = await model.generateContent(prompt, options);
  // The Gemini client returns a response object; we extract the text.
  const response = await result.response;
  return response.text();
}
