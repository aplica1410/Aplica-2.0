import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // 🔥 SCROLL FUNCTION
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

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
        <span onClick={() => scrollToSection("features")}>Features</span>
        <span onClick={() => scrollToSection("workflow")}>How It Works</span>
        <span onClick={() => scrollToSection("pricing")}>Pricing</span>
        <span onClick={() => scrollToSection("testimonials")}>Testimonials</span>
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
        <span onClick={() => { scrollToSection("features"); setMenuOpen(false); }}>
          Features
        </span>

        <span onClick={() => { scrollToSection("workflow"); setMenuOpen(false); }}>
          How It Works
        </span>

        <span onClick={() => { scrollToSection("pricing"); setMenuOpen(false); }}>
          Pricing
        </span>

        <span onClick={() => { scrollToSection("testimonials"); setMenuOpen(false); }}>
          Testimonials
        </span>

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