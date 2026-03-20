import { useState } from "react"
import "./Pricing.css"

const plans = [
  {
    name: "Starter Plan",
    price: 29,
    desc: "Perfect for solo founders and small teams just getting started.",
    features: [
      "Up to 500 contacts",
      "1 user seat",
      "Basic automation flows",
      "Email + LinkedIn sequences",
      "Dashboard analytics",
      "Standard support",
    ],
    button: "Get Started",
  },
  {
    name: "Growth",
    price: 129,
    popular: true,
    desc: "For growing teams that need more reach and smarter insights.",
    features: [
      "Up to 5,000 contacts",
      "5 user seats",
      "Advanced automation builder",
      "Multi-channel outreach",
      "Lead scoring + AI optimization",
      "Priority support",
    ],
    button: "Start Scaling",
  },
  {
    name: "Scalepro Pro",
    price: 229,
    desc: "Designed for sales-heavy orgs and enterprise teams.",
    features: [
      "Unlimited contacts",
      "20+ user seats",
      "AI-driven workflows",
      "CRM + Slack integrations",
      "Webhooks & API access",
      "Dedicated account manager",
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