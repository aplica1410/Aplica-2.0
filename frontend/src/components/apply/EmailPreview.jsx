const EmailPreview = ({ jdText }) => {
  return (
    <div className="email-preview">
      <label>To</label>
      <input placeholder="hr@company.com" />

      <label>Subject</label>
      <input placeholder="Application for UI Designer" />

      <label>Reply</label>
      <textarea
        placeholder={
          jdText
            ? "AI-generated email will appear here..."
            : "Paste JD to generate email"
        }
      />

      <button className="primary-btn">Send</button>
    </div>
  );
};

export default EmailPreview;
