import express from "express";
import requireAuth from "../middlewares/requireAuth.js";
import {
  createApplication,
  generateEmailForApplication,
} from "../controllers/application.controller.js"; // ✅ FIXED

const router = express.Router();

router.post("/", requireAuth, createApplication);
router.post("/:id/generate", requireAuth, generateEmailForApplication);

export default router;
