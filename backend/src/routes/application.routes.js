import express from "express";
import auth from "../middlewares/auth.middleware.js";
import Application from "../models/Application.js";
import {
  createApplication,
  generateEmailFromJD,
} from "../controllers/application.controller.js";

const router = express.Router();

/* =====================================
   CREATE APPLICATION
   - Saves JD
   - Extracts email
   - Auto generates AI email (preview)
===================================== */
router.post("/", auth, createApplication);

/* =====================================
   GET USER APPLICATIONS
   - draft / preview / sent
===================================== */
router.get("/", auth, async (req, res) => {
  try {
    const applications = await Application.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error("Fetch applications failed:", error);
    res.status(500).json({
      message: "Failed to fetch applications",
    });
  }
});

/* =====================================
   GENERATE EMAIL VIA AI (GEMINI)
   - Manual regenerate / retry
===================================== */
router.post(
  "/:applicationId/generate",
  auth,
  generateEmailDraft
);

router.post("/:id/generate", protect, generateEmailFromJD);


export default router;
