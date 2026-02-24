import Application from "../models/Application.js";
import User from "../models/User.js";
import { generateEmailFromJD } from "../services/aiEmail.service.js";

/* ======================================
   CONSTANT
====================================== */
const TEST_EMAIL_LIMIT = 20;

/* ======================================
   SAVE JD
====================================== */
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

/* ======================================
   GENERATE EMAIL (LIMIT ENFORCED)
====================================== */
export const generateEmailForApplication = async (req, res) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // 🔒 Count total used (draft + sent)
    const sentCount = await Application.countDocuments({
      user: req.user._id,
      status: "sent",
    });

    const draftCount = await Application.countDocuments({
      user: req.user._id,
      status: "draft",
    });

    const totalUsed = sentCount + draftCount;

    if (totalUsed >= TEST_EMAIL_LIMIT) {
      return res.status(403).json({
        message:
          "Your limit exceeded. Maximum 20 emails allowed during testing.",
      });
    }

    // 🔥 Fetch user profile
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userProfile = {
      firstName: user.publicProfile?.firstName || "",
      lastName: user.publicProfile?.lastName || "",
      role: user.professionalInfo?.role || "",
      headline: user.professionalInfo?.headline || "",
      experienceYears:
        user.professionalInfo?.experience?.years || 0,
      experienceMonths:
        user.professionalInfo?.experience?.months || 0,
      portfolio: user.portfolio?.portfolio || "",
      linkedin: user.portfolio?.linkedin || "",
      github: user.portfolio?.github || "",
      behance: user.portfolio?.behance || "",
      dribbble: user.portfolio?.dribbble || "",
      instagram: user.portfolio?.instagram || "",
      twitter: user.portfolio?.twitter || "",
      resume: user.attachment?.filename || "",
      additionalNote: user.attachment?.note || "",
    };

    const data = await generateEmailFromJD(
      req.params.id,
      userProfile
    );

    res.json({
      success: true,
      data,
      remaining: TEST_EMAIL_LIMIT - (totalUsed + 1),
    });
  } catch (err) {
    console.error("Generate email error:", err);
    res.status(500).json({ message: "Failed to generate email" });
  }
};

/* ======================================
   SEND SINGLE APPLICATION
====================================== */
export const sendSingleApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (application.status === "sent") {
      return res.status(400).json({ message: "Email already sent" });
    }

    // 🔥 TODO: call your Gmail sending service here

    application.status = "sent";
    await application.save();

    res.json({ success: true });
  } catch (err) {
    console.error("Send single error:", err);
    res.status(500).json({ message: "Failed to send email" });
  }
};

/* ======================================
   SEND ALL DRAFT APPLICATIONS
====================================== */
export const sendAllDraftApplications = async (req, res) => {
  try {
    const drafts = await Application.find({
      user: req.user._id,
      status: "draft",
    });

    if (!drafts.length) {
      return res.status(400).json({
        message: "No draft emails to send",
      });
    }

    for (let app of drafts) {
      // 🔥 TODO: call your Gmail sending service here

      app.status = "sent";
      await app.save();
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Send all error:", err);
    res.status(500).json({ message: "Failed to send all emails" });
  }
};

/* ======================================
   GET ALL USER APPLICATIONS
====================================== */
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

/* ======================================
   GET SINGLE APPLICATION
====================================== */
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

/* ======================================
   DASHBOARD STATS
====================================== */
export const getDashboardStats = async (req, res) => {
  try {
    const sent = await Application.countDocuments({
      user: req.user._id,
      status: "sent",
    });

    const draft = await Application.countDocuments({
      user: req.user._id,
      status: "draft",
    });

    const totalUsed = sent + draft;
    const remaining = TEST_EMAIL_LIMIT - totalUsed;

    res.json({
      sent,
      draft,
      remaining: remaining < 0 ? 0 : remaining,
      limit: TEST_EMAIL_LIMIT,
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ message: "Failed to load dashboard stats" });
  }
};