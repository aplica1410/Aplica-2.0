import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    /* =====================
       Auth / Identity
    ====================== */
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    googleId: {
      type: String,
      unique: true,
      sparse: true
    },

    provider: {
      type: String,
      default: "google"
    },

    avatar: {
      type: String // google avatar OR uploaded avatar URL later
    },

    /* =====================
       Profile Completion
    ====================== */
    profileComplete: {
      type: Boolean,
      default: false
    },

    /* =====================
       Step 1: Professional Info
    ====================== */
    professionalInfo: {
      role: {
        type: String
      },
      experience: {
        type: Number // total experience in years (or years.months later)
      }
    },

    /* =====================
       Step 2: Portfolio & Socials
    ====================== */
    portfolio: {
      portfolio: String,
      linkedin: String,
      github: String,
      dribbble: String,
      behance: String,
      instagram: String,
      twitter: String
    },

    /* =====================
       Step 3: Attachments
    ====================== */
    attachment: {
      filename: String,       // stored filename
      originalName: String,   // original uploaded name
      mimeType: String,
      size: Number,
      note: String
    },

    /* =====================
       Step 4: Public Profile
    ====================== */
    publicProfile: {
      firstName: String,
      lastName: String,
      location: String,
      avatar: String // uploaded profile picture URL (future)
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("User", userSchema);
