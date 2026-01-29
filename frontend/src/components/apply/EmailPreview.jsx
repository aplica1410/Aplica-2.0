const EmailPreview = () => {
  return (
    <div className="email-preview">
      <div className="field">
        <label>To</label>
        <input type="email" placeholder="hr@company.com" />
      </div>

      <div className="field">
        <label>Subject</label>
        <input type="text" placeholder="Application for UI Designer" />
      </div>

      <div className="field">
        <label>Reply</label>
        <textarea rows="10" placeholder="Email content will appear here..." />
      </div>

      <button className="primary-btn">Send</button>
    </div>
  );
};

export default EmailPreview;
