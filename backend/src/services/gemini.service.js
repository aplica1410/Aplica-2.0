import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateEmailFromJD(jd, extractedEmail) {
  const model = genAI.getGenerativeModel({
    model: "models/gemini-1.5-flash",
  });

  const prompt = `
Write a professional job application email.

Job Description:
${jd}

Target Email:
${extractedEmail || "Not provided"}

Return JSON with:
{
  "subject": "...",
  "body": "..."
}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  return JSON.parse(text);
}
