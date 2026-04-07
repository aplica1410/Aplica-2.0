import "./ScaleSection.css"

const ScaleSection = () => {
  return (
    <section className="scale-section">

      {/* Top Tag */}
      <div className="scale-tag">Aplica</div>

      {/* Heading */}
      <h2 className="scale-heading">
        Our platform brings AI-powered email generation, smart personalization, and automated outreach together in one seamless experience, so you can focus on{" "}
        <span>closing opportunities</span>, not writing emails.
      </h2>

      {/* LIGHT BEAM 
      <div className="beam-wrapper">
        <div className="beam-horizontal"></div>
        <div className="beam-vertical"></div>
      </div> */}

      {/* Bottom Card */}
      <div className="scale-card">
        <p className="card-title">
          What can you achieve with Aplica?
        </p>

        <div className="card-grid">
          <div className="card-item">
            <h4>Generate high-converting emails instantly</h4>
            <p>
              Create personalized, context-aware emails in seconds — no more starting from scratch or wasting time drafting.
            </p>
          </div>

          <div className="card-item">
            <h4>Automate your outreach effortlessly</h4>
            <p>
              Let AI handle follow-ups and sequences so you never miss a response or opportunity again.
            </p>
          </div>

          <div className="card-item">
            <h4>Improve replies with smart insights</h4>
            <p>
              Understand what works with AI-driven suggestions and optimize your emails for better engagement — no guesswork.
            </p>
          </div>
        </div>
      </div>

    </section>
  )
}

export default ScaleSection