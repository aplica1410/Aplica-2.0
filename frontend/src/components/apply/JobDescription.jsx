const JobDescription = ({ value, onChange, onCompose }) => {
  return (
    <div className="job-description">
      <textarea
        placeholder="Paste Job Description"
        rows="10"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <button
        className="primary-btn bottom-btn"
        onClick={onCompose}
      >
        Compose New Mail
      </button>
    </div>
  );
};

export default JobDescription;
