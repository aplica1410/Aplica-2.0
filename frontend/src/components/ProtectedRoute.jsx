import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMe } from "../api/auth";
import { useUser } from "../context/UserContext";

const ProtectedRoute = () => {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await getMe();
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [setUser]);

  if (loading) {
    return <div>Checking authentication...</div>;
  }

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // 🔒 Onboarding not finished → force correct step
  if (user.onboardingStep !== "done") {
    const onboardingPath = `/dashboard/profile/${user.onboardingStep}`;

    if (location.pathname !== onboardingPath) {
      return <Navigate to={onboardingPath} replace />;
    }
  }

  // ✅ All good
  return <Outlet />;
};

export default ProtectedRoute;
