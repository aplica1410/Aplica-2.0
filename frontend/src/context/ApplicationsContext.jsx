import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";

const ApplicationsContext = createContext(null);

export const ApplicationsProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/applications");
      setApplications(res.data?.applications || res.data || []);
    } catch (err) {
      console.error("Failed to fetch applications", err);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <ApplicationsContext.Provider
      value={{ applications, loading, fetchApplications }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
};

export const useApplications = () => {
  const context = useContext(ApplicationsContext);
  if (!context) {
    throw new Error(
      "useApplications must be used within ApplicationsProvider"
    );
  }
  return context;
};
