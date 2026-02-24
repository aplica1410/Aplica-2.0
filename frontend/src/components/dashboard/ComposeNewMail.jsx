import { useState } from "react";
import { useUser } from "../../context/UserContext";
import "../../styles/compose-new-mail.css";
import axios from "../../api/axios";
import EmailGenerationModal from "../modals/EmailGenerationModal";

const ComposeNewMail = () => {
  const { user } = useUser();

  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);

  // Modal + stage state
  const [showModal, setShowModal] = useState(false);
  const [stage, setStage] = useState("idle");
  // idle | parsed | analysing | generating | done

  const today = new Date().toDateString();

  const handleCompose = async () => {
    if (!jd.trim()) {
      alert("Please paste job description.");
      return;
    }

    try {
      setLoading(true);
      setShowModal(true);

      /* ===============================
         STAGE 1 — JD PARSED
      ================================ */
      setStage("parsed");

      // 1️⃣ Save JD
      const saveRes = await axios.post("/api/applications", {
        jobDescription: jd,
      });

      const application =
        saveRes.data?.application ?? saveRes.data;

      if (!application || !application._id) {
        throw new Error("Application ID missing from backend response");
      }

      const applicationId = application._id;

      /* ===============================
         STAGE 2 — ANALYSING
      ================================ */
      setStage("analysing");
      await new Promise((res) => setTimeout(res, 800));

      /* ===============================
         STAGE 3 — GENERATING EMAIL
      ================================ */
      setStage("generating");

      await axios.post(
        `/api/applications/${applicationId}/generate`
      );

      /* ===============================
         STAGE 4 — DONE
      ================================ */
      setStage("done");

      setJd("");

      setTimeout(() => {
        setShowModal(false);
        setStage("idle");
      }, 1200);

    } catch (err) {
      console.error("❌ Compose Error:", err);

      // 🔒 HANDLE LIMIT EXCEEDED (403)
      if (err.response?.status === 403) {
        setShowModal(false);
        setStage("idle");
        alert(
          "🚫 Your limit exceeded. You can generate up to 20 emails during testing."
        );
        return;
      }

      // Generic backend error
      setShowModal(false);
      setStage("idle");
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="compose-page">
        <h2>Apply / Compose New Mail</h2>

        <p>
          Hi,{" "}
          {user?.publicProfile?.firstName ||
            user?.email?.split("@")[0] ||
            "User"}
        </p>

        <small>📅 {today}</small>

        <div className="compose-card">
          <textarea
            placeholder="Paste job description or freelance work details (make sure to include target email address in the description for better results)"
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            disabled={loading}
          />

          <div className="compose-actions">
            <button
              onClick={handleCompose}
              disabled={loading}
            >
              {loading ? "Generating..." : "Compose New Mail"}
            </button>
          </div>
        </div>
      </div>

      {/* 🔔 Email Generation Modal */}
      <EmailGenerationModal
        isOpen={showModal}
        stage={stage}
      />
    </>
  );
};

export default ComposeNewMail;