import express from "express";
import requireAuth from "../middlewares/requireAuth.js";
import {
  createApplication,
  generateEmailForApplication,
  getApplications, // 👈 ADD THIS
} from "../controllers/application.controller.js";

const router = express.Router();

/* Save JD */
router.post("/", requireAuth, createApplication);

/* Generate Email */
router.post("/:id/generate", requireAuth, generateEmailForApplication);

/* ✅ Fetch all applications for logged-in user */
router.get("/", requireAuth, getApplications);

export default router;
