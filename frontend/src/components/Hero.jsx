import { useNavigate } from "react-router-dom"
import heroEnvelope from "../assets/Hero Section.svg"
import "./Hero.css"

const Hero = () => {
  const navigate = useNavigate()

  return (
    <section className="hero">

      {/* TOP PILL */}
      <div className="hero-pill">
        🚀 1000+ users worldwide
      </div>

      {/* HEADING */}
      <h1 className="hero-title">
        Apply Smarter <br />
        Get More Clients
      </h1>

      {/* SUBTITLE */}
      <p className="hero-subtitle">
        AI-powered job & freelance applications that help you
        stand out, save time and win more work.
      </p>

      {/* CTA BUTTON */}
      <button
        className="hero-btn"
        onClick={() => navigate("/auth")}
      >
        Start Free Trial
      </button>

      {/* HERO VISUAL (SVG ONLY) */}
      <div className="hero-visual">
        <img
          src={heroEnvelope}
          alt="hero visual"
          className="envelope-img"
        />
      </div>

    </section>
  )
}

export default Hero