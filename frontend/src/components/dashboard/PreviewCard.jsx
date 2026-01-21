const PreviewCard = () => {
  const rows = Array.from({ length: 4 }, (_, i) => ({
    id: i,
    name: "Rakesh",
    role: "UI Designer Application",
  }));

  return (
    <div className="dashboard-card">
      <h3>To Be Previewed</h3>

      {rows.map((row) => (
        <div key={row.id} className="dashboard-row">
          <span className="name">{row.name}</span>
          <span className="role">{row.role}</span>
        </div>
      ))}

      <div className="card-actions">
        <button className="primary-btn">Send All</button>
        <button className="secondary-btn">Preview</button>
      </div>
    </div>
  );
};

export default PreviewCard;
