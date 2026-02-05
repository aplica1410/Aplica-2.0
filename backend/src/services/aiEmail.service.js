// services/aiEmail.service.js
import Application from "../models/Application.js";
import openai from "./openai.service.js";

export const generateEmailFromJD = async (applicationId) => {
  const application = await Application.findById(applicationId);

  if (!application) {
    throw new Error("Application not found");
  }

  const prompt = `
Generate a professional job application email.

Job Description:
${application.jobDescription}

Return JSON:
{
  "subject": "...",
  "emailBody": "..."
}
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  const raw = completion.choices[0].message.content;

  const parsed = JSON.parse(raw);

  // 🔥 GUARANTEED SAVE (THIS WAS MISSING / INCONSISTENT)
  application.subject = parsed.subject;
  application.emailBody = parsed.emailBody;

  await application.save();

  return {
    subject: parsed.subject,
    emailBody: parsed.emailBody,
  };
};
