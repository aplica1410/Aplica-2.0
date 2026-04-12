import "./CTAFooter.css";
import { useNavigate } from "react-router-dom";

const CTAFooter = () => {
  const navigate = useNavigate();

  return (
    <section className="cta-footer">

      {/* CTA BOX */}
      <div className="cta-box">

        <h2>
          Start landing more clients <span>today</span>
        </h2>

        <p>
          Set up in under 2 minutes. No credit card required to try — just paste your first JD and see what Aplica does.
        </p>

        <div className="cta-actions">
          <button className="primary">Get Started Now</button>
          <button className="secondary">Try Aplica →</button>
        </div>

      </div>

      {/* GLOW LINE */}
      <div className="footer-glow"></div>

      {/* FOOTER */}
      <footer className="footer">

        <div className="footer-left">
          <div className="logo">Aplica</div>
          <p>Build freelancers who want to work smarter.</p>

          <div className="socials">
            <span>f</span>
            <span>in</span>
            <span>t</span>
            <span>ig</span>
          </div>
        </div>

        <div className="footer-links">
          <div>
            <h4>Product</h4>
            <span>Features</span>
            <span>How it works</span>
            <span>Pricing</span>
            <span>Testimonials</span>
          </div>

          <div>
            <h4>Company</h4>
            <span>About Us</span>
            <span>Careers</span>
            <span>Blog</span>
            <span>Contact</span>
          </div>

          <div>
            <h4>Resources</h4>

            <span>Help Center</span>
            <span>API Docs</span>

            {/* ✅ CONNECTED LINKS */}
            <span
              className="footer-link"
              onClick={() => navigate("/privacy-policy")}
            >
              Privacy Policy
            </span>

            <span
              className="footer-link"
              onClick={() => navigate("/terms")}
            >
              Terms of Service
            </span>

          </div>
        </div>

      </footer>

      <div className="copyright">
        © 2026 Aplica. All rights reserved.
      </div>

    </section>
  );
};

export default CTAFooter;