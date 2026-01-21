const PreviewHeader = () => {
  const today = new Date().toDateString();

  return (
    <div className="preview-header">
      <h2>
        Application <span>/ Preview</span>
      </h2>
      <p>Hi, Ujjwal</p>
      <small>📅 {today}</small>
    </div>
  );
};

export default PreviewHeader;
