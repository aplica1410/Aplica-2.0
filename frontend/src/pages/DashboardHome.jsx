import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useUser } from "../context/UserContext";

import "../styles/dashboard-home.css";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatCard from "../components/dashboard/StatCard";
import HistoryCard from "../components/dashboard/HistoryCard";
import PreviewCard from "../components/dashboard/PreviewCard";

const DashboardHome = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    sent: 0,
    remaining: 0,
    limit: 100,
  });

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, appsRes] = await Promise.all([
          axios.get("/api/applications/stats/dashboard"),
          axios.get("/api/applications"),
        ]);

        setStats(statsRes.data);
        setApplications(appsRes.data.applications || []);
      } catch (err) {
        console.error("❌ Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (!user || loading) {
    return <div>Loading dashboard...</div>;
  }

  const isProfileIncomplete = user.profileComplete === false;

  /* ===============================
     SPLIT APPLICATIONS
  ================================ */

  const previewItems = applications.filter(
    (app) => app.status === "draft"
  );

  const historyItems = applications.filter(
    (app) => app.status === "sent"
  );

  const leftToPreviewCount = previewItems.length;

  return (
    <div className="dashboard-home">
      <DashboardHeader />

      {/* ===============================
          STATS
      ================================ */}
      <div className="stats-grid">
        <StatCard title="Email Sent" value={historyItems.length} />

        <StatCard
          title="Email Remaining"
          value={`${stats.remaining}/${stats.limit}`}
        />

        <StatCard
          title="Left To Preview"
          value={leftToPreviewCount}
        />
      </div>

      {/* ===============================
          PROFILE CTA
      ================================ */}
      {isProfileIncomplete && (
        <div className="profile-warning">
          <p>Your profile is incomplete.</p>
          <button
            className="primary-btn"
            onClick={() =>
              navigate("/dashboard/profile/professional")
            }
          >
            Update Your Profile
          </button>
        </div>
      )}

      {/* ===============================
          PREVIEW & HISTORY
      ================================ */}
      <div className="dashboard-bottom">
        <HistoryCard items={historyItems.slice(0, 5)} />
        <PreviewCard items={previewItems.slice(0, 5)} />
      </div>
    </div>
  );
};

export default DashboardHome;
