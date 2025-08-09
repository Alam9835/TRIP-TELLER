import { GoogleGenAI } from '@google/genai';

// Initialize Gemini AI
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_GEMINI_API_KEY,
});

// Exported function to generate trip plan
export const generateTripPlan = async (FINAL_PROMPT) => {
  try {
    const response = await ai.models.generateContentStream({
      model: "gemini-2.5-pro",
      config: {
        thinkingConfig: { thinkingBudget: -1 },
        responseMimeType: "text/plain",
      },
      contents: [
        {
          role: "user",
          parts: [{ text: FINAL_PROMPT }],
        },
      ],
    });

    let result = '';
    for await (const chunk of response) {
      result += chunk.text;
    }

    console.log("AI Response:\n", result);
    return result;
  } catch (err) {
    console.error("Error in generateTripPlan:", err);
    return "Something went wrong!";
  }
};
