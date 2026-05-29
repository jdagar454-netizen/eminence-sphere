"use client";
import Link from "next/link";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import ContactForm from "../../components/ContactForm";

export default function Contact() {
  useScrollReveal();
  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="glow-orb glow-orb-gold" style={{ width: "500px", height: "500px", top: "-150px", left: "50%", transform: "translateX(-50%)", opacity: 0.4 }}></div>
        <div className="container">
          <div className="badge badge-gold" style={{ marginBottom: "1.25rem" }}>Let's Talk</div>
          <h1 className="heading-xl page-hero-title reveal">Get in <span className="text-gold">Touch</span></h1>
          <p className="page-hero-subtitle reveal reveal-delay-1">Whether you're ready to engage or just exploring your options, we'd love to hear from you. Your first consultation is always free.</p>
        </div>
      </section>

      {/* CONTACT LAYOUT */}
      <section className="section" style={{ paddingTop: "2rem" }}>
        <div className="container">
          <div className="contact-layout">

            {/* LEFT: Info */}
            <div className="contact-info reveal">
              <h2 className="heading-md">We're Here to Help</h2>
              <p>Reach out through any channel below, or fill in the form and one of our consultants will respond within one business day.</p>

              <div className="contact-details">
                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <svg viewBox="0 0 18 18"><path d="M9 1C5.7 1 3 3.7 3 7c0 4.4 6 10 6 10s6-5.6 6-10c0-3.3-2.7-6-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z"/></svg>
                  </div>
                  <div>
                    <div className="contact-detail-label">Office Address</div>
                    <div className="contact-detail-value">84, Rohta Road, Meerut<br/>Uttar Pradesh, IN 250502</div>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <svg viewBox="0 0 18 18"><path d="M2 3h14a1 1 0 011 1v9a1 1 0 01-1 1H2a1 1 0 01-1-1V4a1 1 0 011-1z"/><path d="M1 4.5l8 5.5 8-5.5"/></svg>
                  </div>
                  <div>
                     <div className="contact-detail-label">General &amp; HR Email</div>
                     <div className="contact-detail-value">hr@eminencesphere.online</div>
                     <div className="contact-detail-label" style={{ marginTop: "0.75rem" }}>Jobs Hiring &amp; Talent Hunting Queries</div>
                     <div className="contact-detail-value">info@eminencesphere.online</div>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <svg viewBox="0 0 18 18"><path d="M16.5 13.5l-2-2a1.4 1.4 0 00-2 0l-1 1C10 12 8 10 7.5 8.5l1-1a1.4 1.4 0 000-2l-2-2a1.4 1.4 0 00-2 0C3 4 3 8.5 8.5 14S14 16.5 15.5 15a1.4 1.4 0 001-1.5z"/></svg>
                  </div>
                  <div>
                    <div className="contact-detail-label">Phone Number</div>
                    <div className="contact-detail-value">+91 121 315 9030</div>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon" style={{ backgroundColor: '#25D366' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                  </div>
                  <div>
                    <div className="contact-detail-label">WhatsApp Quick Connect</div>
                    <div className="contact-detail-value">
                      <a href="https://wa.me/918791147964" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', fontWeight: '600', textDecoration: 'underline' }}>
                        Chat with Recruitment Team
                      </a>
                    </div>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <svg viewBox="0 0 18 18"><circle cx="9" cy="9" r="7"/><path d="M9 5v4l2.5 2.5"/></svg>
                  </div>
                  <div>
                    <div className="contact-detail-label">Business Hours</div>
                    <div className="contact-detail-value">Monday – Friday: 8:00am – 6:00pm<br/>Saturday – Sunday: Closed</div>
                  </div>
                </div>
              </div>

              {/* Why reach out callout */}
              <div className="card" style={{ marginTop: "2.5rem", padding: "1.75rem" }}>
                <div className="section-tag" style={{ justifyContent: "flex-start", marginBottom: "0.75rem" }}>Free Consultation</div>
                <h4 className="heading-sm" style={{ marginBottom: "0.5rem" }}>No Obligation. No Pressure.</h4>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.7 }}>Your initial consultation is completely free. We'll listen to your challenges, ask the right questions, and give you our honest assessment — whether or not you engage us.</p>
              </div>
            </div>

            {/* RIGHT: Form */}
            <div className="reveal reveal-delay-2">
              <div className="contact-form-card">
                <div className="contact-form-title">Send Us a Message</div>
                <div className="contact-form-subtitle">Fill in the form below and we'll get back to you within one business day.</div>

                <ContactForm />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MAP / LOCATION BLOCK */}
      <section style={{ paddingBottom: "6rem" }}>
        <div className="container">
          <div className="card" style={{ padding: 0, overflow: "hidden", borderRadius: "var(--radius-xl)" }}>
            <div style={{ background: "var(--color-bg-2)", padding: "2rem 2.5rem", borderBottom: "1px solid var(--color-border)", display: "flex", alignItems: "center", gap: "1rem" }}>
              <div className="contact-detail-icon" style={{ flexShrink: 0 }}>
                <svg viewBox="0 0 18 18"><path d="M9 1C5.7 1 3 3.7 3 7c0 4.4 6 10 6 10s6-5.6 6-10c0-3.3-2.7-6-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z"/></svg>
              </div>
              <div>
                <div style={{ fontWeight: 600 }}>Our Location</div>
                <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>84, Rohta Road, Meerut, Uttar Pradesh, IN 250502</div>
              </div>
            </div>
            {/* Decorative map placeholder */}
            <div style={{ height: "320px", background: "linear-gradient(135deg,var(--navy-light) 0%,var(--navy-mid) 100%)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 2px 2px,rgba(201,168,76,0.1) 1px,transparent 0)", backgroundSize: "36px 36px" }}></div>
              <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                <div style={{ width: "64px", height: "64px", background: "var(--gold-gradient)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", boxShadow: "0 0 40px rgba(201,168,76,0.4)" }}>
                  <svg width="28" height="28" viewBox="0 0 18 18" fill="none" stroke="#07091C" strokeWidth="1.5" strokeLinecap="round"><path d="M9 1C5.7 1 3 3.7 3 7c0 4.4 6 10 6 10s6-5.6 6-10c0-3.3-2.7-6-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z"/></svg>
                </div>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.25rem" }}>Eminence Sphere HQ</div>
                <div style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>84, Rohta Road, Meerut, Uttar Pradesh, IN 250502</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
