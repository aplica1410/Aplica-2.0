import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

import ApplyHeader from "../components/apply/ApplyHeader";
import JobDescription from "../components/apply/JobDescription";
import EmailPreview from "../components/apply/EmailPreview";

import "../styles/apply.css";

const Apply = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [application, setApplication] = useState(null);

  // JD
  const [jdText, setJdText] = useState("");

  // Email fields (editable)
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

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
    try {
      await axios.post(`/api/applications/${id}/send`, {
        to,
        subject,
        body,
      });

      alert("✅ Email sent successfully");
    } catch (err) {
      console.error("❌ Send failed", err);
      alert("Failed to send email");
    }
  };

  if (loading) return <p className="loading-text">Loading application...</p>;
  if (!application) return <p>Application not found</p>;

  return (
    <div className="apply-page">
      <ApplyHeader />

      <div className="apply-grid">
        {/* LEFT — JD */}
        <div className="apply-left">
          <JobDescription jdText={jdText} setJdText={setJdText} />
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
            onSend={handleSend}
          />
        </div>
      </div>
    </div>
  );
};

export default Apply;
