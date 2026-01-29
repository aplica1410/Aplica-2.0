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
    return <div style={{ color: "white", padding: 20 }}>Checking authentication…</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  /* ✅ PROFILE COMPLETE USERS */
  if (user.profileComplete === true) {
    if (location.pathname.startsWith("/dashboard/profile")) {
      return <Navigate to="/dashboard/home" replace />;
    }
    return <Outlet />;
  }

  /* 🧭 ONBOARDING USERS */
  const step = user.onboardingStep || "public";
  const allowedPath = `/dashboard/profile/${step}`;

  if (!location.pathname.startsWith("/dashboard/profile")) {
    return <Navigate to={allowedPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
