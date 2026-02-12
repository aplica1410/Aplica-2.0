import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Auth from "./pages/Auth";

import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/DashboardHome";
import Apply from "./pages/Apply";
import Applications from "./pages/Applications";
import Settings from "./pages/Settings";
import PersonalInformation from "./pages/PersonalInformation";
import ComposeNewMail from "./components/dashboard/ComposeNewMail";

import ProfileSetupLayout from "./pages/setup/ProfileSetupLayout";
import PublicProfile from "./pages/setup/PublicProfile";
import ProfessionalInfo from "./pages/setup/ProfessionalInfo";
import PortfolioSocials from "./pages/setup/PortfolioSocials";
import Attachments from "./pages/setup/Attachments";

import ProtectedRoute from "./components/ProtectedRoute";
import { ApplicationsProvider } from "./context/ApplicationsContext";

function App() {
  return (
    <Routes>
      {/* 🌍 Public */}
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />

      {/* 🔐 Protected */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/dashboard"
          element={
            <ApplicationsProvider>
              <Dashboard />
            </ApplicationsProvider>
          }
        >
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<DashboardHome />} />
          <Route path="apply" element={<ComposeNewMail />} />
          <Route path="apply/:id" element={<Apply />} />
          <Route path="applications" element={<Applications />} />
          <Route path="settings" element={<Settings />} />
          <Route
            path="personal-information"
            element={<PersonalInformation />}
          />
        </Route>

        {/* Profile setup */}
        <Route path="/dashboard/profile" element={<ProfileSetupLayout />}>
          <Route index element={<PublicProfile />} />
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
