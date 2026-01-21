import express from "express";
import auth from "../middlewares/auth.middleware.js";

import {
  connectGmail,
  gmailCallback,
  sendTestEmail,
} from "../controllers/gmail.controller.js";

const router = express.Router();

router.get("/connect", auth, connectGmail);
router.get("/callback", auth, gmailCallback);
router.post("/send", auth, sendTestEmail);

export default router;
