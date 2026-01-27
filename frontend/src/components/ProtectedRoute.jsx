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

  // ✅ FINAL ONBOARDING RULE
  if (user.profileComplete === true) {
    // 🚫 Never allow /dashboard/profile/*
    if (location.pathname.startsWith("/dashboard/profile")) {
      return <Navigate to="/dashboard/home" replace />;
    }
    return <Outlet />;
  }

  // 🔒 Incomplete onboarding
  if (
    user.onboardingStep &&
    user.onboardingStep !== "done"
  ) {
    const correctPath = `/dashboard/profile/${user.onboardingStep}`;
    if (location.pathname !== correctPath) {
      return <Navigate to={correctPath} replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
