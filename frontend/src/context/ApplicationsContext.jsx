import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";

const ApplicationsContext = createContext(null);

/* ===============================
   PROVIDER
================================ */
export const ApplicationsProvider = ({ children }) => {
  const [previewApplications, setPreviewApplications] = useState([]);
  const [sentApplications, setSentApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/api/applications");

      const apps = res.data?.applications || [];

      setPreviewApplications(apps.filter((a) => a.status === "preview"));
      setSentApplications(apps.filter((a) => a.status === "sent"));
    } catch (err) {
      console.error("Failed to fetch applications", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <ApplicationsContext.Provider
      value={{
        previewApplications,
        sentApplications,
        loading,
        refreshApplications: fetchApplications,
      }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
};

/* ===============================
   HOOK
================================ */
export const useApplications = () => {
  const context = useContext(ApplicationsContext);

  if (!context) {
    throw new Error(
      "useApplications must be used within ApplicationsProvider"
    );
  }

  return context;
};
