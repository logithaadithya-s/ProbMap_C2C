import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "../config/index.js";

const genAI = new GoogleGenerativeAI(config.gemini.apiKey);
const model = genAI.getGenerativeModel({ 
  model: config.gemini.model,
  generationConfig: {
    temperature: 0.1,
    topK: 32,
    topP: 1,
    maxOutputTokens: 4096,
  }
});

const ANALYSIS_PROMPT = `Analyze this image and determine if it shows damage to public property.

If it shows public property damage (pothole, street light, road damage, drainage, traffic signals, pipelines, public tap, or similar), return a JSON object with these fields:
- category (Pothole, Traffic Signals, Pipelines, Drainage, Street Light, Public Tap, Road Damage, Garbage, related to public disturbance Others)
- importance (High, Medium, Low)
- cost_estimate (INR range, e.g. "500-1000")
- confidence (0-1 float)
- is_public_property (true)

If it shows people, animals, private property, nature scenes, mobile phone or any non-public-property content, or public property damage in mobile return:
- category: "Others"
- importance: null
- cost_estimate: "0"
- confidence: (0-1 float)
- is_public_property: false

Example for public property: {"category": "Pothole", "importance": "High", "cost_estimate": "500-1000", "confidence": 0.85, "is_public_property": true}
Example for non-public property: {"category": "Others", "importance": null, "cost_estimate": "0", "confidence": 0.9, "is_public_property": false}`;

export function parseLLMResponse(responseText) {
  try {
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (e) {
    console.error("Failed to parse LLM response:", e);
  }
  return {
    category: "Others",
    importance: null,
    cost_estimate: "0",
    confidence: 0.7,
    is_public_property: false,
  };
}

export function simpleNSFWDetection(imageBuffer) {
  return false;
}

export async function analyzeImageWithGemini(imageBuffer, mimeType) {
  try {
    if (!imageBuffer || imageBuffer.length === 0) {
      throw new Error("Empty image buffer");
    }

    console.log(`Analyzing image: ${imageBuffer.length} bytes, type: ${mimeType}`);
    
    const imagePart = {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType,
      },
    };

    console.log("Sending to Gemini model:", config.gemini.model);
    
    const result = await model.generateContent([ANALYSIS_PROMPT, imagePart]);
    const response = await result.response;
    const text = response.text();
    console.log("Gemini response:", text);
    return parseLLMResponse(text);
  } catch (error) {
    console.error("❌ Gemini error:", error.message);
    if (error.message.includes("does not support image")) {
      console.error("Model may not support vision. Check GEMINI_API_KEY and model name.");
    }
    return {
      category: "Others",
      importance: null,
      cost_estimate: "0",
      confidence: 0.7,
      is_public_property: false,
    };
  }
}

export async function analyzeImageForNSFW(imageBuffer, mimeType) {
  return simpleNSFWDetection(imageBuffer);
}