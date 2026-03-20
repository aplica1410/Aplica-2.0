import "./CTAFooter.css"

const CTAFooter = () => {
  return (
    <section className="cta-footer">

      {/* CTA BOX */}
      <div className="cta-box">

        <h2>
          Ready to Accelerate Your <span>Growth?</span>
        </h2>

        <p>
          Launch smarter campaigns, convert more leads, and scale your business
          with ease — all in one place.
        </p>

        <div className="cta-actions">
          <button className="primary">Get Started Now</button>
          <button className="secondary">Book a Demo</button>
        </div>

      </div>

      {/* GLOW LINE */}
      <div className="footer-glow"></div>

      {/* FOOTER */}
      <footer className="footer">

        <div className="footer-left">
          <div className="logo">Scalepro</div>
          <p>Smarter campaigns. Faster growth.</p>

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
            <span>Pricing</span>
            <span>Integrations</span>
            <span>Dashboard Demo</span>
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
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>

      </footer>

      <div className="copyright">
        © 2025 Scalepro. All rights reserved.
      </div>

    </section>
  )
}

export default CTAFooter