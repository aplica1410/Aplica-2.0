import express from "express";
import {
  createApplication,
  generateEmail,
} from "../controllers/applicationController.js";

import requireAuth from "../middlewares/requireAuth.js";

const router = express.Router();

router.post("/", requireAuth, createApplication);
router.post("/:id/generate", requireAuth, generateEmail);

export default router;
