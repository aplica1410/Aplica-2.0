import Application from "../models/Application.js";
import generateEmailFromJD from "../services/ai.service.js";

export const generateEmail = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // 🧠 Call AI
    const { subject, body } = await generateEmailFromJD(
      application.jobDescription,
      application.extractedEmail
    );

    application.subject = subject;
    application.emailBody = body;
    application.status = "ready_for_preview";

    await application.save();

    res.json({
      message: "Email generated successfully",
      application,
    });
  } catch (err) {
    console.error("🔥 Generate Error:", err);
    res.status(500).json({ message: "Failed to generate email" });
  }
};
