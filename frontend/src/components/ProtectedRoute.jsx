import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMe } from "../api/auth";
import { useUser } from "../context/UserContext";

const ONBOARDING_ROUTES = {
  public: "/dashboard/profile/public",
  professional: "/dashboard/profile/professional",
  portfolio: "/dashboard/profile/portfolio",
  attachments: "/dashboard/profile/attachments",
};

const ProtectedRoute = () => {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await getMe(); // backend returns user directly
        setUser(data);
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

  // 🔒 Onboarding not complete → force existing onboarding routes
  if (!user.profileComplete) {
    const correctPath =
      ONBOARDING_ROUTES[user.onboardingStep] ||
      "/dashboard/profile/public";

    if (location.pathname !== correctPath) {
      return <Navigate to={correctPath} replace />;
    }
  }

  // ✅ All good
  return <Outlet />;
};

export default ProtectedRoute;
