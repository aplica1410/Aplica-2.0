import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateEmailFromJD = async (jobDescription, extractedEmail) => {
  const model = genAI.getGenerativeModel({
    model: "models/gemini-1.5-flash",
  });

  const prompt = `
Write a professional job application email.

Job Description:
${jobDescription}

Target Email:
${extractedEmail || "Not provided"}

Return JSON:
{
  "subject": "...",
  "body": "..."
}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  return JSON.parse(text.replace(/```json|```/g, "").trim());
};
