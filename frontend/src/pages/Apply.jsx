import ApplyHeader from "../components/apply/ApplyHeader";
import JobLinkInput from "../components/apply/JobLinkInput";
import JobDescription from "../components/apply/JobDescription";

const Apply = () => {
  return (
    <div className="apply-page">
      <ApplyHeader />
      <JobLinkInput />
      <div className="or-divider">OR</div>
      <JobDescription />
    </div>
  );
};

export default Apply;
