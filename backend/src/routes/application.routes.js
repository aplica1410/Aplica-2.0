import express from "express";
import requireAuth from "../middlewares/requireAuth.js";
import {
  createApplication,
  generateEmailForApplication,
  getApplicationById,
  sendApplicationEmail,
} from "../controllers/application.controller.js";

const router = express.Router();

router.get("/", requireAuth, getUserApplications); // ✅ ADD THIS
router.post("/", requireAuth, createApplication);
router.post("/:id/generate", requireAuth, generateEmailForApplication);
router.get("/:id", requireAuth, getApplicationById);
router.post("/:id/send", requireAuth, sendApplicationEmail);

export default router;
