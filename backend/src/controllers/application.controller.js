import Application from "../models/Application.js";
import { generateEmailFromJD } from "../services/aiEmail.service.js";

/**
 * Save JD
 */
export const createApplication = async (req, res) => {
  try {
    const { jobDescription } = req.body;

    if (!jobDescription) {
      return res.status(400).json({ message: "Job description required" });
    }

    const emailMatch = jobDescription.match(
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
    );

    const extractedEmail = emailMatch ? emailMatch[0] : null;

    const application = await Application.create({
      user: req.user._id,
      jobDescription,
      extractedEmail,
      status: "draft",
    });

    res.status(201).json({ application });
  } catch (err) {
    console.error("Create application error:", err);
    res.status(500).json({ message: "Failed to save JD" });
  }
};

/**
 * Generate email using OpenAI (from JD)
 */
export const generateEmailForApplication = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔥 Single responsibility:
    // Service handles AI + DB update
    const result = await generateEmailFromJD(id);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error("Generate email error:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Failed to generate email",
    });
  }
};
