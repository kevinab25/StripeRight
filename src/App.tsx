import { FormEvent, useMemo, useState } from 'react';

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

export default function App() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });

  const canSubmit = useMemo(() => form.name && form.email && form.phone && form.services.length > 0, [form]);

  const toggleService = (service: Service) => {
    setForm((current) => ({
      ...current,
      services: current.services.includes(service)
        ? current.services.filter((item) => item !== service)
        : [...current.services, service],
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSubmit) {
      setStatus({ type: 'error', message: 'Please complete required fields and choose at least one service.' });
      return;
    }

    setStatus({
      type: 'success',
      message: 'Thanks! Your request is ready to connect to a backend endpoint (email, CRM, or serverless function).',
    });
    setForm(initialForm);
  };

  return (
    <>
      <div className="bg-orb orb-1" />
      <div className="bg-orb orb-2" />

      <header className="site-header glass">
        <a href="#top" className="brand">StripeRight</a>
        <nav>
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#contact">Contact</a>
        </nav>
        <a href="#contact" className="btn btn-small">Get a Quote</a>
      </header>

      <main id="top">
        <section className="hero reveal active">
          <p className="tag">Trusted Parking Lot Care</p>
          <h1>Sharper Lines. Cleaner Concrete. Better First Impressions.</h1>
          <p className="lead">
            StripeRight helps property managers and business owners elevate curb appeal with professional stripe painting,
            concrete sealing, and pressure washing.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn">Book an Estimate</a>
            <a href="#services" className="btn btn-ghost">Explore Services</a>
          </div>
        </section>

        <section id="services" className="section reveal active">
          <div className="section-header">
            <p className="tag">Services</p>
            <h2>Everything your lot needs to stay safe and stand out.</h2>
          </div>
          <div className="cards">
            <article className="card"><h3>Stripe Painting</h3><p>Precision layout and high-visibility paint for stalls, ADA areas, fire lanes, and directional markings.</p></article>
            <article className="card"><h3>Concrete Sealing</h3><p>Durable protective sealing to reduce wear, repel moisture, and extend the life of paved surfaces.</p></article>
            <article className="card"><h3>Pressure Washing</h3><p>Deep-cleaning service that removes dirt, oils, and buildup from lots, curbs, and walkways.</p></article>
          </div>
        </section>

        <section id="process" className="section section-split reveal active">
          <div className="process-copy">
            <div>
              <p className="tag">How it Works</p>
              <h2>Fast scheduling. Professional finish. Minimal disruption.</h2>
            </div>
            <ol className="steps">
              <li><span>1</span>Quick site review and estimate.</li>
              <li><span>2</span>Clear preparation and schedule confirmation.</li>
              <li><span>3</span>Efficient service with quality walkthrough.</li>
            </ol>
          </div>
          <img
            className="process-image"
            src="/images/parking_lot_aerial.png"
            alt="Freshly striped parking lot viewed from above"
          />
        </section>

        <section id="contact" className="section reveal active">
          <div className="section-header">
            <p className="tag">Contact</p>
            <h2>Tell us about your project.</h2>
            <p>We usually respond within one business day.</p>
          </div>

          <form className="contact glass" onSubmit={handleSubmit}>
            <div className="field-grid">
              <label>Full Name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
              <label>Company<input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} /></label>
              <label>Email<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
              <label>Phone<input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></label>
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
              <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            </label>

            <div className="form-actions">
              <button className="btn" type="submit">Send Request</button>
              <p className={`status ${status.type === 'idle' ? '' : status.type}`}>{status.message}</p>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
