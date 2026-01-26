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
      } catch (err) {
        setUser(undefined); // 🔥 IMPORTANT: undefined ≠ null
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [setUser]);

  // ⏳ Still checking auth
  if (loading) {
    return <div>Checking authentication...</div>;
  }

  // ❌ Auth check finished AND user is missing
  if (user === undefined) {
    return <Navigate to="/auth" replace />;
  }

  // 🔒 Onboarding enforcement
  if (user && user.profileComplete === false) {
    const correctPath = `/dashboard/profile/${user.onboardingStep}`;
    if (location.pathname !== correctPath) {
      return <Navigate to={correctPath} replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
