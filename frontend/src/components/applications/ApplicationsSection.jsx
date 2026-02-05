import ApplicationRow from "./ApplicationRow";

const ApplicationsSection = ({ title, applications }) => {
  console.log(`📦 ${title} received:`, applications);

  if (!applications || applications.length === 0) {
    return (
      <div className="applications-card">
        <h3>{title}</h3>
        <p className="empty-text">No applications found</p>
      </div>
    );
  }

  return (
    <div className="applications-card">
      <h3>{title}</h3>

      {applications.map((app) => (
        <ApplicationRow key={app._id} application={app} />
      ))}
    </div>
  );
};

export default ApplicationsSection;
