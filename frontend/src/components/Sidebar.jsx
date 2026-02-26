import { NavLink, Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import logo from "../assets/logo.svg";
import "../../styles/sidebar.css";

const Sidebar = () => {
  const { user } = useUser();

  return (
    <aside className="sidebar">

      {/* 🔥 Logo */}
      <Link to="/dashboard/home" className="sidebar-logo">
        <img src={logo} alt="Aplica Logo" className="logo-img" />
      </Link>

      <NavLink
        to="/dashboard/home"
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/dashboard/apply"
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
      >
        Apply
      </NavLink>

      <NavLink
        to="/dashboard/applications"
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
      >
        Applications
      </NavLink>

      <NavLink
        to="/dashboard/personal-information"
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
      >
        Personal Information
      </NavLink>

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