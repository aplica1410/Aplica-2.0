import { useNavigate } from "react-router-dom"
import heroEnvelope from "../assets/Hero Section.svg"
import dashboard from "../assets/dashboard.png" // your dashboard image
import "./Hero.css"

const Hero = () => {
  const navigate = useNavigate()

  return (
    <section className="hero">

      {/* pill */}
      <div className="hero-pill">
        🚀 1000+ users worldwide
      </div>

      {/* heading */}
      <h1 className="hero-title">
        Apply Smarter <br />
        Get More Clients
      </h1>

      {/* subtitle */}
      <p className="hero-subtitle">
        AI-powered job & freelance applications that help you
        stand out, save time and win more work.
      </p>

      {/* CTA */}
      <button
        className="hero-btn"
        onClick={() => navigate("/auth")}
      >
        Start Free Trial
      </button>

      {/* 🔥 HERO VISUAL */}
      <div className="hero-visual">

        {/* dashboard */}
        <img
          src={dashboard}
          alt="dashboard"
          className="dashboard-img"
        />

        {/* envelope svg */}
        <img
          src={heroEnvelope}
          alt="envelope"
          className="envelope-img"
        />

      </div>

    </section>
  )
}

export default Hero