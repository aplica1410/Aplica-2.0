import "./Features.css"

const features = [
  {
    title: "Intelligent Email Generation",
    desc: "Generate high-quality emails instantly with AI — no manual drafting needed.",
  },
  {
    title: "Seamless Personalization",
    desc: "Customize every email effortlessly based on context, tone, and recipient.",
  },
  {
    title: "High Reply Performance",
    desc: "Craft emails optimized for better open rates and higher responses.",
  },
  {
    title: "Blazing-Fast Setup",
    desc: "Start generating emails in minutes with a simple, no-code setup",
  },
  {
    title: "Multi-Channel Adaptability",
    desc: "Repurpose your emails for LinkedIn, messages, and more channels easily.",
  },
]

const Features = () => {
  return (
    <section className="features">

      {/* Top Tag */}
      <div className="features-tag">Engineered for Outreach</div>

      {/* Heading */}
      <h2 className="features-heading">
        Built for results. Powered by AI.
      </h2>

      {/* Subtext */}
      <p className="features-sub">
        Delivering better outreach through automation, personalization, and conversion-focused messaging.
      </p>

      {/* Grid */}
      <div className="features-grid">
        {features.map((item, index) => (
          <div className="feature-card" key={index}>
            <div className="icon"></div>
            <h4>{item.title}</h4>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>

    </section>
  )
}

export default Features