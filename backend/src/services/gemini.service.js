import axios from "axios";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-1.0-pro:generateContent";

/**
 * Generate email from Job Description
 */
export const generateEmailFromJD = async (jobDescription, targetEmail) => {
  try {
    const prompt = `
You are an expert job application assistant.

Write a professional cold email based on the following job description.

Job Description:
${jobDescription}

Target Email:
${targetEmail || "Not provided"}

Return JSON only in this format:
{
  "subject": "...",
  "body": "..."
}
`;

    const response = await axios.post(
      `${GEMINI_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const text =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error("Empty Gemini response");
    }

    // Gemini returns text → parse JSON safely
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");
    const cleanJson = text.substring(jsonStart, jsonEnd + 1);

    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Gemini REST Error:", error.response?.data || error.message);
    throw new Error("Failed to generate email using Gemini");
  }
};
