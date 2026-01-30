// models/Application.js
import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    extractedEmail: String,
    generatedEmail: String,
    status: {
      type: String,
      enum: ["draft", "preview", "sent"],
      default: "draft",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
