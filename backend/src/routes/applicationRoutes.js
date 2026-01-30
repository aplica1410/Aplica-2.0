// routes/applicationRoutes.js
import express from "express";
import { createApplication } from "../controllers/applicationController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createApplication);

export default router;
