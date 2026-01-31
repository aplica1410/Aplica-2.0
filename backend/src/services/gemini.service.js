import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateEmailFromJD = async (jobDescription, targetEmail) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
You are an assistant that writes professional job application emails.

Job Description:
${jobDescription}

Target Email:
${targetEmail}

Generate:
1. Email Subject
2. Email Body (formal, concise, professional)

Return JSON ONLY in this format:
{
  "subject": "...",
  "body": "..."
}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  // Gemini sometimes wraps JSON in ``` blocks
  const cleaned = text.replace(/```json|```/g, "").trim();

  return JSON.parse(cleaned);
};
