
import { GoogleGenAI } from "@google/genai";
import { PROJECTS, DEVELOPER_INFO } from "../constants";

// Initialize Gemini with the API Key directly from environment variables as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const askGeminiAboutDeveloper = async (query: string) => {
  const portfolioContext = `
    You are an AI assistant for ${DEVELOPER_INFO.name}'s portfolio.
    Developer Role: ${DEVELOPER_INFO.role}
    Bio: ${DEVELOPER_INFO.bio}
    Projects: ${JSON.stringify(PROJECTS)}
    Answer questions about their experience and projects concisely like a Spotify recommendation.
  `;

  try {
    // Generate content using the specified model and system instructions in config
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: query,
      config: {
        systemInstruction: portfolioContext,
      }
    });
    // Access the text property of the response directly
    return response.text || "I'm not sure about that. Try asking about specific projects!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error connecting to the AI brain. Try again later.";
  }
};
