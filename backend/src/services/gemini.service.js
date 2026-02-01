import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateEmailFromJD = async (jobDescription, extractedEmail) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash", // ✅ FIXED MODEL
  });

  const prompt = `
You are an expert job application assistant.

Job Description:
${jobDescription}

Target Email:
${extractedEmail || "Not provided"}

Generate:
1. A professional email subject
2. A concise, confident email body

Respond in JSON only like:
{
  "subject": "...",
  "body": "..."
}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  // Gemini sometimes returns markdown — normalize
  const cleaned = text.replace(/```json|```/g, "").trim();

  return JSON.parse(cleaned);
};
