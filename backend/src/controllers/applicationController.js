import Application from "../models/Application.js";
import { generateEmailFromJD } from "../utils/gemini.js";

/**
 * Simple email regex
 */
const EMAIL_REGEX =
  /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

/* =====================================
   CREATE APPLICATION (SAVE JD)
===================================== */
export const createApplication = async (req, res) => {
  try {
    const { jobDescription } = req.body;

    if (!jobDescription || !jobDescription.trim()) {
      return res.status(400).json({
        message: "Job description is required",
      });
    }

    // 🔥 Extract first email from JD
    const emailMatch = jobDescription.match(EMAIL_REGEX);
    const extractedEmail = emailMatch ? emailMatch[0] : null;

    const application = await Application.create({
      user: req.user._id,
      jobDescription,
      extractedEmail,
      status: "draft",
    });

    res.status(201).json({
      success: true,
      application,
    });
  } catch (error) {
    console.error("Create application failed:", error);
    res.status(500).json({
      message: "Failed to save JD",
    });
  }
};

/* =====================================
   GENERATE EMAIL (AI – GEMINI)
===================================== */
export const generateEmailDraft = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await Application.findOne({
      _id: applicationId,
      user: req.user._id,
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    // 🔥 Call Gemini
    const aiResult = await generateEmailFromJD(
      application.jobDescription
    );

    application.subject = aiResult.subject;
    application.emailBody = aiResult.emailBody;
    application.status = "preview";

    await application.save();

    res.json({
      success: true,
      subject: application.subject,
      emailBody: application.emailBody,
    });
  } catch (error) {
    console.error("AI email generation failed:", error);
    res.status(500).json({
      message: "Failed to generate email",
    });
  }
};
