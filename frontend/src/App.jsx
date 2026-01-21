import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/DashboardHome";
import Apply from "./pages/Apply";
import Applications from "./pages/Applications";
import EmailPreview from "./pages/EmailPreview";
import EmailSent from "./pages/EmailSent";
import Settings from "./pages/Settings";

import ProfileSetupLayout from "./pages/setup/ProfileSetupLayout";
import ProfessionalInfo from "./pages/setup/ProfessionalInfo";
import PortfolioSocials from "./pages/setup/PortfolioSocials";
import Attachments from "./pages/setup/Attachments";
import PublicProfile from "./pages/setup/PublicProfile";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="home" element={<DashboardHome />} />
          <Route path="apply" element={<Apply />} />
          <Route path="applications" element={<Applications />} />
          <Route path="applications/preview" element={<EmailPreview />} />
          <Route path="applications/sent" element={<EmailSent />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>

      {/* Profile Setup (ONLY for incomplete users) */}
      <Route path="/dashboard/profile" element={<ProfileSetupLayout />}>
        <Route path="professional" element={<ProfessionalInfo />} />
        <Route path="portfolio" element={<PortfolioSocials />} />
        <Route path="attachments" element={<Attachments />} />
        <Route path="public" element={<PublicProfile />} />
      </Route>
    </Routes>
  );
}

export default App;
