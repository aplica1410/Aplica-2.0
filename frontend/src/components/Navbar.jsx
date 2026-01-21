import { useNavigate } from "react-router-dom"
import "./Navbar.css"

const Navbar = () => {
  const navigate = useNavigate()

  return (
    <nav className="navbar">
      <div className="logo">Aplica</div>

      <div className="nav-pill">
        <span>Features</span>
        <span>How It Works</span>
        <span>Pricing</span>
        <span>Testimonials</span>
      </div>

      <button className="cta-btn" onClick={() => navigate("/auth")}>
        Start Free Trial
      </button>
    </nav>
  )
}

export default Navbar
