import Application from "../models/Application.js";
import { generateEmailFromJD } from "../services/gemini.service.js";
import { generateEmailFromJD } from "../services/gemini.service.js";


// SAVE JD
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

    res.status(201).json(application);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save JD" });
  }
};

// GENERATE EMAIL
export const generateEmailForApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    const aiResult = await generateEmailFromJD(
      application.jobDescription,
      application.extractedEmail
    );

    application.subject = aiResult.subject;
    application.emailBody = aiResult.body;
    application.status = "preview";

    await application.save();

    res.json({ application });
  } catch (err) {
    console.error("Generate email error:", err.message);
    res.status(500).json({ message: "Failed to generate email" });
  }
};

