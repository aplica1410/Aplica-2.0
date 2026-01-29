import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Auth from "./pages/Auth";

import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/DashboardHome";
import Apply from "./pages/Apply";
import Applications from "./pages/Applications";
import Settings from "./pages/Settings";

import ProfileSetupLayout from "./pages/setup/ProfileSetupLayout";
import ProfileView from "./pages/setup/ProfileView"; // 👈 NEW
import PublicProfile from "./pages/setup/PublicProfile";
import ProfessionalInfo from "./pages/setup/ProfessionalInfo";
import PortfolioSocials from "./pages/setup/PortfolioSocials";
import Attachments from "./pages/setup/Attachments";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* 🌍 Public routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />

      {/* 🔐 Protected routes */}
      <Route element={<ProtectedRoute />}>
        {/* Dashboard layout */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="home" element={<DashboardHome />} />
          <Route path="apply" element={<Apply />} />
          <Route path="applications" element={<Applications />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* 👤 Profile (view + setup/edit) */}
        <Route path="/dashboard/profile" element={<ProfileSetupLayout />}>
          {/* 🔍 Profile VIEW */}
          <Route index element={<ProfileView />} />

          {/* ✏️ Profile SETUP / EDIT */}
          <Route path="public" element={<PublicProfile />} />
          <Route path="professional" element={<ProfessionalInfo />} />
          <Route path="portfolio" element={<PortfolioSocials />} />
          <Route path="attachments" element={<Attachments />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
