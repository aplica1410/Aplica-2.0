import { useEffect, useState } from "react";
import "../styles/applications.css";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

import ApplicationsHeader from "../components/applications/ApplicationsHeader";
import ApplicationsSection from "../components/applications/ApplicationsSection";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  /* ===============================
     FETCH APPLICATIONS
  ================================ */
  const fetchApplications = async () => {
    try {
      const res = await axios.get("/api/applications");
      setApplications(res.data.applications || []);
    } catch (err) {
      console.error("❌ Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  /* ===============================
     FILTER APPLICATIONS
  ================================ */
  const previewApplications = applications.filter(
    (app) =>
      !app.status || app.status === "draft" || app.status === "view"
  );

  const sentApplications = applications.filter(
    (app) => app.status === "sent"
  );

  /* ===============================
     SEND SINGLE EMAIL
  ================================ */
  const handleSendSingle = async (id) => {
    try {
      await axios.post(`/api/applications/${id}/send`);
      alert("✅ Email sent successfully");
      fetchApplications(); // refresh UI
    } catch (err) {
      console.error("❌ Send error:", err);
      alert("Failed to send email");
    }
  };

  /* ===============================
     SEND ALL DRAFT EMAILS
  ================================ */
  const handleSendAll = async () => {
    if (previewApplications.length === 0) return;

    const confirmSend = window.confirm(
      "Are you sure you want to send all draft emails?"
    );

    if (!confirmSend) return;

    try {
      await axios.post("/api/applications/send-all");
      alert("✅ All emails sent successfully");
      fetchApplications(); // refresh UI
    } catch (err) {
      console.error("❌ Send all error:", err);
      alert("Failed to send all emails");
    }
  };

  return (
    <div className="applications-page">
      <ApplicationsHeader />

      {/* ===============================
          TO BE PREVIEWED
      ================================ */}
      <ApplicationsSection
        title="To Be Previewed"
        applications={previewApplications}
        showSendAll={true}
        onSendAll={handleSendAll}
        onSendSingle={handleSendSingle}
        navigate={navigate}
      />

      {/* ===============================
          SENT MAILS
      ================================ */}
      <ApplicationsSection
        title="Sent Mails"
        applications={sentApplications}
        showSendAll={false}
        navigate={navigate}
      />
    </div>
  );
};

export default Applications;