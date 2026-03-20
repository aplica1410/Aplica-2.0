import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import ScaleSection from "../components/sections/ScaleSection"
import Features from "../components/sections/Features"
import Pricing from "../components/sections/Pricing"
import Testimonials from "../components/sections/Testimonials"

const Landing = () => {
  return (
    <div className="landing">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <section id="hero">
        <Hero />
      </section>

      {/* SCALE (LIGHTNING) */}
      <section id="scale">
        <ScaleSection />
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

    </div>
  )
}

export default Landing