import { NavLink } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import "../../styles/sidebar.css";

const Sidebar = () => {
  const { user } = useUser();

  return (
    <aside className="sidebar">
      <NavLink
        to="/dashboard/home"
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/dashboard/compose"
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
