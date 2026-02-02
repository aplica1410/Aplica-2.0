import { useState } from "react";
import "../../styles/compose-new-mail.css";
import axios from "../../api/axios";

console.log("🔥 ComposeNewMail LOADED FROM:", import.meta.url);

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

console.log("RAW SAVE RESPONSE:", saveRes.data);

      // ✅ FIXED: read ID from correct location
      const application =
  saveRes.data?.application ?? saveRes.data;
  
if (!application || !application._id) {
  throw new Error("Application ID missing from backend response");
}

const applicationId = application._id;

console.log("SAVE RESPONSE:", saveRes.data);
      console.log("APPLICATION ID:", applicationId);  

      // 2️⃣ GENERATE EMAIL (AI)
      await axios.post(`/api/applications/${applicationId}/generate`);

      setJd("");
      alert("Email generated and added to preview");

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
