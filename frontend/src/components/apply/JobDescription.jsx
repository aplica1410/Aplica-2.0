const JobDescription = () => {
  return (
    <div className="job-description">
      <textarea
        placeholder="Paste Job Description"
        rows="10"
      />
      <button className="primary-btn bottom-btn">
        Compose New Mail
      </button>
    </div>
  );
};

export default JobDescription;
