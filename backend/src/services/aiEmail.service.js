const OpenAI = require('openai');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function generateEmail({ jobDescription, tone }) {
  const prompt = `
You are an experienced freelancer applying for a job.

Job Description:
"""
${jobDescription}
"""

Instructions:
- Write a ${tone} job application email
- Sound human and natural
- Do NOT use generic phrases
- Do NOT repeat sentences
- Keep it concise (150–200 words)
- End politely

Return JSON strictly in this format:
{
  "subject": "...",
  "email": "..."
}
`;

  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You write human-like job application emails.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.9
  });

  return JSON.parse(response.choices[0].message.content);
}

module.exports = { generateEmail };
