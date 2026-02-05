const EmailPreview = ({
  to,
  subject,
  body,
  setTo,
  setSubject,
  setBody,
  onSend,
}) => {
  return (
    <div className="email-preview-card">
      <h3>Reply</h3>

      {/* TO */}
      <input
        type="email"
        placeholder="To"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />

      {/* SUBJECT */}
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      {/* BODY */}
      <textarea
        placeholder="Email body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={12}
      />

      {/* SEND */}
      <button className="send-btn" onClick={onSend}>
        Send
      </button>
    </div>
  );
};

export default EmailPreview;
