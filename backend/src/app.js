import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

/* ===============================
   ENV SETUP (MUST BE FIRST)
================================ */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

/* ===============================
   NOW SAFE TO IMPORT EVERYTHING
================================ */
import "./config/passport.js";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./db/mongoose.js";
import authRoutes from "./routes/auth.routes.js";
import profileSetupRoutes from "./routes/profileSetup.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import aiRoutes from "./routes/ai.routes.js";

/* ===============================
   APP INIT
================================ */
const app = express();

/* ===============================
   TRUST PROXY
================================ */
app.set("trust proxy", 1);

/* ===============================
   CORS
================================ */
app.use(
  cors({
    origin: "https://aplica-2-0.vercel.app",
    credentials: true,
  })
);

/* ===============================
   PARSERS
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
app.use("/api/ai", aiRoutes);

/* ===============================
   HEALTH CHECK
================================ */
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
  });
});

app.get("/", (req, res) => {
  res.send("🚀 Aplica Backend is running");
});

/* ===============================
   GLOBAL ERROR HANDLER
================================ */
app.use((err, req, res, next) => {
  console.error("🔥 Global Error:", err);

  if (err.type === "entity.too.large") {
    return res.status(413).json({ message: "Payload too large (max 25MB)" });
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
