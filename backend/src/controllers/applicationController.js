import Application from "../models/Application.js";
import { generateEmailFromJD } from "../services/gemini.service.js";

/* ===============================
   SAVE JD (ALREADY WORKING)
================================ */
export const createApplication = async (req, res) => {
  try {
    const { jobDescription } = req.body;

    if (!jobDescription) {
      return res.status(400).json({ message: "JD is required" });
    }

    const emailMatch = jobDescription.match(
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/
    );

    if (!emailMatch) {
      return res.status(400).json({ message: "No email found in JD" });
    }

    const application = await Application.create({
      user: req.user._id,
      jobDescription,
      extractedEmail: emailMatch[0],
      status: "draft",
    });

    res.status(201).json(application);
  } catch (err) {
    console.error("🔥 JD Save Error:", err);
    res.status(500).json({ message: "Failed to save JD" });
  }
};

/* ===============================
   GENERATE EMAIL USING AI
================================ */
export const generateEmail = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findById(id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    const aiResult = await generateEmailFromJD(
      application.jobDescription,
      application.extractedEmail
    );

    application.subject = aiResult.subject;
    application.emailBody = aiResult.body;
    application.status = "ready_for_preview";

    await application.save();

    res.json(application);
  } catch (err) {
    console.error("🔥 AI Generate Error:", err);
    res.status(500).json({ message: "Email generation failed" });
  }
};
