import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { getMe } from "../../api/auth";
import "./Attachments.css";

import logo from "../../assets/logo.svg";

const Attachments = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const BACKEND_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const [resumeLink, setResumeLink] = useState("");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  const handleFinish = async () => {
    try {
      setSaving(true);

      const res = await fetch(
        `${BACKEND_URL}/api/profile-setup/attachments`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            resumeLink: resumeLink.trim() || null,
            note: note.trim() || null
          })
        }
      );

      if (!res.ok) {
        throw new Error("Failed to complete onboarding");
      }

      const updatedUser = await getMe();
      setUser(updatedUser);

      navigate("/dashboard/home", { replace: true });
    } catch (err) {
      console.error("Finish setup failed:", err);
      alert("Failed to complete setup");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="attachment-page">
      <div className="attachment-card">
        <img src={logo} alt="Applica" className="attachment-logo" />

        <h2>Attachment</h2>
        <p className="subtitle">
          Add Your Resume’s/CV’s Link Which You Want To Be Attached In Your Mails
        </p>

        {/* Resume Link Field */}
        <div className="field">
          <input
            type="url"
            placeholder="https://drive.google.com/your-resume-link"
            value={resumeLink}
            onChange={(e) => setResumeLink(e.target.value)}
          />
        </div>

        {/* Optional Note */}
        <div className="field">
          <label>Optional Note</label>
          <textarea
            placeholder="Anything else you want Applica to know?"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <button onClick={handleFinish} disabled={saving}>
          {saving ? "Finishing..." : "Finish Setup"}
        </button>
      </div>
    </div>
  );
};

export default Attachments;