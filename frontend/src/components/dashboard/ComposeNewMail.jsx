import { useState } from "react";
import "../../styles/compose-new-mail.css";
import api from "../../api/axios"; // ✅ USE API INSTANCE

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

      // 1️⃣ SAVE JD
const saveRes = await axios.post("/api/applications", {
  jobDescription: jd,
});

// ✅ FIX HERE
const applicationId = saveRes.data.application._id;

// Generate email
await axios.post(`/api/applications/${applicationId}/generate`);


      setJd("");
      alert("Email generated successfully");

    } catch (err) {
      console.error("Compose Error:", err);
      alert("Failed to process JD");
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
            {loading ? "Generating..." : "Compose New Mail"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComposeNewMail;
