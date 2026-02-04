import ApplicationRow from "./ApplicationRow";

const ApplicationsSection = ({
  title,
  applications = [],
  onRowClick = () => {},
}) => {
  return (
    <div className="applications-card">
      <h3>{title}</h3>

      {applications.length === 0 && (
        <p className="empty-text">No applications found</p>
      )}

      {applications.map((app) => {
        // 🛡️ Safety check
        if (!app || !app._id) return null;

        return (
          <ApplicationRow
            key={app._id}
            application={app}
            onClick={() => onRowClick(app)}
          />
        );
      })}
    </div>
  );
};

export default ApplicationsSection;
