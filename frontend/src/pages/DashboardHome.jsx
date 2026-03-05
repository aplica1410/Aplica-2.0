import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

import "../styles/dashboard-home.css";
import HistoryCard from "../components/dashboard/HistoryCard";
import PreviewCard from "../components/dashboard/PreviewCard";

/* === ICONS === */
import calendarIcon from "../assets/Calendar.svg";
import sentIcon from "../assets/send.svg";
import remainingIcon from "../assets/remaining.svg";
import previewIcon from "../assets/preview.svg";

const DashboardHome = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");

  const [stats, setStats] = useState({
    sent: 0,
    remaining: 0,
    limit: 100,
  });

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, appsRes, profileRes] = await Promise.all([
          axios.get("/api/applications/stats/dashboard"),
          axios.get("/api/applications"),
          axios.get("/api/profile-setup")   // ✅ correct route
        ]);

        setStats(statsRes.data);
        setApplications(appsRes.data.applications || []);

        setName(
          profileRes.data?.publicProfile?.firstName ||
          profileRes.data?.firstName ||
          ""
        );

      } catch (err) {
        console.error("❌ Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  const previewItems = applications.filter(
    (app) => app.status === "draft"
  );

  const historyItems = applications.filter(
    (app) => app.status === "sent"
  );

  const leftToPreviewCount = previewItems.length;

  const today = new Date().toDateString();

  return (
    <div className="dashboard-home">

      {/* HEADER */}
      <div className="dashboard-top">
        <div>
          <h2>
            Dashboard <span>/ Overview</span>
          </h2>

          <p className="welcome">
            Hi, {name || "User"}
          </p>

          <div className="date-row">
            <img src={calendarIcon} alt="calendar" />
            <span>{today}</span>
          </div>
        </div>

        <button
          className="compose-btn"
          onClick={() => navigate("/dashboard/apply")}
        >
          Compose New Mail
        </button>
      </div>

      <div className="dashboard-divider" />

      {/* STATS */}
      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-top">
            <img src={sentIcon} alt="sent" />
            <span>Email Sent</span>
          </div>
          <h3>{historyItems.length}</h3>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <img src={remainingIcon} alt="remaining" />
            <span>Email Remaining</span>
          </div>
          <h3>{stats.remaining}/{stats.limit}</h3>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <img src={previewIcon} alt="preview" />
            <span>Left To Preview</span>
          </div>
          <h3>{leftToPreviewCount}</h3>
        </div>

      </div>

      {/* HISTORY & PREVIEW */}
      <div className="dashboard-bottom">
        <HistoryCard items={historyItems.slice(0, 5)} />
        <PreviewCard items={previewItems.slice(0, 5)} />
      </div>

    </div>
  );
};

export default DashboardHome;