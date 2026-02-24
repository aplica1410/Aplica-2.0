import Application from "../models/Application.js";
import UsageCounter from "../models/UsageCounter.js";
import User from "../models/User.js";
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
   GENERATE EMAIL USING AI (UPDATED)
================================ */
export const generateEmailForApplication = async (req, res) => {
  try {
    const TEST_EMAIL_LIMIT = 20;

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // 🔒 COUNT TOTAL USED (draft + sent)
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
        message: "Your limit exceeded. Maximum 20 emails allowed during testing.",
      });
    }

    // 🔥 FETCH USER
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userProfile = {
      firstName: user.publicProfile?.firstName || "",
      lastName: user.publicProfile?.lastName || "",
      role: user.professionalInfo?.role || "",
      headline: user.professionalInfo?.headline || "",
      experienceYears: user.professionalInfo?.experience?.years || 0,
      experienceMonths: user.professionalInfo?.experience?.months || 0,
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

    return res.json({
      success: true,
      data,
      remaining: TEST_EMAIL_LIMIT - (totalUsed + 1),
    });

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
   DASHBOARD STATS (Option A logic)
================================ */
export const getDashboardStats = async (req, res) => {
  try {
    const TEST_EMAIL_LIMIT = 20;

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
