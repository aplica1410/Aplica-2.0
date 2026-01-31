import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateEmailFromJD = async (jobDescription) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const prompt = `
You are an assistant that writes professional job application emails.

From the job description below:
1. Generate a concise email SUBJECT
2. Generate a professional EMAIL BODY (no placeholders, no markdown)

Job Description:
"""
${jobDescription}
"""

Return output strictly in JSON format:
{
  "subject": "...",
  "emailBody": "..."
}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  return JSON.parse(text);
};
