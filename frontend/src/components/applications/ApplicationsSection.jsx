import ApplicationRow from "./ApplicationRow";

const dummyData = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  name: "Rakesh",
  subject: "UI Designer Application",
  body: "Hi, I am fdugsjngsjfgjngf...",
  date: "6 Jan'26",
}));

const ApplicationsSection = ({ title }) => {
  return (
    <div className="applications-card">
      <h3>{title}</h3>

      {dummyData.map((item) => (
        <ApplicationRow key={item.id} data={item} />
      ))}
    </div>
  );
};

export default ApplicationsSection;
