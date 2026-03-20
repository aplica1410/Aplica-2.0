import "./Testimonials.css"

const testimonials = [
  {
    name: "Richard Hendricks",
    role: "Founder at X",
    text: "Easily interpret your data. From interactive dashboards to detailed reports help you quickly identify trends, patterns, and opportunities.",
  },
  {
    name: "Mike Neeson",
    role: "Founder at X",
    text: "Easily interpret your data. From interactive dashboards to detailed reports help you quickly identify trends, patterns, and opportunities.",
  },
  {
    name: "Stephan King",
    role: "Founder at X",
    text: "Easily interpret your data. From interactive dashboards to detailed reports help you quickly identify trends, patterns, and opportunities.",
  },
]

const Testimonials = () => {
  return (
    <section className="testimonials">

      <h2>
        More than 2500 people across 400+ companies choose NeuralNova
      </h2>

      {/* SCROLLER */}
      <div className="scroll-wrapper">
        <div className="scroll-track">

          {[...testimonials, ...testimonials].map((t, i) => (
            <div className="testimonial-card" key={i}>
              
              {/* stars */}
              <div className="stars">★★★★★</div>

              <p className="text">“{t.text}”</p>

              <div className="user">
                <div className="avatar"></div>
                <div>
                  <h4>{t.name}</h4>
                  <span>{t.role}</span>
                </div>
              </div>

            </div>
          ))}

        </div>
      </div>

    </section>
  )
}

export default Testimonials