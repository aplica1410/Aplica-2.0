import { useState } from "react";
import "../../styles/compose-new-mail.css";
import axios from "../../api/axios";

const ComposeNewMail = () => {
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);

  const today = new Date().toDateString();

  const handleCompose = async () => {
    if (!jd.trim()) {
      alert("Please paste job description");
      return;
    }

    try {
      setLoading(true);

      await axios.post("/api/applications", {
        jobDescription: jd,
      });

      setJd("");
      alert("JD saved successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to save JD");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="compose-page">
      <h2>Apply / Compose New Mail</h2>
      <p>Hi, Ujjwal</p>
      <small>📅 {today}</small>

      <div className="compose-card">
        <textarea
          placeholder="Paste Job Description (Make sure it has target email id)"
          value={jd}
          onChange={(e) => setJd(e.target.value)}
        />

        <div className="compose-actions">
          <button onClick={handleCompose} disabled={loading}>
            {loading ? "Saving..." : "Compose New Mail"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComposeNewMail;
