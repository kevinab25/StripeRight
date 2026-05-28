import { FormEvent, useEffect, useMemo, useState } from 'react';

type Service = 'Stripe Painting' | 'Concrete Sealing' | 'Pressure Washing';

type ContactForm = {
  name: string;
  company: string;
  email: string;
  phone: string;
  services: Service[];
  message: string;
};

const serviceOptions: Service[] = ['Stripe Painting', 'Concrete Sealing', 'Pressure Washing'];

const initialForm: ContactForm = {
  name: '',
  company: '',
  email: '',
  phone: '',
  services: [],
  message: '',
};

const faqs = [
  {
    question: 'How fast can you respond to a quote request?',
    answer:
      "We typically respond the same day or within one business day. If it's urgent, give us a call — we pick up.",
  },
  {
    question: 'What areas do you serve?',
    answer:
      "We serve the greater local Atlanta area and suburbs. Not sure if we cover your location? Just reach out — we're always willing to work something out.",
  },
  {
    question: 'Do you require a deposit?',
    answer:
      "Deposit requirements depend on the scope of the job. We'll be completely upfront about costs and payment before you commit to anything.",
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      "We accept cash, check, and major credit cards. We'll discuss payment terms when we confirm your project.",
  },
  {
    question: 'Is there a contract?',
    answer:
      'For most jobs we provide a simple written estimate and agreement so expectations are clear on both sides. No hidden fine print.',
  },
  {
    question: 'What if something needs a touch-up after the job?',
    answer:
      "We stand behind our work. If something doesn't look right after we leave, reach out and we'll make it right — that's our commitment.",
  },
];

export default function App() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const canSubmit = useMemo(
    () => !!(form.name && form.email && form.phone && form.services.length > 0),
    [form],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('active')),
      { threshold: 0.08 },
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleService = (service: Service) => {
    setForm((current) => ({
      ...current,
      services: current.services.includes(service)
        ? current.services.filter((item) => item !== service)
        : [...current.services, service],
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) {
      setStatus({ type: 'error', message: 'Please fill in required fields and pick at least one service.' });
      return;
    }

    setStatus({ type: 'idle', message: 'Sending…' });

    try {
      const res = await fetch('https://formspree.io/f/mwvzvanv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          company: form.company,
          email: form.email,
          phone: form.phone,
          services: form.services.join(', '),
          message: form.message,
        }),
      });

      if (res.ok) {
        setStatus({ type: 'success', message: "Thanks! We'll be in touch within one business day." });
        setForm(initialForm);
      } else {
        setStatus({ type: 'error', message: 'Something went wrong. Please call or email us directly.' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Could not send — please call or email us directly.' });
    }
  };

  return (
    <>
      {/* HEADER */}
      <header className="site-header">
        <a href="#top" className="brand">
          <img src="/images/logo.png" alt="StripeRight" className="logo" />
        </a>
        <nav>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#process">Process</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="header-right">
          <a href="tel:9543006026" className="header-phone">(954) 300-6026</a>
          <a href="#contact" className="btn btn-small">Get a Quote</a>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero reveal">
          <div className="container">
            <p className="tag">Parking Lot Specialists</p>
            <h1>Sharper Lines.<br />Cleaner Lots.<br />Real People.</h1>
            <p className="lead">
              Professional stripe painting, concrete sealing, and pressure washing — done right, every time.
            </p>
            <p className="lead-sub">
              We're a small, dedicated team. We may be growing — but we outwork everyone and treat every
              customer like our first.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn">Book an Estimate</a>
              <a href="#services" className="btn btn-outline">Our Services</a>
            </div>
          </div>
        </section>

        {/* WHY US */}
        <section className="section alt reveal">
          <div className="container">
            <div className="section-header">
              <p className="tag">Why StripeRight</p>
              <h2>Small enough to care. Hungry enough to deliver.</h2>
            </div>
            <div className="cards three">
              <article className="card">
                <div className="card-accent" />
                <h3>Responsive</h3>
                <p>You won't wait days to hear back. We pick up, we show up, and we follow through — every time.</p>
              </article>
              <article className="card">
                <div className="card-accent" />
                <h3>Hands-On</h3>
                <p>Every job is handled personally by our team. No subcontracting, no shortcuts, no surprises.</p>
              </article>
              <article className="card">
                <div className="card-accent" />
                <h3>Hungry to Grow</h3>
                <p>We're building our reputation through real results. Every job matters because every customer matters.</p>
              </article>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="section reveal">
          <div className="container">
            <div className="section-header">
              <p className="tag">Services</p>
              <h2>Everything your lot needs to stay safe and look great.</h2>
            </div>
            <div className="cards three">
              <article className="card">
                <h3>Stripe Painting</h3>
                <p>Precision layout and high-visibility paint for stalls, ADA areas, fire lanes, and directional markings.</p>
              </article>
              <article className="card">
                <h3>Concrete Sealing</h3>
                <p>Durable protective sealing to reduce wear, repel moisture, and extend the life of paved surfaces.</p>
              </article>
              <article className="card">
                <h3>Pressure Washing</h3>
                <p>Deep-cleaning service that removes dirt, oils, and buildup from lots, curbs, and walkways.</p>
              </article>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section alt reveal">
          <div className="container">
            <div className="about-grid">
              <div className="about-copy">
                <p className="tag">About Us</p>
                <h2>We started StripeRight to do things the right way.</h2>
                <p>
                  We saw an opportunity to bring better communication, more flexibility, and genuine care to
                  the parking lot industry. Better service doesn't have to come with a corporate price tag or a
                  long wait time.
                </p>
                <p>
                  We're still growing, and that means every customer matters to us. We're committed to building
                  trust through consistency, transparency, and hard work — on every single job, big or small.
                </p>
                <p>
                  When you call us, you're talking to the people who will actually do the work. No layers. No
                  runaround. Just real service from a team that cares about getting it right.
                </p>
                <a href="#contact" className="btn" style={{ marginTop: '0.5rem' }}>Work With Us</a>
              </div>
              <div className="about-visual">
                <div className="about-placeholder">
                  <span>Team photo coming soon</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="section reveal">
          <div className="container">
            <div className="section-header">
              <p className="tag">How It Works</p>
              <h2>Three steps. Zero confusion.</h2>
            </div>
            <div className="process-steps">
              <div className="process-step">
                <div className="step-num">1</div>
                <h3>Contact Us</h3>
                <p>Reach out by call, text, or the form below. We'll respond quickly — usually same day.</p>
              </div>
              <div className="process-step">
                <div className="step-num">2</div>
                <h3>Get Your Estimate</h3>
                <p>We review your lot, give you a clear quote, and schedule a time that works for you.</p>
              </div>
              <div className="process-step">
                <div className="step-num">3</div>
                <h3>We Handle the Rest</h3>
                <p>Our team shows up on time, does the job right, and walks you through everything when done.</p>
              </div>
            </div>
            <img
              className="process-image reveal"
              src="/images/parking_lot_aerial.png"
              alt="Freshly striped parking lot viewed from above"
            />
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="section alt reveal">
          <div className="container">
            <div className="section-header">
              <p className="tag">What Clients Say</p>
              <h2>Real results. Honest feedback.</h2>
            </div>
            <div className="cards three">
              <article className="card testimonial">
                <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <p className="testimonial-text">
                  "Super responsive and easy to work with. They showed up exactly when they said they would and did a great job."
                </p>
                <p className="testimonial-author">— Sarah M.</p>
              </article>
              <article className="card testimonial">
                <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <p className="testimonial-text">
                  "Everything was done on time and exactly as described. My lot looks brand new — very happy with the results."
                </p>
                <p className="testimonial-author">— Kevin R.</p>
              </article>
              <article className="card testimonial">
                <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <p className="testimonial-text">
                  "Hired them for stripe painting and concrete sealing. Excellent work, fair pricing, and very professional."
                </p>
                <p className="testimonial-author">— Maria L.</p>
              </article>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="section reveal">
          <div className="container">
            <div className="section-header">
              <p className="tag">FAQ</p>
              <h2>Common questions, straightforward answers.</h2>
            </div>
            <div className="faq-list">
              {faqs.map((faq, i) => (
                <div key={i} className={`faq-item${openFaq === i ? ' open' : ''}`}>
                  <button
                    className="faq-question"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span>{faq.question}</span>
                    <span className="faq-icon">{openFaq === i ? '−' : '+'}</span>
                  </button>
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section alt reveal">
          <div className="container">
            <div className="section-header">
              <p className="tag">Get in Touch</p>
              <h2>Tell us about your project.</h2>
              <p className="section-sub">We usually respond within one business day. Prefer to talk? Give us a call.</p>
            </div>

            <div className="contact-layout">
              <div className="contact-info">
                <div className="contact-item">
                  <strong>Phone / Text</strong>
                  <a href="tel:9548805733">(954) 880-5733</a>
                </div>
                <div className="contact-item">
                  <strong>Email</strong>
                  <a href="mailto:thestripeworks@gmail.com">thestripeworks@gmail.com</a>
                </div>
                <div className="contact-item">
                  <strong>Response Time</strong>
                  <span>Usually within 1 business day</span>
                </div>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="field-grid">
                  <label>
                    Full Name *
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </label>
                  <label>
                    Company
                    <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                  </label>
                  <label>
                    Email *
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </label>
                  <label>
                    Phone *
                    <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </label>
                </div>

                <label>
                  Services Needed
                  <div className="check-grid">
                    {serviceOptions.map((service) => (
                      <label key={service} className="check-item">
                        <input
                          type="checkbox"
                          checked={form.services.includes(service)}
                          onChange={() => toggleService(service)}
                        />
                        {service}
                      </label>
                    ))}
                  </div>
                </label>

                <label>
                  Project Details
                  <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                </label>

                <div className="form-actions">
                  <button className="btn" type="submit" disabled={!canSubmit}>Send Request</button>
                  {status.type !== 'idle' && (
                    <p className={`status ${status.type}`}>{status.message}</p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <a href="#top" className="brand">StripeRight</a>
            <p>Professional parking lot services. Serving your area with pride.</p>
          </div>
          <nav className="footer-nav">
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#process">Process</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="footer-contact">
            <a href="tel:9548805733">(954) 880-5733</a>
            <a href="mailto:thestripeworks@gmail.com">thestripeworks@gmail.com</a>
          </div>
        </div>
        <div className="footer-copy">
          <div className="container">2025 StripeRight. All rights reserved.</div>
        </div>
      </footer>

      <a href="#contact" className="sticky-quote">Get a Quote</a>
    </>
  );
}
