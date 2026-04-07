import { useNavigate } from "react-router-dom"
import "./Hero.css"

const Hero = () => {
  const navigate = useNavigate()

  return (
    <section className="hero">

      <div className="hero-container">

        {/* TOP TAG */}
        <div className="hero-pill">
          ✨ AI-powered outreach for freelancers
        </div>

        {/* HEADING */}
        <h1 className="hero-title">
          Paste a JD. <br />
          <span>Land the client.</span>
        </h1>

        {/* SUBTEXT */}
        <p className="hero-subtitle">
          Aplica reads any job description, extracts the client’s email,
          generates a personalized outreach email in seconds, and links your
          portfolio automatically.
        </p>

        {/* BUTTONS */}
        <div className="hero-actions">
          <button
            className="primary-btn"
              onClick={() => {
    console.log("clicked");
    navigate("/auth");
  }}
          >
            Start Generating for Free →
          </button>

          <button
  className="secondary-btn"
  onClick={() => {
    document.getElementById("workflow")?.scrollIntoView({
      behavior: "smooth",
    });
  }}
>
  See How It Works
</button>
        </div>

        {/* SOCIAL PROOF */}
        <p className="hero-proof">
          <span className="highlight">500+</span> freelancers already pitching smarter
        </p>

      </div>

    </section>
  )
}

export default Hero