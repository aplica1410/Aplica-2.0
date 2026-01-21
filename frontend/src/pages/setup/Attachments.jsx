import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Attachments.css";

// icons
import attachmentIcon from "../../assets/attachment.svg";
import logo from "../../assets/logo.svg";

const Attachments = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if (!allowedTypes.includes(selected.type)) {
      alert("Only PDF or Word documents are allowed");
      return;
    }

    if (selected.size > 5 * 1024 * 1024) {
      alert("File size must be under 5MB");
      return;
    }

    setFile(selected);
  };

  const handleFinish = async () => {
    try {
      setLoading(true);

      // 🔒 TEMP: Skip upload, just complete setup
      const token = localStorage.getItem("aplica_token");

      await fetch("http://localhost:5000/api/profile-setup/complete", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      navigate("/dashboard/home");
    } catch (err) {
      console.error("Finish setup failed:", err);
      alert("Failed to complete setup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="attachment-page">
      <img src={logo} alt="Applica" className="attachment-logo" />

      <h2>Attachment</h2>
      <p className="subtitle">
        Add any document you want to be attached in your mails
      </p>

      {/* Upload Box */}
      <div className="upload-box" onClick={handleFileClick}>
        <img src={attachmentIcon} alt="Upload" />
        <p className="upload-title">
          {file ? file.name : "Upload resume or any document"}
        </p>
        <span className="upload-hint">
          PDF, DOC, case study or notes (optional)
        </span>

        <input
          type="file"
          ref={fileInputRef}
          hidden
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />
      </div>

      {/* Optional Note */}
      <div className="note-section">
        <label>Optional Note</label>
        <textarea
          placeholder="Anything else you want Applica to know?"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <button onClick={handleFinish} disabled={loading}>
        {loading ? "Finishing..." : "Finish Setup"}
      </button>
    </div>
  );
};

export default Attachments;
