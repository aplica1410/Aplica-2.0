import { useState } from "react"
import "./Pricing.css"

const plans = [
  {
    name: "Starter Plan",
    price: 3,
    desc: "Perfect for freelancers just starting out.",
    features: [
      "100 AI-generated email per month",
      "Email extraction from JD",
      "Portfolio & Social links",
      "Generation History",
    ],
    button: "Get Started",
  },
  {
    name: "Growth",
    price: 5,
    popular: true,
    desc: "For freelancers actively pitching clients.",
    features: [
      "200 AI-generated email per month",
      "Email extraction from JD",
      "Portfolio & Social links",
      "Generation History",
    ],
    button: "Start Scaling",
  },
  {
    name: "Scalepro Pro",
    price: 10,
    desc: "For power users landing clients at scale.",
    features: [
      "500 AI-generated email per month",
      "Email extraction from JD",
      "Portfolio & Social links",
      "Generation History",
    ],
    button: "Request Demo",
  },
]

const Pricing = () => {
  const [activePlan, setActivePlan] = useState(1)
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section className="pricing">

      {/* Tag */}
      <div className="pricing-tag">Pricing plan</div>

      {/* Heading */}
      <h2>Simple Pricing That Scales With You</h2>
      <p className="pricing-sub">
        No hidden fees. No long contracts. Just powerful automation — built for growth.
      </p>

      {/* Toggle */}
      <div className="toggle">
        <button
          className={!isYearly ? "active" : ""}
          onClick={() => setIsYearly(false)}
        >
          Monthly
        </button>
        <button
          className={isYearly ? "active" : ""}
          onClick={() => setIsYearly(true)}
        >
          Yearly <span>Save 20%</span>
        </button>
      </div>

      {/* Cards */}
      <div className="pricing-grid">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`pricing-card ${
              activePlan === index ? "active" : ""
            }`}
            onClick={() => setActivePlan(index)}
          >
            {plan.popular && <div className="badge">Most Popular</div>}

            <h3>{plan.name}</h3>

            <div className="price">
              ${isYearly ? Math.floor(plan.price * 0.8) : plan.price}
              <span>/month</span>
            </div>

            <p className="desc">{plan.desc}</p>

            <ul>
              {plan.features.map((f, i) => (
                <li key={i}>✓ {f}</li>
              ))}
            </ul>

            <button className="plan-btn">{plan.button}</button>
          </div>
        ))}
      </div>

    </section>
  )
}

export default Pricing