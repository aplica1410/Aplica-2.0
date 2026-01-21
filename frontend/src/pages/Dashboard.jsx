import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import "../styles/dashboard-layout.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Only handle dashboard routing logic
  useEffect(() => {
    // If user lands on /dashboard, redirect to /dashboard/home
    if (location.pathname === "/dashboard") {
      navigate("/dashboard/home", { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
