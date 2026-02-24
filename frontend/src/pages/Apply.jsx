import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";

import ApplyHeader from "../components/apply/ApplyHeader";
import JobDescription from "../components/apply/JobDescription";
import EmailPreview from "../components/apply/EmailPreview";

import "../styles/apply.css";

const Apply = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [application, setApplication] = useState(null);
  const [isSent, setIsSent] = useState(false); // 🔥 NEW

  // JD
  const [jdText, setJdText] = useState("");

  // Email fields
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  // Success modal state
  const [showSuccess, setShowSuccess] = useState(false);

  /* ===============================
     FETCH APPLICATION BY ID
  ================================ */
  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await axios.get(`/api/applications/${id}`);
        const app = res.data.application;

        setApplication(app);

        setJdText(app.jobDescription || "");
        setTo(app.extractedEmail || "");
        setSubject(app.subject || "");
        setBody(app.emailBody || "");

        if (app.status === "sent") {
          setIsSent(true); // 🔥 if already sent
        }
      } catch (err) {
        console.error("❌ Failed to load application", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  /* ===============================
     SEND EMAIL
  ================================ */
  const handleSend = async () => {
    if (!to || !subject || !body) {
      alert("Please complete email fields before sending");
      return;
    }

    try {
      setSending(true);

      const res = await axios.post("/api/applications/send", {
        applicationId: id,
        to,
        subject,
        body,
      });

      if (res.data?.success) {
        setIsSent(true);          // 🔥 remove send button
        setShowSuccess(true);     // 🔥 show modal
      } else {
        throw new Error("Email not sent");
      }
    } catch (err) {
      console.error("❌ Send failed", err);
      alert("Failed to send email");
    } finally {
      setSending(false);
    }
  };

  if (loading)
    return <p className="loading-text">Loading application...</p>;

  if (!application)
    return <p>Application not found</p>;

  return (
    <div className="apply-page">
      <ApplyHeader />

      <div className="apply-grid">
        {/* LEFT — JD */}
        <div className="apply-left">
          <JobDescription
            jdText={jdText}
            setJdText={setJdText}
          />
        </div>

        {/* RIGHT — EMAIL */}
        <div className="apply-right">
          <EmailPreview
            to={to}
            subject={subject}
            body={body}
            setTo={setTo}
            setSubject={setSubject}
            setBody={setBody}
            onSend={!isSent ? handleSend : null}   // 🔥 remove send action
            sending={sending}
            isSent={isSent}                        // 🔥 pass status
          />
        </div>
      </div>

      {/* ===============================
         SUCCESS MODAL
      ================================ */}
      {showSuccess && (
        <div className="success-modal-overlay">
          <div className="success-modal">
            <h3>✅ Email Sent Successfully</h3>
            <button
              onClick={() => {
                setShowSuccess(false);
                navigate("/dashboard/applications"); // 🔥 redirect
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Apply;