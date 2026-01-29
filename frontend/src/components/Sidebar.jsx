import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const Sidebar = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <NavLink to="/dashboard/home">Dashboard</NavLink>
<NavLink to="/dashboard/apply">Apply</NavLink>
<NavLink to="/dashboard/applications">Applications</NavLink>
<NavLink to="/dashboard/personal-information">
  Personal Information
</NavLink>
<NavLink to="/dashboard/settings">Settings</NavLink>

    </aside>
  );
};

export default Sidebar;
