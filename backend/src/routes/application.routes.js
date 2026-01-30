import express from "express";
import auth from "../middlewares/auth.middleware.js";
import Application from "../models/Application.js";

const router = express.Router();

/* =====================================
   CREATE APPLICATION (SAVE JD)
===================================== */
router.post("/", auth, async (req, res) => {
  try {
    const { jobDescription } = req.body;

    if (!jobDescription || !jobDescription.trim()) {
      return res.status(400).json({
        message: "Job description is required",
      });
    }

    const application = await Application.create({
      user: req.user._id,
      jobDescription,
      status: "draft",
    });

    res.status(201).json({
      success: true,
      application,
    });
  } catch (err) {
    console.error("Save JD failed:", err);
    res.status(500).json({
      message: "Failed to save job description",
    });
  }
});

/* =====================================
   GET USER APPLICATIONS (DRAFT / PREVIEW)
===================================== */
router.get("/", auth, async (req, res) => {
  try {
    const applications = await Application.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(applications);
  } catch (err) {
    console.error("Fetch applications failed:", err);
    res.status(500).json({
      message: "Failed to fetch applications",
    });
  }
});

export default router;
