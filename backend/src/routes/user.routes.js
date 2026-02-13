import express from "express";
import auth from "../middlewares/auth.middleware.js";
import User from "../models/User.js";
import DeletedUser from "../models/DeletedUser.js";

const router = express.Router();

/**
 * GET /api/user/me
 * Get current logged-in user
 */
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (err) {
    console.error("Get user error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    });
  }
});


/**
 * DELETE /api/user/delete-account
 * Soft delete user (move to DeletedUser collection)
 */
router.delete("/delete-account", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Save to deleted accounts collection
    await DeletedUser.create({
      originalUserId: user._id,
      email: user.email,
      name: user.name,
    });

    // Delete from active users collection
    await User.findByIdAndDelete(userId);

    res.json({
      success: true,
      message: "Account deleted successfully",
    });

  } catch (err) {
    console.error("Delete account error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to delete account",
    });
  }
});

export default router;
