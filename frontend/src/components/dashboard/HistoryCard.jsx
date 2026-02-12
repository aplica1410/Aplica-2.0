import { useNavigate } from "react-router-dom";

const HistoryCard = ({ items = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-card">
      <h3>History</h3>

      {items.length === 0 && (
        <p className="empty-text">No emails sent yet</p>
      )}

      <div className="dashboard-list">
        {items.map((item) => (
          <div
            key={item._id}
            className="dashboard-list-row"
            onClick={() =>
              navigate(`/dashboard/apply/${item._id}`)
            }
          >
            <div className="row-left">
              <span className="email">
                {item.extractedEmail || "Unknown"}
              </span>

              <span className="subject">
                {item.subject || "Email Sent"}
              </span>

              <span className="snippet">
                {item.emailBody?.slice(0, 70) || ""}
                {item.emailBody?.length > 70 && "..."}
              </span>
            </div>

            <div className="row-right">
              {item.sentAt
                ? new Date(item.sentAt).toLocaleDateString()
                : ""}
            </div>
          </div>
        ))}
      </div>

      <div className="card-actions">
        <button
          className="secondary-btn"
          onClick={() =>
            navigate("/dashboard/applications")
          }
        >
          View Full History
        </button>
      </div>
    </div>
  );
};

export default HistoryCard;
