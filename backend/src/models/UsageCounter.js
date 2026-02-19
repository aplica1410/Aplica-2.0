import mongoose from "mongoose";

const usageCounterSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one record per user
    },

    totalCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const UsageCounter = mongoose.model("UsageCounter", usageCounterSchema);

export default UsageCounter;
