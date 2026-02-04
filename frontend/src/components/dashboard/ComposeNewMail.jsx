import { useState } from "react";
import "../../styles/compose-new-mail.css";
import axios from "../../api/axios";

console.log("🔥 ComposeNewMail LOADED FROM:", import.meta.url);

const ComposeNewMail = () => {
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState("idle");
  // idle | parsed | analysing | generating | done

  const today = new Date().toDateString();

  const handleCompose = async () => {
    if (!jd.trim()) {
      alert("Please paste job description");
      return;
    }

    try {
      setLoading(true);

      /* ===============================
         STAGE 1 — JD PARSED
      ================================ */
      setStage("parsed");
      console.log("📄 JD Parsed");

      // 1️⃣ SAVE JD
      const saveRes = await axios.post("/api/applications", {
        jobDescription: jd,
      });

      const application =
        saveRes.data?.application ?? saveRes.data;

      if (!application || !application._id) {
        throw new Error("Application ID missing from backend response");
      }

      const applicationId = application._id;
      console.log("🆔 Application ID:", applicationId);

      /* ===============================
         STAGE 2 — ANALYSING
      ================================ */
      setStage("analysing");
      console.log("🧠 Analysing JD");

      // Artificial delay for UX smoothness
      await new Promise((res) => setTimeout(res, 800));

      /* ===============================
         STAGE 3 — GENERATING EMAIL
      ================================ */
      setStage("generating");
      console.log("✍️ Generating Email");

      await axios.post(`/api/ai/generate-email/${applicationId}`);

      /* ===============================
         STAGE 4 — DONE
      ================================ */
      setStage("done");
      console.log("✅ Email Generated");

      // Clear JD for next input
      setJd("");

      // Reset stage after short delay (modal later)
      setTimeout(() => {
        setStage("idle");
      }, 1000);
    } catch (err) {
      console.error("❌ Compose Error:", err);
      alert("Failed to process JD");
      setStage("idle");
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
          placeholder="Paste job description or freelance work details"
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
