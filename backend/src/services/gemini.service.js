import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateEmailFromJD = async (jd, email) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
You are an expert job applicant.

Job Description:
${jd}

Target Email: ${email}

Generate:
1. Professional email subject
2. Polite and confident application email body
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  return {
    subject: "Job Application",
    body: text,
  };
};
