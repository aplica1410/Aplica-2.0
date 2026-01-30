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
      default: null,
    },

    subject: {
      type: String,
      default: null,
    },

    emailBody: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["draft", "preview", "sent"],
      default: "draft",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
