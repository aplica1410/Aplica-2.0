import { useNavigate } from "react-router-dom";

const PreviewCard = ({ items = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-card">
      <h3>To Be Previewed</h3>

      {items.length === 0 && (
        <p className="empty-text">No drafts available</p>
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
                {item.subject || "Untitled Draft"}
              </span>

              <span className="snippet">
                {item.emailBody?.slice(0, 70) || ""}
                {item.emailBody?.length > 70 && "..."}
              </span>
            </div>

            <div className="row-right">
              {new Date(item.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      <div className="card-actions">
        <button
          className="primary-btn"
          disabled={items.length === 0}
          onClick={() =>
            navigate("/dashboard/applications")
          }
        >
          View All Drafts
        </button>
      </div>
    </div>
  );
};

export default PreviewCard;
