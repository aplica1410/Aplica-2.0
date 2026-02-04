import express from "express";
import { generateEmailFromJD } from "../services/aiEmail.service.js";

const router = express.Router();

router.post("/generate-email/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await generateEmailFromJD(id);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
