import "./config/passport.js";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./db/mongoose.js";
import authRoutes from "./routes/auth.routes.js";
import profileSetupRoutes from "./routes/profileSetup.routes.js";
import applicationRoutes from "./routes/application.routes.js";

/* ===============================
   ENV SETUP
================================ */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

/* ===============================
   APP INIT
================================ */
const app = express();

/* ===============================
   TRUST PROXY (REQUIRED FOR RENDER)
================================ */
app.set("trust proxy", 1);

/* ===============================
   CORS (ABSOLUTELY CORRECT)
================================ */
app.use(
  cors({
    origin: "https://aplica-2-0.vercel.app", // ❌ NO trailing slash
    credentials: true,
  })
);

/* ===============================
   BODY & COOKIE PARSERS
================================ */
app.use(cookieParser());

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));

/* ===============================
   DATABASE
================================ */
connectDB();

/* ===============================
   ROUTES
================================ */
app.use("/auth", authRoutes);
app.use("/api/profile-setup", profileSetupRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/applications", applicationRoutes);

/* ===============================
   HEALTH CHECK
================================ */
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
  });
});

/* ===============================
   BASIC ROOT CHECK
================================ */
app.get("/", (req, res) => {
  res.send("🚀 Aplica Backend is running");
});

/* ===============================
   GLOBAL ERROR HANDLER
================================ */
app.use((err, req, res, next) => {
  console.error("🔥 Global Error:", err);

  if (err.type === "entity.too.large") {
    return res.status(413).json({
      message: "Payload too large (max 25MB)",
    });
  }

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

/* ===============================
   SERVER START
================================ */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
