import "../../styles/compose-new-mail.css";

const ComposeNewMail = () => {
  const today = new Date().toDateString();

  return (
    <div className="compose-page">
      {/* Header */}
      <h2>Apply / Compose New Mail</h2>
      <p>Hi, Ujjwal</p>
      <small>📅 {today}</small>

      {/* Card */}
      <div className="compose-card">
        {/* Top input row */}
        <div className="compose-top">
          <input
            type="text"
            placeholder="Paste Post Link"
          />
          <button>Compose New Mail</button>
        </div>

        {/* OR divider */}
        <div className="compose-divider">OR</div>

        {/* JD textarea */}
        <textarea
          className="compose-textarea"
          placeholder="Paste Job Description (Make sure it has target email id)"
        />

        {/* Bottom button */}
        <div className="compose-bottom">
          <button>Compose New Mail</button>
        </div>
      </div>
    </div>
  );
};

export default ComposeNewMail;
