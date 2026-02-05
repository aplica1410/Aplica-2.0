const HistoryCard = ({ items = [] }) => {
  return (
    <div className="dashboard-card">
      <h3>History</h3>

      {items.length === 0 && (
        <p className="empty-text">No emails sent yet</p>
      )}

      {items.slice(0, 6).map((item) => (
        <div key={item._id} className="list-row">
          <span className="name">
            {item.extractedEmail || "Unknown"}
          </span>
          <span className="subject">
            {item.subject || "Email Sent"}
          </span>
        </div>
      ))}

      <div className="card-actions">
        <button className="secondary-btn">
          View Full History
        </button>
      </div>
    </div>
  );
};

export default HistoryCard;
