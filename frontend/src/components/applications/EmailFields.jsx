const EmailFields = ({
  to = "",
  subject = "",
  readOnly = false,
}) => {
  return (
    <>
      <div className="field">
        <label>To :</label>
        <input
          type="email"
          value={to}
          readOnly={readOnly}
        />
      </div>

      <div className="field">
        <label>Subject :</label>
        <input
          type="text"
          value={subject}
          readOnly={readOnly}
        />
      </div>
    </>
  );
};

export default EmailFields;