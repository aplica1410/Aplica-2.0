import Application from "../models/Application.js";
import UsageCounter from "../models/UsageCounter.js";
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
  try {
    const data = await generateEmailFromJD(req.params.id);
    res.json({ success: true, data });
  } catch (err) {
    console.error("Generate email error:", err);
    res.status(500).json({ message: "Failed to generate email" });
  }
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
   SEND EMAIL (Legacy route – optional)
================================ */
export const sendApplicationEmail = async (req, res) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = "sent";
    await application.save();

    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send email" });
  }
};

/* ===============================
   DASHBOARD STATS (UPDATED)
================================ */
export const getDashboardStats = async (req, res) => {
  try {
    const TEST_EMAIL_LIMIT = 20;

    // 🔎 Get usage record (DO NOT CREATE NEW ONE)
    const usage = await UsageCounter.findOne({
      userId: req.user._id,
    });

    const sent = usage ? usage.totalCount : 0;
    const remaining = TEST_EMAIL_LIMIT - sent;

    const draft = await Application.countDocuments({
      user: req.user._id,
      status: "draft",
    });

    res.json({
      sent,
      draft,
      remaining,
      limit: TEST_EMAIL_LIMIT,
    });

  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ message: "Failed to load dashboard stats" });
  }
};

