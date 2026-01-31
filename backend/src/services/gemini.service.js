import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateEmailFromJD = async ({
  jobDescription,
  extractedEmail,
}) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const prompt = `
You are an expert job application assistant.

Using the following job description, generate:
1. A professional email SUBJECT
2. A concise, polite EMAIL BODY suitable for applying to the role

Rules:
- Do NOT include markdown
- Do NOT include explanations
- Keep tone professional and confident
- Email must be addressed to ${extractedEmail}

Respond strictly in this JSON format:
{
  "subject": "...",
  "emailBody": "..."
}

Job Description:
"""
${jobDescription}
"""
`;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();

  // Parse JSON safely
  try {
    return JSON.parse(responseText);
  } catch (err) {
    console.error("Gemini JSON parse failed:", responseText);
    throw new Error("AI response parsing failed");
  }
};
