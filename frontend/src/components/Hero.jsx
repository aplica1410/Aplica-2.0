import { useNavigate } from "react-router-dom"
import "./Hero.css"

const Hero = () => {
  const navigate = useNavigate()

  return (
    <section className="hero">

      {/* Top pill */}
      <div className="hero-pill">
        Built for freelancers, job seekers & creators
      </div>

      {/* Main heading */}
      <h1 className="hero-title">
        Apply <span>Smarter</span><br />
        Get <span>More</span> Clients.
      </h1>

      {/* Subtitle */}
      <p className="hero-subtitle">
        AI-powered job & freelance applications that help you
        stand out, save time and win more work.
      </p>

      {/* Social proof card */}
      <div className="hero-proof">
        <div className="avatars">
          <img src="https://i.pravatar.cc/40?img=12" alt="user1" />
          <img src="https://i.pravatar.cc/40?img=32" alt="user2" />
          <img src="https://i.pravatar.cc/40?img=47" alt="user3" />
        </div>

        <p>
          Helping <strong>1,000+</strong> freelancers land<br />
          upto <strong>10X</strong> more work, faster
        </p>
      </div>

      {/* CTA buttons */}
      <div className="hero-actions">
        <button
          className="primary-btn"
          onClick={() => navigate("/auth")}
        >
          Start Free Trial
        </button>

        <button className="secondary-btn">
          How It Works
        </button>
      </div>

    </section>
  )
}

export default Hero
