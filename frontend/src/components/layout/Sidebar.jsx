import { NavLink } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2 className="logo">A↗</h2>

      <nav>
        <NavLink to="/dashboard/home">Dashboard</NavLink>
        <NavLink to="/dashboard/apply">Apply</NavLink>
        <NavLink to="/dashboard/applications">Applications</NavLink>
        <NavLink to="/dashboard/settings">Settings</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
