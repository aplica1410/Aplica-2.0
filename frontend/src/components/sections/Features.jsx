import "./Features.css"

const features = [
  {
    title: "Intelligent Execution",
    desc: "Our platform continuously enhances results with minimal user input.",
  },
  {
    title: "Seamless Control",
    desc: "Easily manage tasks from a centralized, intuitive dashboard.",
  },
  {
    title: "Trusted Performance",
    desc: "Dependable systems guarantee security and smooth transitions.",
  },
  {
    title: "Blazing-Fast Setup",
    desc: "No developers needed. Start in minutes with our plug-and-play system.",
  },
  {
    title: "Multi-Channel Touchpoints",
    desc: "Connect through email, SMS, LinkedIn, and more channels.",
  },
]

const Features = () => {
  return (
    <section className="features">

      {/* Top Tag */}
      <div className="features-tag">Designed for Impact</div>

      {/* Heading */}
      <h2 className="features-heading">
        Built for results. Powered by intelligence.
      </h2>

      {/* Subtext */}
      <p className="features-sub">
        Delivering growth through automation, clarity, and conversion-focused design.
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