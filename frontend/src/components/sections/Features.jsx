import "./Features.css"

const features = [
  {
    title: "Extract Client Email",
    desc: "Drop in any job posting and Aplica automatically pulls out the client’s contact email—no copy-pasting, no hunting.",
  },
  {
    title: "AI-Personalized Email",
    desc: "Powered by GPT, every email references real details from the JD—company name, project type, specific requirements—never generic.",
  },
  {
    title: "Auto-Links Your Work",
    desc: "Your portfolio, GitHub, LinkedIn, and other links are woven into every email signature automatically.",
  },
  {
    title: "Subject Line Included",
    desc: "A sharp, relevant subject line is generated alongside the email—ready to paste directly into your inbox.",
  },
  {
    title: "One-Click Copy",
    desc: "Copy the email body or open it directly in your mail client with a single click. Zero friction between you and sending.",
  },
    {
    title: "History Saved",
    desc: "Every generated email is stored so you can revisit, tweak, or reference past pitches anytime.",
  },
]

const Features = () => {
  return (
    <section className="features">

      {/* Top Tag */}
      <div className="features-tag">Engineered for Outreach</div>

      {/* Heading */}
      <h2 className="features-heading">
        Everything you need to pitch faster
      </h2>

      {/* Subtext */}
      <p className="features-sub">
        From extracting emails to sending polished pitches – Aplica handles the tedious parts so you can focus on doing great work.
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