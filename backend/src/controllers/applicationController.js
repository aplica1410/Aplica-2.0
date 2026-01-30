// controllers/applicationController.js
import Application from "../models/Application.js";

export const createApplication = async (req, res) => {
  try {
    const userId = req.user._id; // from auth middleware
    const { jobDescription } = req.body;

    const application = await Application.create({
      userId,
      jobDescription,
      status: "draft",
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: "Failed to save JD" });
  }
};
