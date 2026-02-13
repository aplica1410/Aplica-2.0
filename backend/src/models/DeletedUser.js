import mongoose from "mongoose";

const deletedUserSchema = new mongoose.Schema(
  {
    originalUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: String,
    deletedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("DeletedUser", deletedUserSchema);
