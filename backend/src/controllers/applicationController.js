import Application from "../models/Application.js";
import { generateEmailFromJD } from "../utils/gemini.js";

/**
 * Simple email regex (first valid email wins)
 */
const EMAIL_REGEX =
  /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

/* =====================================
   CREATE APPLICATION
   - Save JD
   - Extract target email
   - Generate subject + body via Gemini
   - Store in PREVIEW queue
===================================== */
export const createApplication = async (req, res) => {
  try {
    const { jobDescription } = req.body;

    if (!jobDescription || !jobDescription.trim()) {
      return res.status(400).json({
        message: "Job description is required",
      });
    }

    // 🔍 Extract first email from JD
    const emailMatch = jobDescription.match(EMAIL_REGEX);
    const extractedEmail = emailMatch ? emailMatch[0] : null;

    if (!extractedEmail) {
      return res.status(400).json({
        message: "No target email found in job description",
      });
    }

    // 🤖 Generate email using Gemini (single prompt)
    const aiResult = await generateEmailFromJD({
      jobDescription,
      extractedEmail,
    });

    if (!aiResult?.subject || !aiResult?.emailBody) {
      return res.status(500).json({
        message: "AI failed to generate email content",
      });
    }

    // 💾 Save application with preview-ready content
    const application = await Application.create({
      user: req.user._id,
      jobDescription,
      extractedEmail,
      subject: aiResult.subject,
      emailBody: aiResult.emailBody,
      status: "preview",
    });

    res.status(201).json({
      success: true,
      application,
    });
  } catch (error) {
    console.error("Create application failed:", error);
    res.status(500).json({
      message: "Failed to process application",
    });
  }
};
