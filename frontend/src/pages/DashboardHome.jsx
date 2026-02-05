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

  const [stats, setStats] = useState({
    sent: 0,
    remaining: 0,
    toPreview: 0,
  });

  const [loading, setLoading] = useState(true);

  /* ===============================
     FETCH DASHBOARD STATS
  ================================ */
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/api/applications/stats/dashboard");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (!user || loading) {
    return <div>Loading dashboard...</div>;
  }

  const isProfileIncomplete = user.profileComplete === false;

  return (
    <div className="dashboard-home">
      <DashboardHeader user={user} />

      {/* Stats */}
      <div className="stats-grid">
        <StatCard title="Email Sent" value={stats.sent} />
        <StatCard
          title="Email Remaining"
          value={`${stats.remaining}/${stats.limit ?? 100}`}
        />
        <StatCard title="Left To Preview" value={stats.toPreview} />
      </div>

      {/* Profile CTA */}
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

      {/* Bottom cards (can be wired next) */}
      <div className="dashboard-bottom">
        <HistoryCard />
        <PreviewCard />
      </div>
    </div>
  );
};

export default DashboardHome;
