import { useNavigate } from "react-router-dom";

const HistoryCard = () => {
  const navigate = useNavigate();

  const handleCompose = () => {
    navigate("/dashboard/apply");
  };

  const rows = Array.from({ length: 7 }, (_, i) => ({
    id: i,
    name: "Rakesh",
    role: "UI Designer Application",
  }));

  return (
    <div className="dashboard-card">
      <h3>History</h3>

      {rows.map((row) => (
        <div key={row.id} className="dashboard-row">
          <span className="name">{row.name}</span>
          <span className="role">{row.role}</span>
        </div>
      ))}

      <div className="card-actions">
        <button className="primary-btn" onClick={handleCompose}>
          Compose New Mail
        </button>

        <button className="secondary-btn">
          View Full History
        </button>
      </div>
    </div>
  );
};

export default HistoryCard;
