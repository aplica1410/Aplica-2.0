import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.svg"; // ✅ add this

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">

      {/* Logo */}
      <div
        className="logo"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="Aplica Logo" className="logo-img" />
      </div>

      {/* Desktop Nav */}
      <div className="nav-pill">
        <span>Features</span>
        <span>How It Works</span>
        <span>Pricing</span>
        <span>Testimonials</span>
      </div>

      <button
        className="cta-btn desktop-cta"
        onClick={() => navigate("/auth")}
      >
        Start Free Trial
      </button>

      {/* Mobile Hamburger */}
      <div
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <span onClick={() => setMenuOpen(false)}>Features</span>
        <span onClick={() => setMenuOpen(false)}>How It Works</span>
        <span onClick={() => setMenuOpen(false)}>Pricing</span>
        <span onClick={() => setMenuOpen(false)}>Testimonials</span>

        <button
          className="cta-btn mobile-cta"
          onClick={() => {
            setMenuOpen(false);
            navigate("/auth");
          }}
        >
          Start Free Trial
        </button>
      </div>
    </nav>
  );
};

export default Navbar;