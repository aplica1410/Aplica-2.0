import { google } from "googleapis";
import User from "../models/User.js";
import Application from "../models/Application.js";
import UsageCounter from "../models/UsageCounter.js";

const TEST_EMAIL_LIMIT = 20;

export const sendEmail = async (req, res) => {
  try {
    const { applicationId, to, subject, body } = req.body;

    if (!applicationId) {
      return res.status(400).json({
        message: "Application ID required",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user || !user.accessToken) {
      return res.status(401).json({
        message: "Gmail not connected",
      });
    }

    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    /* ===============================
       🔒 CHECK TESTING LIMIT
    ================================ */

    let usage = await UsageCounter.findOne({ userId: user._id });

    if (!usage) {
      usage = await UsageCounter.create({
        userId: user._id,
        totalCount: 0,
      });
    }

    if (usage.totalCount >= TEST_EMAIL_LIMIT) {
      return res.status(403).json({
        message: "Testing limit of 20 emails reached.",
      });
    }

    /* ===============================
       GMAIL SETUP
    ================================ */

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    oauth2Client.setCredentials({
      access_token: user.accessToken,
      refresh_token: user.refreshToken,
    });

    const gmail = google.gmail({
      version: "v1",
      auth: oauth2Client,
    });

    const message = [
      `From: ${user.email}`,
      `To: ${to}`,
      `Subject: ${subject}`,
      "Content-Type: text/plain; charset=utf-8",
      "",
      body,
    ].join("\n");

    const encodedMessage = Buffer.from(message)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
      },
    });

    /* ===============================
       ✅ INCREMENT USAGE AFTER SUCCESS
    ================================ */

    usage.totalCount += 1;
    await usage.save();

    /* ===============================
       UPDATE APPLICATION STATUS
    ================================ */

    application.status = "sent";
    application.sentAt = new Date();
    await application.save();

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
      remaining: TEST_EMAIL_LIMIT - usage.totalCount,
    });

  } catch (error) {
    console.error("🔥 Send Email Error:", error);
    return res.status(500).json({
      message: "Email sending failed",
    });
  }
};
