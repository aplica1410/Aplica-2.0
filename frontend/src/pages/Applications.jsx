import { useEffect, useState } from "react";
import "../styles/applications.css";
import axios from "../api/axios";

import ApplicationsHeader from "../components/applications/ApplicationsHeader";
import ApplicationsSection from "../components/applications/ApplicationsSection";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get("/api/applications");
        console.log("📦 Applications from backend:", res.data);

        setApplications(res.data.applications || []);
      } catch (err) {
        console.error("❌ Failed to fetch applications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const previewApplications = applications.filter(
    (app) => app.status === "draft" || app.status === "preview"
  );

  const sentApplications = applications.filter(
    (app) => app.status === "sent"
  );

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading applications...</p>;
  }

  return (
    <div className="applications-page">
      <ApplicationsHeader />

      <ApplicationsSection
        title="To Be Previewed"
        applications={previewApplications}
      />

      <ApplicationsSection
        title="Sent Mails"
        applications={sentApplications}
      />
    </div>
  );
};

export default Applications;
