import { useEffect, useState } from "react";
import axios from "../../api/axios";

const DashboardHeader = () => {
  const [name, setName] = useState("");

  const today = new Date().toDateString();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/profile");
        setName(res.data?.profile?.firstName || "");
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="dashboard-header">
      <h2>
        Dashboard <span>/ Overview</span>
      </h2>

      <p>
        Hi, {name || "User"}
      </p>

      <small>📅 {today}</small>
    </div>
  );
};

export default DashboardHeader;