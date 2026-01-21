const EmailBody = ({ readOnly = false }) => {
  return (
    <div className="email-body">
      <label>Reply</label>
      <textarea
        rows="10"
        placeholder="Sent email content..."
        readOnly={readOnly}
      />
    </div>
  );
};

export default EmailBody;
