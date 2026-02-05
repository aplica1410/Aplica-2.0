import { useEffect, useState } from "react";
import "../styles/applications.css";
import axios from "../api/axios";

import ApplicationsHeader from "../components/applications/ApplicationsHeader";
import ApplicationsSection from "../components/applications/ApplicationsSection";

const Applications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get("/api/applications");

        console.log("🟢 RAW API RESPONSE:", res.data);
        console.log("🟢 APPLICATION ARRAY:", res.data.applications);

        setApplications(res.data.applications || []);
      } catch (err) {
        console.error("❌ Fetch error:", err);
      }
    };

    fetchApplications();
  }, []);

  const previewApplications = applications.filter(
    (app) =>
      !app.status || app.status === "draft" || app.status === "preview"
  );

  const sentApplications = applications.filter(
    (app) => app.status === "sent"
  );

  console.log("🟣 Preview count:", previewApplications.length);
  console.log("🟣 Sent count:", sentApplications.length);

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
