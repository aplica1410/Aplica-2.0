import "../styles/apply.css";
import ApplyHeader from "../components/apply/ApplyHeader";
import JobLinkInput from "../components/apply/JobLinkInput";
import JobDescription from "../components/apply/JobDescription";

const Apply = () => {
  return (
    <div className="apply-page">
      <ApplyHeader />

      <div className="apply-card">
        <JobLinkInput />

        <div className="divider">
          <span>OR</span>
        </div>

        <JobDescription />
      </div>
    </div>
  );
};

export default Apply;
