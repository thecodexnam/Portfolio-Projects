import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();


const GoogleAi = new GoogleGenAI({
  apiKey: process.env.API_KEY
});

export async function askGemini(prompt) {
  const response = await GoogleAi.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}
