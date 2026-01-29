import { useState } from "react";
import ApplyHeader from "./ApplyHeader";
import JobDescription from "./JobDescription";
import JobLinkInput from "./JobLinkInput";

const Apply = () => {
  const [jobText, setJobText] = useState("");
  const [jobLink, setJobLink] = useState("");

  const handleCompose = () => {
    // ❌ Validation
    if (!jobText && !jobLink) {
      alert("Please paste a job description or a job post link");
      return;
    }

    if (jobText && jobLink) {
      alert("Please provide only one input");
      return;
    }

    // ✅ Normalized payload (for PART 3)
    const payload = jobText
      ? { type: "text", content: jobText }
      : { type: "link", content: jobLink };

    console.log("📨 Compose Payload:", payload);

    // PART 3 → backend call will go here
  };

  return (
    <div className="apply-page">
      <ApplyHeader />

      <JobLinkInput
        value={jobLink}
        onChange={setJobLink}
        onCompose={handleCompose}
      />

      <div className="or-divider">OR</div>

      <JobDescription
        value={jobText}
        onChange={setJobText}
        onCompose={handleCompose}
      />
    </div>
  );
};

export default Apply;
