import { Outlet } from "react-router-dom";
import "./ProfileSetupLayout.css";

const ProfileSetupLayout = () => {
  return (
    <div className="profile-setup-layout">
      <Outlet />
    </div>
  );
};

export default ProfileSetupLayout;