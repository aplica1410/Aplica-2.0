const DashboardHeader = () => {
  const today = new Date().toDateString();

  return (
    <div className="dashboard-header">
      <h2>
        Dashboard <span>/ Overview</span>
      </h2>
      <p>Hi, Ujjwal</p>
      <small>📅 {today}</small>
    </div>
  );
};

export default DashboardHeader;
