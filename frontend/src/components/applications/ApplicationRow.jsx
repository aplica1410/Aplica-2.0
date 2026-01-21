const ApplicationRow = ({ data }) => {
  return (
    <div className="application-row">
      <span className="name">{data.name}</span>

      <span className="content">
        <strong>{data.subject}</strong> – {data.body}
      </span>

      <span className="date">{data.date}</span>
    </div>
  );
};

export default ApplicationRow;
