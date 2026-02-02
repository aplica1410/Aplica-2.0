import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateEmailFromJD = async (jd, email) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-pro", // ✅ FREE + STABLE
  });

  const prompt = `
Write a professional job application email.

Job Description:
${jd}

Recipient Email:
${email || "Not provided"}

Return:
- Subject
- Email body
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  return {
    subject: "Application for Opportunity",
    body: text,
  };
};
