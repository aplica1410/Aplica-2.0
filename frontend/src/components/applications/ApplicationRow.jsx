import { useNavigate } from "react-router-dom";

const ApplicationRow = ({ application }) => {
  const navigate = useNavigate();

  return (
    <div className="application-row">
      <span className="name">{application.extractedEmail}</span>

      <span className="content">
        <strong>{application.subject}</strong> –{" "}
        {application.emailBody?.slice(0, 60)}...
      </span>

      <span className="date">
        {new Date(application.createdAt).toLocaleDateString()}
      </span>

<button
  className="secondary-btn small-btn preview-action-btn"
  onClick={() => navigate(`/dashboard/apply/${item._id}`)}
>
  Preview →
</button>


    </div>
  );
};

export default ApplicationRow;
