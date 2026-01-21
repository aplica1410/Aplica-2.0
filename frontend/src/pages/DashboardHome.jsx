import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

import "../styles/dashboard-home.css";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatCard from "../components/dashboard/StatCard";
import HistoryCard from "../components/dashboard/HistoryCard";
import PreviewCard from "../components/dashboard/PreviewCard";

const DashboardHome = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  // Safety: user should already exist because Dashboard.jsx handled auth
  if (!user) {
    return <div>Loading dashboard...</div>;
  }

  const isProfileIncomplete = user.profileComplete === false;

  return (
    <div className="dashboard-home">
      <DashboardHeader user={user} />

      {/* Stats */}
      <div className="stats-grid">
        <StatCard title="Email Sent" value={user?.stats?.sent || 0} />
        <StatCard
          title="Email Remaining"
          value={user?.stats?.remaining || "0/100"}
        />
        <StatCard
          title="Left To Preview"
          value={user?.stats?.toPreview || 0}
        />
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

      {/* Bottom cards */}
      <div className="dashboard-bottom">
        <HistoryCard items={[]} />
        <PreviewCard items={[]} />
      </div>
    </div>
  );
};

export default DashboardHome;
