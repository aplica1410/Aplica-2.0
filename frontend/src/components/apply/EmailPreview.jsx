const EmailPreview = ({
  to,
  subject,
  body,
  setTo,
  setSubject,
  setBody,
  onSend,
}) => {
  const isReadOnly = !onSend; // 🔥 if no send handler → preview mode

  return (
    <div className="email-card">
      <h4 className="email-title">Reply</h4>

      <label>To</label>
      <input
        type="email"
        value={to}
        onChange={(e) => setTo && setTo(e.target.value)}
        placeholder="recipient@email.com"
        readOnly={isReadOnly}
      />

      <label>Subject</label>
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject && setSubject(e.target.value)}
        placeholder="Email subject"
        readOnly={isReadOnly}
      />

      <label>Reply</label>
      <textarea
        value={body}
        onChange={(e) => setBody && setBody(e.target.value)}
        placeholder="Write or edit email content"
        readOnly={isReadOnly}
      />

      {/* 🔥 Only render button if onSend exists */}
      {onSend && (
        <button className="send-btn" onClick={onSend}>
          Send
        </button>
      )}
    </div>
  );
};

export default EmailPreview;