const EmailBody = ({
  body = "",
  readOnly = false,
}) => {
  return (
    <div className="email-body">
      <label>Reply</label>
      <textarea
        rows="10"
        value={body}
        readOnly={readOnly}
      />
    </div>
  );
};

export default EmailBody;