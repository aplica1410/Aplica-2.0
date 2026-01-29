import ApplyHeader from "../components/apply/ApplyHeader";
import JobDescription from "../components/apply/JobDescription";
import EmailPreview from "../components/apply/EmailPreview";

const Apply = () => {
  return (
    <div className="apply-page">
      <ApplyHeader />

      <div className="apply-grid">
        <JobDescription />
        <EmailPreview />
      </div>
    </div>
  );
};

export default Apply;
