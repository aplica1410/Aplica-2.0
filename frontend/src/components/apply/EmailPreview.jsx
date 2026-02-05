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
    <div className="email-card">
      <h4 className="email-title">Reply</h4>

      <label>To</label>
      <input
        type="email"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        placeholder="recipient@email.com"
      />

      <label>Subject</label>
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Email subject"
      />

      <label>Reply</label>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write or edit email content"
      />

      <button className="send-btn" onClick={onSend}>
        Send
      </button>
    </div>
  );
};

export default EmailPreview;
