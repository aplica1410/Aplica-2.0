import { useUser } from "../../context/UserContext";

const DashboardHeader = () => {
  const { user } = useUser();

  const today = new Date().toDateString();

  return (
    <div className="dashboard-header">
      <h2>
        Dashboard <span>/ Overview</span>
      </h2>

      <p>
        Hi,{" "}
        {user?.publicProfile?.firstName ||
          user?.email?.split("@")[0] ||
          "User"}
      </p>

      <small>📅 {today}</small>
    </div>
  );
};

export default DashboardHeader;
