import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProfileSetupLayout = () => {
  const navigate = useNavigate();

  // 🔐 Global guard for profile setup
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("aplica_user"));

    // If profile already completed, block setup routes
    if (user?.profileComplete) {
      navigate("/dashboard/home", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="profile-setup-layout">
      <Outlet />
    </div>
  );
};

export default ProfileSetupLayout;
