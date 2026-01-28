import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import "../styles/dashboard-layout.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
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
