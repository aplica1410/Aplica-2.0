import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import "./sidebar.css";

const Sidebar = () => {
  console.log("✅ Sidebar rendered");

  return (
    <aside className="sidebar">

      {/* 🔥 Logo */}
      <Link to="/dashboard/home" className="logo-container">
        <img src={logo} alt="Aplica Logo" className="logo-img" />
      </Link>

      <nav>
        <NavLink
          to="/dashboard/home"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/dashboard/apply"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Apply
        </NavLink>

        <NavLink
          to="/dashboard/applications"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Applications
        </NavLink>

        <NavLink
          to="/dashboard/personal-information"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Personal Information
        </NavLink>

        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Settings
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;