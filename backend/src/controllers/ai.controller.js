export const generateEmailDraft = async (req, res) => {
  try {
    const { prompt } = req.body;

    // your AI logic here
    const emailDraft = `Generated email for: ${prompt}`;

    res.json({
      success: true,
      data: emailDraft
    });
  } catch (err) {
    console.error("AI Error:", err);
    res.status(500).json({ message: "AI generation failed" });
  }
};
