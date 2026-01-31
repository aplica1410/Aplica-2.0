import Application from "../models/Application.js";

/**
 * Simple email regex
 */
const EMAIL_REGEX =
  /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

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
