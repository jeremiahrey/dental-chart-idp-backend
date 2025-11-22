import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs/promises";
import dotenv from "dotenv";
import { GeminiExtractionResult } from "../types/dentalChart.types";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Convert image file to base64
async function fileToBase64(filePath: string): Promise<string> {
  const imageBuffer = await fs.readFile(filePath);
  return imageBuffer.toString("base64");
}

// Extract data from page image using Gemini
export async function extractPageData(
  imagePath: string,
  prompt: string,
  mimeType: string = "image/jpeg"
): Promise<GeminiExtractionResult> {
  try {
    // Initailize model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-latest",
    });

    const base64Data = await fileToBase64(imagePath);

    //Prepare content
    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: mimeType,
      },
    };

    // Generate content
    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    let text = response.text();

    // Clean up response - remove markdown code blocks if present
    text = text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    const extractedData = JSON.parse(text);

    return {
      success: true,
      data: extractedData,
      rawResponse: text,
    };
  } catch (error) {
    //Handle specific error types
    if (error instanceof SyntaxError) {
      return {
        success: false,
        error: "Invalid JSON response from GEMINI",
        details: error.message,
      };
    }

    return {
      success: false,
      error: "Extraction failed",
      details: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

//Load prompt from file
export async function loadPrompt(promptPath: string): Promise<string> {
  try {
    const prompt = await fs.readFile(promptPath, "utf-8");
    return prompt;
  } catch (error) {
    throw new Error(
      `Failed to load prompt from ${promptPath}: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

// Validate Gemini API key
export function validateApiKey(): boolean {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set in environment variables.");
  }
  return true;
}
