import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const GoogleAi = new GoogleGenAI({
  apiKey: process.env.API_KEY,
});

async function main (){
  const response = await GoogleAi.models.generateContent({
    model:"gemini-2.5-flash",
    contents:"Is Computer Science is good carrier",
  })
  console.log(response.text);
}

export default main();