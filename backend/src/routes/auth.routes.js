import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import requireAuth from "../middlewares/requireAuth.js";
import User from "../models/User.js";

const router = express.Router();

/**
 * Start Google OAuth
 */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

/**
 * Google OAuth callback
 */
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/auth`,
    session: false,
  }),
  async (req, res) => {
    try {
      const { email, googleId, avatar } = req.user;

      let user = await User.findOne({ email });

      if (!user) {
        user = await User.create({
          email,
          googleId,
          avatar,
          profileComplete: false,
        });
      }

      // ✅ SAME PAYLOAD
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      // ✅ SAME COOKIE
      res.cookie("aplica_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
    } catch (err) {
      console.error("OAuth callback error:", err);
      res.redirect(`${process.env.FRONTEND_URL}/auth`);
    }
  }
);

/**
 * Get logged-in user
 */
router.get("/me", requireAuth, (req, res) => {
  res.status(200).json(req.user);
});

export default router;
