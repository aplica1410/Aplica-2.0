const ComposeNewMail = () => {
  const today = new Date().toDateString();

  return (
    <div className="compose-page">
      <h2>Apply / Compose New Mail</h2>
      <p>Hi, Ujjwal</p>
      <small>📅 {today}</small>

      <div style={{ marginTop: "20px" }}>
        <textarea
          placeholder="Paste Job Description (Make sure it has target email id)"
          rows={10}
          style={{ width: "100%" }}
        />
        <button style={{ marginTop: "12px" }}>
          Compose New Mail
        </button>
      </div>
    </div>
  );
};

export default ComposeNewMail;
