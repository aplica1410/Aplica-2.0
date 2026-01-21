import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import planMiddleware from "../middlewares/plan.middleware.js";
const router = express.Router();


router.get(
  '/send-test',
  authMiddleware,
  planMiddleware,
  async (req, res) => {
    res.json({
      success: true,
      message: 'Plan validation passed',
      usage: {
        dailyUsed: req.usage.dailyCount,
        monthlyUsed: req.usage.monthlyCount
      }
    });
  }
);

export default router;
