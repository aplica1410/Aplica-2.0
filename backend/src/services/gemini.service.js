// backend/src/services/gemini.service.js

export const generateEmailFromJD = async (jobDescription, extractedEmail) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing");
  }

  const prompt = `
You are an expert job application email writer.

Write a professional cold email based on the job description below.

Rules:
- Write a clear SUBJECT
- Write a concise, confident EMAIL BODY
- Be professional, polite, and human
- If an email address is provided, address the recruiter properly

Target Email: ${extractedEmail || "Not provided"}

Job Description:
${jobDescription}

Return the response in this exact JSON format:
{
  "subject": "...",
  "body": "..."
}
`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("Gemini REST Error:", data);
    throw new Error("Failed to generate email using Gemini");
  }

  const text =
    data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (err) {
    console.error("Gemini raw text:", text);
    throw new Error("Gemini returned invalid JSON");
  }

  return {
    subject: parsed.subject,
    body: parsed.body,
  };
};
