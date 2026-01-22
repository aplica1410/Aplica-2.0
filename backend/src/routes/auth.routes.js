import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import authMiddleware from "../middlewares/auth.middleware.js";

console.log("🔥 auth.routes.js LOADED");

const router = express.Router();

/**
 * Start Google OAuth
 */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    accessType: "offline",
    prompt: "consent",
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
  (req, res) => {
    if (!process.env.FRONTEND_URL) {
      return res.status(500).json({ message: "FRONTEND_URL not configured" });
    }

    const token = jwt.sign(
      {
        googleId: req.user.googleId,
        email: req.user.email,
        name: req.user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("aplica_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect(`${process.env.FRONTEND_URL}/dashboard/home`);
  }
);

/**
 * Get logged-in user
 */
router.get("/me", authMiddleware, (req, res) => {
  res.status(200).json({
    user: req.user,
  });
});

export default router;
