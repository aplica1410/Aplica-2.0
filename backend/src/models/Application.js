import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    jobDescription: {
      type: String,
      required: true,
    },

    extractedEmail: {
      type: String,
    },

    subject: {
      type: String,
    },

    // 🔐 SINGLE SOURCE OF TRUTH
    emailBody: {
      type: String,
    },

    status: {
      type: String,
      enum: ["draft", "generated", "sent"],
      default: "draft",
    },

    sentAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
