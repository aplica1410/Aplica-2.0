import { google } from "googleapis";
import User from "../models/User.js";
import Application from "../models/Application.js";

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
       UPDATE APPLICATION STATUS
    ================================ */
    application.status = "sent";
    application.sentAt = new Date();
    await application.save();

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });

  } catch (error) {
    console.error("🔥 Send Email Error:", error);
    return res.status(500).json({
      message: "Email sending failed",
    });
  }
};
