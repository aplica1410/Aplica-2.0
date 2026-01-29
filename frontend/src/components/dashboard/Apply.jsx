import ApplyHeader from "../apply/ApplyHeader";
import JobLinkInput from "../apply/JobLinkInput";
import JobDescription from "../apply/JobDescription";

const Apply = () => {
  console.log("✅ Apply page rendered");

  return (
    <div style={{ padding: "24px", color: "white" }}>
      <ApplyHeader />

      <div style={{ marginTop: "24px" }}>
        <JobLinkInput />

        <div
          style={{
            textAlign: "center",
            margin: "16px 0",
            opacity: 0.6,
          }}
        >
          OR
        </div>

        <JobDescription />
      </div>
    </div>
  );
};

export default Apply;
