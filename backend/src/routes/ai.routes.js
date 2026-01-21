import express from "express";

import authMiddleware from "../middlewares/auth.middleware.js";
import planMiddleware from "../middlewares/plan.middleware.js";
import { generateEmailDraft } from "../controllers/ai.controller.js";

const router = express.Router();

router.post(
  "/generate-email",
  authMiddleware,
  planMiddleware,
  generateEmailDraft
);

export default router;
