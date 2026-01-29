import { Outlet } from "react-router-dom";

const ProfileSetupLayout = () => {
  console.log("🔥 ProfileSetupLayout rendered");

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        backgroundColor: "#0f0f10",
        color: "#ffffff",
      }}
    >
      <Outlet />
    </div>
  );
};

export default ProfileSetupLayout;
