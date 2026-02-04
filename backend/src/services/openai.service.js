import OpenAI from "openai";

export const generateFreelanceEmail = async ({ jobDescription }) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
  const prompt = `
You are an expert freelance professional writing cold outreach emails.

TASK:
Analyze the following freelance job description and generate a professional,
friendly, confident, and persuasive email expressing interest in working on this project.

REQUIREMENTS:
- Email length: 10–12 lines
- Tone: professional, friendly, confident, persuasive
- Adapt skills automatically based on JD
- Assume the candidate is an experienced freelancer
- Do NOT mention AI
- Do NOT copy JD text directly

OUTPUT FORMAT (STRICT JSON):
{
  "subject": "Email subject line",
  "emailBody": "Email body text"
}

FREELANCE JOB DESCRIPTION:
"""
${jobDescription}
"""
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      { role: "system", content: "You write high-quality freelance outreach emails." },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
  });

  const raw = response.choices[0].message.content;

  return JSON.parse(raw);
};
