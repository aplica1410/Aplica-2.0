import express from "express";
import requireAuth from "../middlewares/requireAuth.js";
import { sendEmail } from "../controllers/sendEmail.controller.js";

import {
  createApplication,
  generateEmailForApplication,
  getUserApplications,          // ✅ ADD THIS
  getApplicationById,            // ✅ ADD THIS
  getDashboardStats,         // ✅ ADD THIS
} from "../controllers/application.controller.js";

const router = express.Router();

// 📌 CREATE + LIST
router.post("/", requireAuth, createApplication);
router.get("/", requireAuth, getUserApplications);

// 📌 PREVIEW
router.get("/:id", requireAuth, getApplicationById);

// 📌 AI GENERATE
router.post("/:id/generate", requireAuth, generateEmailForApplication);

//DASHBOARD ROUTES
router.get("/stats/dashboard", requireAuth, getDashboardStats);

// SEND EMAIL
router.post("/send", requireAuth, sendEmail);

export default router;
