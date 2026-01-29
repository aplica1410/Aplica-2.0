const JobDescription = ({ jdText, setJdText }) => {
  return (
    <div className="job-description">
      <label>JD</label>

      <textarea
        placeholder="Paste job description or freelance work details"
        value={jdText}
        onChange={(e) => setJdText(e.target.value)}
      />
    </div>
  );
};

export default JobDescription;
