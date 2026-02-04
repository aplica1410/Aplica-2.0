import "./email-generation-modal.css";

const STAGES = [
  { key: "parsed", label: "JD Parsed" },
  { key: "analysing", label: "Analysing" },
  { key: "generating", label: "Generating Email" },
  { key: "done", label: "Email Generated" },
];

const EmailGenerationModal = ({ isOpen, stage }) => {
  if (!isOpen) return null;

  return (
    <div className="egm-backdrop">
      <div className="egm-modal">
        <h3>Generating Email</h3>

        <ul className="egm-stages">
          {STAGES.map((s, index) => {
            const isDone =
              STAGES.findIndex((x) => x.key === stage) > index ||
              stage === "done";

            const isActive = s.key === stage;

            return (
              <li key={s.key} className="egm-stage">
                <span className="egm-icon">
                  {isDone ? "✅" : isActive ? "🔄" : "⏳"}
                </span>
                <span className={isDone ? "done" : ""}>
                  {s.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default EmailGenerationModal;
