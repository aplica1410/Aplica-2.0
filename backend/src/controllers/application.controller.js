import Application from "../models/Application.js";
import { generateEmailFromJD } from "../services/aiEmail.service.js";

/* ===============================
   SAVE JD
================================ */
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

/* ===============================
   GENERATE EMAIL USING AI
================================ */
export const generateEmailForApplication = async (req, res) => {
  const data = await generateEmailFromJD(req.params.id);
  res.json({ success: true, data });
};


/* ===============================
   GET ALL USER APPLICATIONS
================================ */
export const getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({ applications });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};

/* ===============================
   GET SINGLE APPLICATION
================================ */
export const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({ application });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch application" });
  }
};

/* ===============================
   SEND EMAIL
================================ */
export const sendApplicationEmail = async (req, res) => {
  try {
    const { to, subject, body } = req.body;

    const application = await Application.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // TODO: nodemailer integration
    application.status = "sent";
    await application.save();

    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send email" });
  }
};


export const getDashboardStats = async (req, res) => {
  try {
    const total = await Application.countDocuments({
      user: req.user._id,
    });

    const sent = await Application.countDocuments({
      user: req.user._id,
      status: "sent",
    });

    const draft = await Application.countDocuments({
      user: req.user._id,
      status: "draft",
    });

    res.json({
      sent,
      draft,
      remaining: 100 - sent, // your quota logic
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to load dashboard stats" });
  }
};
