const ApplyHeader = () => {
  const today = new Date().toDateString();

  return (
    <div className="apply-header">
      <h2>
        Apply <span>/ Compose New Mail</span>
      </h2>
      <p>Hi, Ujjwal</p>
      <small>📅 {today}</small>
    </div>
  );
};

export default ApplyHeader;
