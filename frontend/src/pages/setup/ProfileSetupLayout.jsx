import { Outlet } from "react-router-dom";

const ProfileSetupLayout = () => {
  return (
    <div className="profile-setup-layout">
      {/* Optional: header / stepper / title */}
      <Outlet />
    </div>
  );
};

export default ProfileSetupLayout;
