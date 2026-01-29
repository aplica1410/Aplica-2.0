const JobLinkInput = ({ value, onChange, onCompose }) => {
  return (
    <div className="job-link">
      <input
        type="text"
        placeholder="Paste Job Post Link"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <button
        className="primary-btn"
        onClick={onCompose}
      >
        Compose New Mail
      </button>
    </div>
  );
};

export default JobLinkInput;
