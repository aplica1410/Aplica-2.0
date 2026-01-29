import { NavLink } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  console.log("✅ Sidebar rendered");
  return (
    <aside className="sidebar">
      <h2 className="logo">A↗</h2>

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

        {/* ✅ NEW PROFILE LINK */}
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
