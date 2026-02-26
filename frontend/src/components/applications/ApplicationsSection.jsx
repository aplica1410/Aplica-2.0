import ApplicationRow from "./ApplicationRow";

const ApplicationsSection = ({
  title,
  applications,
  showSendAll = false,
  onSendAll,
  onSendSingle,
  navigate,
}) => {
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
      {/* Header Row */}
      <div className="section-header">
        <h3>{title}</h3>

       {/*} {showSendAll && (
          <button
            className="send-all-btn"
            onClick={onSendAll}
          >
            Send All
          </button>
        )} */}
      </div>

      {/* Application Rows */}
      {applications.map((app) => (
        <ApplicationRow
          key={app._id}
          application={app}
          showSendButton={showSendAll}
          onSendSingle={onSendSingle}
          navigate={navigate}
        />
      ))}
    </div>
  );
};

export default ApplicationsSection;