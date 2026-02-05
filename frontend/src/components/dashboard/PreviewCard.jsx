import { useNavigate } from "react-router-dom";

const PreviewCard = ({ items = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-card">
      <h3>To Be Previewed</h3>

      {items.length === 0 && (
        <p className="empty-text">No drafts available</p>
      )}

      {items.slice(0, 5).map((item) => (
        <div key={item._id} className="list-row">
          <span className="name">
            {item.extractedEmail || "Unknown"}
          </span>
          <span className="subject">
            {item.subject || "Untitled Draft"}
          </span>
        </div>
      ))}

      <div className="card-actions">
        <button
          className="primary-btn"
          disabled={items.length === 0}
          onClick={() =>
            navigate(`/dashboard/apply/${items[0]._id}`)
          }
        >
          Preview
        </button>
      </div>
    </div>
  );
};

export default PreviewCard;
