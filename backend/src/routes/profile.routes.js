import express from "express";
import auth from "../middlewares/auth.middleware.js";
import User from "../models/User.js";

const router = express.Router();

/* ==============================
   GET PROFILE
============================== */
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    res.json({
      profile: user
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

/* ==============================
   UPDATE PROFILE
============================== */
router.post("/update", auth, async (req, res) => {
  try {
    const userId = req.user._id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true }
    );

    res.json({ user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: "Profile update failed" });
  }
});

/* ==============================
   PROFILE COMPLETE
============================== */
router.post("/complete", auth, async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    profileComplete: true
  });

  res.json({ success: true });
});

export default router;