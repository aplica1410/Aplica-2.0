import { useState } from "react";
import ApplyHeader from "../components/apply/ApplyHeader";
import JobDescription from "../components/apply/JobDescription";
import EmailPreview from "../components/apply/EmailPreview";
import "../styles/apply.css";

const Apply = () => {
  const [jdText, setJdText] = useState("");

  return (
    <div className="apply-page">
      <ApplyHeader />

      <div className="apply-grid">
        <div className="apply-left">
          <JobDescription
            jdText={jdText}
            setJdText={setJdText}
          />
        </div>

        <div className="apply-right">
          <EmailPreview jdText={jdText} />
        </div>
      </div>
    </div>
  );
};

export default Apply;
