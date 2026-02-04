const ApplicationRow = ({ application, onClick }) => {
  return (
    <div
      className="application-row"
      onClick={() => onClick?.(application)}
      style={{ cursor: "pointer" }}
    >
      <span className="name">
        {application.extractedEmail || "Unknown"}
      </span>

      <span className="content">
        <strong>{application.subject || "No subject"}</strong> –{" "}
        {application.emailBody?.slice(0, 40)}...
      </span>

      <span className="date">
        {new Date(application.createdAt).toLocaleDateString()}
      </span>
    </div>
  );
};

export default ApplicationRow;
