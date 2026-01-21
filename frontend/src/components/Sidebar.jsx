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
      <NavLink to="/dashboard/settings">Settings</NavLink>

      {!user.profileComplete && (
        <button
          className="update-profile-btn"
          onClick={() => navigate("/dashboard/profile/professional")}
        >
          Update Your Profile
        </button>
      )}
    </aside>
  );
};

export default Sidebar;
