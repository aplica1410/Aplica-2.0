import { Outlet } from "react-router-dom";

const ProfileSetupLayout = () => {
  console.log("🔥 ProfileSetupLayout rendered");

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <Outlet />
    </div>
  );
};

export default ProfileSetupLayout;
