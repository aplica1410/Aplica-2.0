import { NavLink, Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import logo from "../assets/logo.svg";
import "../../styles/sidebar.css";

const Sidebar = () => {
  const { user } = useUser();

  return (
    <aside className="sidebar">

      {/* ===== LOGO ===== */}
      <Link to="/dashboard" className="sidebar-logo">
        <img src={logo} alt="Aplica Logo" className="logo-img" />
      </Link>

      {/* ===== DASHBOARD ===== */}
      <NavLink
        to="/dashboard/home"
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
      >
        Dashboard
      </NavLink>

      {/* ===== APPLY ===== */}
      <NavLink
        to="/dashboard/apply"
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
      >
        Apply
      </NavLink>

      {/* ===== APPLICATIONS ===== */}
      <NavLink
        to="/dashboard/applications"
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
      >
        Applications
      </NavLink>

      {/* ===== PERSONAL INFO ===== */}
      <NavLink
        to="/dashboard/personal-information"
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
      >
        Personal Information
      </NavLink>

      {/* ===== SETTINGS ===== */}
      <NavLink
        to="/dashboard/settings"
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
      >
        Settings
      </NavLink>

    </aside>
  );
};

export default Sidebar;