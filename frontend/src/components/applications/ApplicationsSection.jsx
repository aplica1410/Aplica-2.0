import { useApplications } from "../../context/ApplicationsContext";
import ApplicationRow from "./ApplicationRow";

const ApplicationsSection = ({ title, type }) => {
  const {
    previewApplications = [],
    sentApplications = [],
    loading,
  } = useApplications();

  const applications =
    type === "preview" ? previewApplications : sentApplications;

  if (loading) {
    return (
      <div className="applications-card">
        <h3>{title}</h3>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="applications-card">
      <h3>{title}</h3>

      {applications.length === 0 && (
        <p className="empty-text">No applications found</p>
      )}

      {applications.map((app) => (
        <ApplicationRow key={app._id} application={app} />
      ))}
    </div>
  );
};

export default ApplicationsSection;
