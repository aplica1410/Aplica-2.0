import { useState } from "react";
import "../../styles/compose-new-mail.css";
import api from "../../api/axios"; // ✅ IMPORTANT

const ComposeNewMail = () => {
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCompose = async () => {
    if (!jd.trim()) {
      alert("Please paste job description");
      return;
    }

    try {
      setLoading(true);

      // ✅ CORRECT API CALL
      await api.post("/api/applications", {
        jobDescription: jd,
      });

      setJd("");
      alert("JD saved successfully");

    } catch (err) {
      console.error("Save JD error:", err);
      alert("Failed to save JD");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="compose-page">
      <h2>Apply / Compose New Mail</h2>

      <textarea
        className="compose-textarea"
        placeholder="Paste Job Description (Make sure it has target email id)"
        value={jd}
        onChange={(e) => setJd(e.target.value)}
      />

      <button
        className="primary-btn"
        onClick={handleCompose}
        disabled={loading}
      >
        {loading ? "Saving..." : "Compose New Mail"}
      </button>
    </div>
  );
};

export default ComposeNewMail;
