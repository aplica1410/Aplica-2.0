import express from "express";
import auth from "../middlewares/auth.middleware.js";
import User from "../models/User.js";

const router = express.Router();

/**
 * Get current logged-in user
 * GET /api/user/me
 */
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      user
    });
  } catch (err) {
    console.error("Get user error:", err);
    res.status(500).json({ message: "Failed to fetch user" });
  }
});

export default router;
