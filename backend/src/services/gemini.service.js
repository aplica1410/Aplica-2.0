import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateEmailFromJD = async (jd, email) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.5-flash", // ✅ WORKING MODEL
    });

    const prompt = `
You are a professional job application assistant.

Job Description:
${jd}

Target Email:
${email || "Not provided"}

Generate:
1. A professional email subject
2. A concise, confident email body
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // very simple split (safe)
    const [subjectLine, ...bodyLines] = text.split("\n");

    return {
      subject: subjectLine.replace(/subject:/i, "").trim(),
      body: bodyLines.join("\n").trim(),
    };
  } catch (err) {
    console.error("🔥 Gemini Error:", err);
    throw err;
  }
};
