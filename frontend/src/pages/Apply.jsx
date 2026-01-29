import ApplyHeader from "../components/apply/ApplyHeader";
import JobDescription from "../components/apply/JobDescription";
import EmailPreview from "../components/apply/EmailPreview";
import "../styles/apply.css";

const Apply = () => {
  return (
    <div className="apply-page">
      <ApplyHeader />

      <div className="apply-grid">
        <div className="apply-left">
          <JobDescription />
        </div>

        <div className="apply-right">
          <EmailPreview />
        </div>
      </div>
    </div>
  );
};

export default Apply;
