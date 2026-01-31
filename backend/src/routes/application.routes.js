import express from "express";
import requireAuth from "../middlewares/requireAuth.js";
import {
  createApplication,
  generateEmailForApplication,
} from "../controllers/applicationController.js";

const router = express.Router();

// Save JD
router.post("/", requireAuth, createApplication);

// Generate email using AI
router.post("/:id/generate", requireAuth, generateEmailForApplication);

export default router;
