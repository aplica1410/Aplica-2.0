import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import dashboardIcon from "../../assets/D.svg";
import applyIcon from "../../assets/A.svg";
import applicationsIcon from "../../assets/App.svg";
import personalInfoIcon from "../../assets/PI.svg";
import settingsIcon from "../../assets/S.svg";
import "./sidebar.css";

const Sidebar = () => {
  console.log("✅ Sidebar rendered");

  return (
    <aside className="sidebar">

      {/* Logo */}
      <Link to="/dashboard/home" className="logo-container">
        <img src={logo} alt="Aplica Logo" className="logo-img" />
      </Link>

      <nav>

        <NavLink
          to="/dashboard/home"
          className={({ isActive }) =>
            isActive ? "sidebar-item active" : "sidebar-item"
          }
        >
          <img src={dashboardIcon} alt="" className="sidebar-icon" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/dashboard/apply"
          className={({ isActive }) =>
            isActive ? "sidebar-item active" : "sidebar-item"
          }
        >
          <img src={applyIcon} alt="" className="sidebar-icon" />
          <span>Apply</span>
        </NavLink>

        <NavLink
          to="/dashboard/applications"
          className={({ isActive }) =>
            isActive ? "sidebar-item active" : "sidebar-item"
          }
        >
          <img src={applicationsIcon} alt="" className="sidebar-icon" />
          <span>Applications</span>
        </NavLink>

        <NavLink
          to="/dashboard/personal-information"
          className={({ isActive }) =>
            isActive ? "sidebar-item active" : "sidebar-item"
          }
        >
          <img src={personalInfoIcon} alt="" className="sidebar-icon" />
          <span>Personal Information</span>
        </NavLink>

        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            isActive ? "sidebar-item active" : "sidebar-item"
          }
        >
          <img src={settingsIcon} alt="" className="sidebar-icon" />
          <span>Settings</span>
        </NavLink>

      </nav>
    </aside>
  );
};

export default Sidebar;