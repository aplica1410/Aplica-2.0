import express from "express";
import requireAuth from "../middlewares/requireAuth.js";

import {
  createApplication,
  generateEmailForApplication,
  getUserApplications,          // ✅ ADD THIS
  getApplicationById,            // ✅ ADD THIS
  sendApplicationEmail,
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

// 📌 SEND EMAIL
router.post("/:id/send", requireAuth, sendApplicationEmail);

//DASHBOARD ROUTES
router.get("/stats/dashboard", requireAuth, getDashboardStats);

export default router;
