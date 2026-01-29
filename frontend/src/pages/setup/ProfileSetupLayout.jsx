import { Outlet } from "react-router-dom";

const ProfileSetupLayout = () => {
  console.log("🔥 ProfileSetupLayout mounted");

  return (
    <div style={{ color: "white", padding: "20px" }}>
      <h1>PROFILE LAYOUT</h1>
      <Outlet />
    </div>
  );
};

export default ProfileSetupLayout;
