"use client";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import Link from "next/link";

export default function Services() {
  useScrollReveal();

  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="glow-orb glow-orb-gold" style={{ width: "500px", height: "500px", top: "-150px", left: "50%", transform: "translateX(-50%)", opacity: 0.4 }}></div>
        <div className="container">
          <div className="badge badge-gold" style={{ marginBottom: "1.25rem" }}>What We Offer</div>
          <h1 className="heading-xl page-hero-title reveal">Our <span className="text-gold">Services</span></h1>
          <p className="page-hero-subtitle reveal reveal-delay-1">Comprehensive consulting solutions designed to address every dimension of your business — from strategy to execution.</p>
        </div>
      </section>

      {/* SERVICES DETAIL */}
      <section className="section">
        <div className="container">
          <div className="services-detail-grid">

            {/* 1. Talent Acquisition & Recruitment */}
            <div className="card service-detail-card reveal reveal-delay-1" id="talent-acquisition">
              <div className="icon-box">
                <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <h3 className="heading-sm">Talent Acquisition &amp; Recruitment</h3>
              <p>Connecting the right talent with the right opportunities. We run structured recruitment campaigns, screening and pre-qualifying candidates to match them with positions where they will thrive.</p>
              <div className="service-features">
                <div className="service-feature">Volume &amp; Bulk Hiring Initiatives</div>
                <div className="service-feature">BPO &amp; ITES Specialization</div>
                <div className="service-feature">Customer Support, Telecalling &amp; Sales Hiring</div>
                <div className="service-feature">Non-IT &amp; Entry-Level Recruitment</div>
                <div className="service-feature">Work-From-Home (WFH) &amp; Remote Professionals</div>
              </div>
            </div>

            {/* 2. Strategic HR & Consulting Services */}
            <div className="card service-detail-card reveal reveal-delay-2" id="hr-consulting">
              <div className="icon-box">
                <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>
              </div>
              <h3 className="heading-sm">Strategic HR &amp; Consulting Services</h3>
              <p>Navigate complex workplace challenges and streamline your operations with the guidance of experienced HR advisors. We handle the entire recruitment lifecycle so you can focus on scaling your business.</p>
              <div className="service-features">
                <div className="service-feature">End-to-End Recruitment Process Support</div>
                <div className="service-feature">Precision Candidate Screening</div>
                <div className="service-feature">Interview &amp; HR Coordination</div>
                <div className="service-feature">Streamlined Vendor Management</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="section" style={{ background: "linear-gradient(180deg,rgba(13,18,48,0.5) 0%,transparent 100%)" }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">How We Work</div>
            <h2 className="heading-lg">Our Engagement Process</h2>
            <div className="gold-divider"></div>
            <p>A structured, transparent approach that keeps you informed and in control at every stage.</p>
          </div>
          <div className="process-steps">
            <div className="process-step reveal reveal-delay-1">
              <div className="step-number">01</div>
              <h4>Discovery</h4>
              <p>We conduct deep-dive consultations to fully understand your business, challenges, goals, and context before recommending anything.</p>
            </div>
            <div className="process-step reveal reveal-delay-2">
              <div className="step-number">02</div>
              <h4>Strategy</h4>
              <p>Our experts analyse findings and craft a bespoke strategic plan with clear milestones, KPIs, and ownership frameworks.</p>
            </div>
            <div className="process-step reveal reveal-delay-3">
              <div className="step-number">03</div>
              <h4>Execution</h4>
              <p>We embed alongside your team to drive implementation — providing hands-on support, tools, and guidance throughout delivery.</p>
            </div>
            <div className="process-step reveal reveal-delay-4">
              <div className="step-number">04</div>
              <h4>Review</h4>
              <p>We measure outcomes against targets, share transparent reporting, and refine our approach to maximise sustained results.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <div className="glow-orb glow-orb-gold" style={{ width: "400px", height: "400px", top: "-100px", left: "50%", transform: "translateX(-50%)", opacity: 0.3 }}></div>
            <h2 className="heading-lg reveal">Not Sure Which Service<br/><span className="text-gold">Is Right for You?</span></h2>
            <p>Book a free 30-minute discovery call. We'll listen to your challenges and recommend the right solution — no obligations, no pressure.</p>
            <div className="cta-actions">
              <Link href="/contact" className="btn btn-primary" id="services-cta">
                Book Free Consultation
                <svg className="btn-icon" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.75 9h10.5M9.75 4.5L14.25 9l-4.5 4.5"/></svg>
              </Link>
              <Link href="/testimonials" className="btn btn-outline" id="services-testimonials-link">Read Client Stories</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
