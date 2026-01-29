import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import "../styles/dashboard-layout.css";

const Dashboard = () => {
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
