import "./ScaleSection.css"

const ScaleSection = () => {
  return (
    <section className="scale-section">

      {/* Top Tag */}
      <div className="scale-tag">Scalepro</div>

      {/* Heading */}
      <h2 className="scale-heading">
        Our platform brings lead capture, automated
        follow-ups, and smart analytics together in one
        seamless experience — so you can focus on{" "}
        <span>scaling your business</span>, not chasing leads.
      </h2>

      {/* LIGHT BEAM */}
      <div className="beam-wrapper">
        <div className="beam-horizontal"></div>
        <div className="beam-vertical"></div>
      </div>

      {/* Bottom Card */}
      <div className="scale-card">
        <p className="card-title">
          What can you achieve with Scalepro?
        </p>

        <div className="card-grid">
          <div className="card-item">
            <h4>Turn visitors into leads instantly</h4>
            <p>
              Smart pop-ups and forms grab attention at the perfect moment.
            </p>
          </div>

          <div className="card-item">
            <h4>Nurture leads on autopilot</h4>
            <p>
              AI-driven emails and reminders ensure you never miss an opportunity.
            </p>
          </div>

          <div className="card-item">
            <h4>Know what’s working, in real time</h4>
            <p>
              See exactly where leads come from and how they convert — no guesswork.
            </p>
          </div>
        </div>
      </div>

    </section>
  )
}

export default ScaleSection