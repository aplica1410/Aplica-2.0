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
        const me = await getMe();
        setUser(me);
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

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // 🔒 FINAL onboarding enforcement
  if (user.profileComplete !== true) {
    const step = user.onboardingStep || "public";
    const correctPath = `/dashboard/profile/${step}`;

    if (location.pathname !== correctPath) {
      return <Navigate to={correctPath} replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
