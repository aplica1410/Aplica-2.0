import "./Workflow.css";

const steps = [
  {
    number: "01",
    title: "Set Up Your Profile",
    desc: "Add your name, title, portfolio URL, and social links once. Aplica uses these to personalize every email you generate.",
  },
  {
    number: "02",
    title: "Paste the Job Description",
    desc: "Copy any JD from Upwork, LinkedIn, or email. Aplica extracts the client's contact, role details, and personalizes around them.",
  },
  {
    number: "03",
    title: "Send the Perfect Pitch",
    desc: "Review your personalized email, copy it, or open it directly in your mail client. You're done in under 60 seconds.",
  },
];

const WorkflowSection = () => {
  return (
    <section className="workflow">

      {/* Tag */}
      <div className="workflow-tag">How It Works</div>

      {/* Heading */}
      <h2 className="workflow-heading">
        From JD to sent pitch in 60 seconds
      </h2>

      <p className="workflow-sub">
        No learning curve, no fiddling with prompts. Three steps and you're done.
      </p>

      {/* Steps */}
      <div className="workflow-grid">
        {steps.map((step, index) => (
          <div className="workflow-card" key={index}>
            
            <div className="step-number">{step.number}</div>

            <h3>{step.title}</h3>
            <p>{step.desc}</p>

          </div>
        ))}
      </div>

    </section>
  );
};

export default WorkflowSection;