const SentHeader = () => {
  const today = new Date().toDateString();

  return (
    <div className="sent-header">
      <h2>
        Application <span>/ Sent</span>
      </h2>
      <p>Hi, Ujjwal</p>
      <small>📅 {today}</small>
    </div>
  );
};

export default SentHeader;
