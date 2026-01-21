import mongoose from "mongoose";

const usageCounterSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    date: {
      type: String, // YYYY-MM-DD
      required: true,
      index: true
    },

    dailyCount: {
      type: Number,
      default: 0
    },

    monthlyCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

usageCounterSchema.index({ userId: 1, date: 1 }, { unique: true });

const UsageCounter = mongoose.model("UsageCounter", usageCounterSchema);

export default UsageCounter;
