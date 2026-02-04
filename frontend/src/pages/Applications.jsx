import "../styles/applications.css";
import { useNavigate } from "react-router-dom";
import { useApplications } from "../context/ApplicationsContext";

import ApplicationsHeader from "../components/applications/ApplicationsHeader";
import ApplicationsSection from "../components/applications/ApplicationsSection";

const Applications = () => {
  const navigate = useNavigate();
  const { applications, loading } = useApplications();

  if (loading) {
    return (
      <div className="applications-page">
        <ApplicationsHeader />
        <p style={{ padding: "20px" }}>Loading applications...</p>
      </div>
    );
  }

  // 🔹 Split data by status
  const previewApplications = applications.filter(
    (app) => app.status === "draft"
  );

  const sentApplications = applications.filter(
    (app) => app.status === "sent"
  );

  return (
    <div className="applications-page">
      <ApplicationsHeader />

      {/* 🟡 TO BE PREVIEWED */}
      <ApplicationsSection
        title="To Be Previewed"
        type="preview"
        applications={previewApplications}
        onRowClick={(id) => navigate(`/dashboard/apply/${id}`)}
      />

      {/* 🟢 SENT MAILS */}
      <ApplicationsSection
        title="Sent Mails"
        type="sent"
        applications={sentApplications}
      />
    </div>
  );
};

export default Applications;
