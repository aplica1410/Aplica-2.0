const EmailFields = ({ readOnly = false }) => {
  return (
    <>
      <div className="field">
        <label>To :</label>
        <input
          type="email"
          placeholder="recruiter@company.com"
          readOnly={readOnly}
        />
      </div>

      <div className="field">
        <label>Subject :</label>
        <input
          type="text"
          placeholder="Application for Software Engineer Role"
          readOnly={readOnly}
        />
      </div>
    </>
  );
};

export default EmailFields;
