import OpenAI from "openai";

export const generateFreelanceEmail = async ({
  jobDescription,
  userProfile,
}) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const {
    firstName,
    role,
    headline,
    experienceYears,
    experienceMonths,
    portfolio,
    linkedin,
    github,
    behance,
    dribbble,
    instagram,
    twitter,
    resume,
    additionalNote,
  } = userProfile;

  const experienceText =
    experienceYears || experienceMonths
      ? `${experienceYears || 0} years${
          experienceMonths ? ` and ${experienceMonths} months` : ""
        }`
      : "";

  const prompt = `
You are an expert freelance professional writing cold outreach emails.

IMPORTANT RULES:
- If a field is empty, ignore it completely.
- Do NOT invent experience or links.
- Do NOT hallucinate.
- Mention proof of work naturally.
- End STRICTLY with:

Best regards,
${firstName}

USER PROFILE:
Name: ${firstName}
Role: ${role}
Headline: ${headline}
Experience: ${experienceText}
Portfolio: ${portfolio}
LinkedIn: ${linkedin}
GitHub: ${github}
Behance: ${behance}
Dribbble: ${dribbble}
Instagram: ${instagram}
Twitter: ${twitter}
Resume: ${resume}
Additional Info: ${additionalNote}

TASK:
Write a personalized, professional outreach email based on the job description.

REQUIREMENTS:
- 10–12 lines
- Professional, confident, persuasive
- Naturally reference experience
- Mention portfolio or links smoothly
- No emojis
- No placeholders

OUTPUT FORMAT (STRICT JSON):
{
  "subject": "Email subject line",
  "emailBody": "Email body text"
}

JOB DESCRIPTION:
"""
${jobDescription}
"""
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content:
          "You write highly personalized, professional freelance outreach emails.",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
  });

  return JSON.parse(response.choices[0].message.content);
};
