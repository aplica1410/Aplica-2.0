const ApplicationRow = ({ application, onClick }) => {
  return (
    <div
      className="application-row"
      onClick={() => onClick?.(application._id)}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <span className="name">
        {application.extractedEmail || "Unknown"}
      </span>

      <span className="content">
        <strong>{application.subject || "Untitled"}</strong> –{" "}
        {application.emailBody
          ? application.emailBody.slice(0, 40) + "..."
          : "No content"}
      </span>

      <span className="date">
        {new Date(application.updatedAt).toDateString()}
      </span>
    </div>
  );
};

export default ApplicationRow;
