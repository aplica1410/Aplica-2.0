const ApplicationRow = ({ application }) => {
  return (
    <div className="application-row">
      <span className="name">
        {application.extractedEmail || "Unknown"}
      </span>

      <span className="content">
        <strong>{application.subject || "Draft Application"}</strong> –{" "}
        {(application.emailBody || application.jobDescription || "")
          .slice(0, 40)}
        ...
      </span>

      <span className="date">
        {new Date(application.createdAt).toLocaleDateString()}
      </span>
    </div>
  );
};

export default ApplicationRow;
