import "../styles/applications.css";
import ApplicationsHeader from "../components/applications/ApplicationsHeader";
import ApplicationsSection from "../components/applications/ApplicationsSection";

const Applications = () => {
  return (
    <div className="applications-page">
      <ApplicationsHeader />

      <ApplicationsSection
        title="To Be Previewed"
        type="preview"
      />

      <ApplicationsSection
        title="Sent Mails"
        type="sent"
      />
    </div>
  );
};

export default Applications;
