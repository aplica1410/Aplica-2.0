import UsageCounter from "../models/UsageCounter.js";
import plans from "../config/plans.js";

const planMiddleware = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user || !user.plan) {
      return res.status(401).json({ error: "Unauthorized or plan missing" });
    }

    const plan = plans[user.plan];

    if (!plan) {
      return res.status(400).json({ error: "Invalid plan" });
    }

    const today = new Date().toISOString().split("T")[0];

    let usage = await UsageCounter.findOne({
      userId: user._id,
      date: today
    });

    if (!usage) {
      usage = await UsageCounter.create({
        userId: user._id,
        date: today,
        dailyCount: 0,
        monthlyCount: 0
      });
    }

    // 🔒 Enforce limits
    if (usage.dailyCount >= plan.daily) {
      return res.status(429).json({
        error: "Daily email limit reached"
      });
    }

    if (usage.monthlyCount >= plan.monthly) {
      return res.status(429).json({
        error: "Monthly email limit reached"
      });
    }

    // Attach usage for controller to increment later
    req.usage = usage;

    next();
  } catch (err) {
    console.error("Plan middleware error:", err);
    res.status(500).json({ error: "Plan validation failed" });
  }
};

export default planMiddleware;
