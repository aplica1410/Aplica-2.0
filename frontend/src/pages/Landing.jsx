import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import ScaleSection from "../components/sections/ScaleSection"
import WorkflowSection from "../components/sections/Workflow" // ✅ NEW
import Features from "../components/sections/Features"
import Pricing from "../components/sections/Pricing"
import Testimonials from "../components/sections/Testimonials"
import CTAFooter from "../components/sections/CTAFooter"

const Landing = () => {
  return (
    <div className="landing">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <section id="hero">
        <Hero />
      </section>

      {/* SCALE */}
      <section id="scale">
        <ScaleSection />
      </section>

      {/* 🔥 WORKFLOW (NEW SECTION - BEST POSITION) */}
      <section id="workflow">
        <WorkflowSection />
      </section>

      {/* FEATURES */}
      <section id="features">
        <Features />
      </section>

      {/* PRICING */}
      <section id="pricing">
        <Pricing />
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials">
        <Testimonials />
      </section>

      {/* CTA + FOOTER */}
      <section id="cta">
        <CTAFooter />
      </section>

    </div>
  )
}

export default Landing