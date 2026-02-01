import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateEmailFromJD = async (jobDescription, extractedEmail) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.5-flash", // ✅ SUPPORTED
    });

    const prompt = `
You are an expert job application email writer.

Job Description:
${jobDescription}

Target Email:
${extractedEmail || "Not provided"}

Write:
1. A professional subject line
2. A concise, polite job application email body

Return JSON strictly in this format:
{
  "subject": "...",
  "body": "..."
}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Extract JSON safely
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid AI response format");
    }

    return JSON.parse(jsonMatch[0]);
  } catch (err) {
    console.error("Gemini generation error:", err);
    throw err;
  }
};
