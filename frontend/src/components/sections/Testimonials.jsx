import "./Testimonials.css"

// ✅ import images
import t1 from "../../assets/T1.jpeg"
import t2 from "../../assets/T2.jpeg"
import t3 from "../../assets/T3.jpeg"
import t4 from "../../assets/T4.jpeg"
import t5 from "../../assets/T5.jpeg"

const testimonials = [
  {
    name: "Sanya Dixit",
    role: "Social Media Manager",
    text: "Aplica helped me connect with brands that actually value strategy, not just cheap content.",
    image: t1,
  },
  {
    name: "Raviraj Srivastava",
    role: "UI Designer",
    text: "Aplica completely changed how I find clients. Instead of copy pasting responses from ChatGPT, I could give more time on learning and doing actual work.",
    image: t2,
  },
  {
    name: "Abhishek Sharma",
    role: "Graphic Designer",
    text: "Finding consistent work is tough. With Aplica, I could actually land some gigs finally and save my time.",
    image: t3,
  },
  {
    name: "Sanjam Kaur",
    role: "Content Writer",
    text: "I love how simple everything is. And actually saves my time.",
    image: t4,
  },
  {
    name: "Vidhi Rawat",
    role: "Web Developer",
    text: "Easy to use, and actually works. I was able to land a client within 2 days of using Aplica.",
    image: t5,
  },
]

const Testimonials = () => {
  return (
    <section className="testimonials">

      <h2>
        More than 300 Freelancers have tested Aplica. Here’s what they say:
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

                {/* ✅ IMAGE AVATAR */}
                <img src={t.image} alt={t.name} className="avatar" />

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