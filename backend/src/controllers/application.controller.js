import Application from "../models/application.model.js";

/* ===============================
   CREATE APPLICATION (SAVE JD)
================================ */
export const createApplication = async (req, res) => {
  try {
    const { jobDescription } = req.body;

    if (!jobDescription) {
      return res.status(400).json({ message: "Job description is required" });
    }

    // 🔍 Extract email from JD
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

    res.status(201).json({
      message: "JD saved successfully",
      application,
    });

  } catch (err) {
    console.error("🔥 Create Application Error:", err);
    res.status(500).json({ message: "Failed to save JD" });
  }
};

/* ===============================
   GENERATE EMAIL FROM JD
================================ */
export const generateEmailFromJD = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // 🧠 TEMP AI LOGIC (replace with LLM later)
    const subject = "Application for Relevant Position";

    const emailBody = `
Dear Hiring Manager,

I hope this email finds you well.

I am writing to apply for the opportunity described. Based on the job requirements and my skills, I believe I would be a strong fit.

Please let me know if you would like to discuss further.

Best regards,  
${req.user.email}
`;

    application.subject = subject;
    application.emailBody = emailBody;
    application.status = "ready_for_preview";

    await application.save();

    res.status(200).json({
      message: "Email generated successfully",
      application,
    });

  } catch (err) {
    console.error("🔥 Generate Email Error:", err);
    res.status(500).json({ message: "Failed to generate email" });
  }
};
