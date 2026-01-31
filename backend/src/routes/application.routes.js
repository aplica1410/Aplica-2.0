import express from "express";
import auth from "../middlewares/auth.middleware.js";
import {
  createApplication,
  generateEmailDraft,
} from "../controllers/applicationController.js";
import Application from "../models/Application.js";

const router = express.Router();

/* =====================================
   CREATE APPLICATION (SAVE JD)
===================================== */
router.post("/", auth, createApplication);

/* =====================================
   GET USER APPLICATIONS
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

/* =====================================
   GENERATE EMAIL VIA AI (GEMINI)
===================================== */
router.post(
  "/:applicationId/generate",
  auth,
  generateEmailDraft
);

export default router;
