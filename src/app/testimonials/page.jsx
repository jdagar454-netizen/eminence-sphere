"use client";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import Link from "next/link";
import AnimatedCounter from "../../components/AnimatedCounter";

export default function Testimonials() {
  useScrollReveal();

  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="glow-orb glow-orb-gold" style={{ width: "500px", height: "500px", top: "-150px", left: "50%", transform: "translateX(-50%)", opacity: 0.4 }}></div>
        <div className="container">
          <div className="badge badge-gold" style={{ marginBottom: "1.25rem" }}>Client Stories</div>
          <h1 className="heading-xl page-hero-title reveal">What Our <span className="text-gold">Clients Say</span></h1>
          <p className="page-hero-subtitle reveal reveal-delay-1">Real results. Real people. Hear directly from the businesses we've helped transform.</p>
        </div>
      </section>

      {/* STATS STRIP */}
      <section style={{ paddingBottom: "4rem" }}>
        <div className="container">
          <div className="stats-grid reveal">
            <div className="stat-item">
              <AnimatedCounter target="50" suffix="+" className="stat-number" />
              <div className="stat-label">Happy Clients</div>
            </div>
            <div className="stat-item">
              <AnimatedCounter target="91" suffix="%" className="stat-number" />
              <div className="stat-label">Would Recommend Us</div>
            </div>
            <div className="stat-item">
              <AnimatedCounter target="4.9" suffix="/5" className="stat-number" />
              <div className="stat-label">Average Rating</div>
            </div>
            <div className="stat-item">
              <AnimatedCounter target="85" suffix="%" className="stat-number" />
              <div className="stat-label">Repeat Engagements</div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS GRID */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Testimonials</div>
            <h2 className="heading-lg">Voices of Success</h2>
            <div className="gold-divider"></div>
          </div>
          <div className="testimonials-full-grid">

            <div className="card testimonial-card">
              <div className="quote-mark">"</div>
              <p className="testimonial-text">The placement process at Eminence Sphere was exceptional. They mapped my skills perfectly to a Senior Customer Support Representative role, and the support I received during transition was outstanding.</p>
              <div className="testimonial-author">
                <div className="author-avatar">CA</div>
                <div>
                  <div className="author-name">Chhavi Attri</div>
                  <div className="author-title">Senior Customer Support Representative</div>
                </div>
              </div>
            </div>

            <div className="card testimonial-card">
              <div className="quote-mark">"</div>
              <p className="testimonial-text">Eminence Sphere helped me land my dream role as a Senior Customer Support Representative. Their team is highly professional and guided me at every step of the recruitment journey.</p>
              <div className="testimonial-author">
                <div className="author-avatar">NT</div>
                <div>
                  <div className="author-name">Nitika Tyagi</div>
                  <div className="author-title">Senior Customer Support Representative</div>
                </div>
              </div>
            </div>

            <div className="card testimonial-card">
              <div className="quote-mark">"</div>
              <p className="testimonial-text">Eminence Sphere's remote work placements are second to none. They made transitioning to a Virtual Senior Customer Support Representative role seamless and stress-free.</p>
              <div className="testimonial-author">
                <div className="author-avatar">PS</div>
                <div>
                  <div className="author-name">Prince Saroha</div>
                  <div className="author-title">Virtual Senior Customer Support Representative</div>
                </div>
              </div>
            </div>

            <div className="card testimonial-card">
              <div className="quote-mark">"</div>
              <p className="testimonial-text">My career trajectory changed completely after associating with Eminence Sphere. The interview coaching and training program prepared me for exact scenarios. Highly recommended!</p>
              <div className="testimonial-author">
                <div className="author-avatar">NC</div>
                <div>
                  <div className="author-name">Nikku</div>
                  <div className="author-title">Special Client of Eminence</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="section" style={{ background: "linear-gradient(180deg,rgba(13,18,48,0.5) 0%,transparent 100%)" }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Case Studies</div>
            <h2 className="heading-lg">Results That Speak<br/>for Themselves</h2>
            <div className="gold-divider"></div>
            <p>A selection of impactful engagements across key service areas.</p>
          </div>
          <div className="testimonials-full-grid">

            <div className="case-study-card reveal reveal-delay-1">
              <div className="case-study-header">
                <div className="case-study-icon">
                  <svg viewBox="0 0 22 22"><path d="M11 2L2 6v6c0 5.5 4 10.7 9 12 5-1.3 9-6.5 9-12V6l-9-4z"/></svg>
                </div>
                <div className="case-study-meta">
                  <h3>Operational Turnaround</h3>
                  <span>Manufacturing Sector</span>
                </div>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: ".9375rem", lineHeight: 1.75 }}>A mid-sized manufacturer approached us with declining margins and operational inefficiencies. We conducted a full operational audit, redesigned key processes, and implemented a performance management system — delivering a complete financial turnaround in under a year.</p>
              <div className="case-study-result">
                <div className="result-stat">
                  <div className="result-value">34%</div>
                  <div className="result-label">Cost Reduction</div>
                </div>
                <div className="result-stat">
                  <div className="result-value">8mo</div>
                  <div className="result-label">Time to Results</div>
                </div>
                <div className="result-stat">
                  <div className="result-value">+₹15Cr</div>
                  <div className="result-label">Annual Savings</div>
                </div>
              </div>
            </div>

            <div className="case-study-card reveal reveal-delay-2">
              <div className="case-study-header">
                <div className="case-study-icon">
                  <svg viewBox="0 0 24 24"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/><path d="M21 15a2 2 0 0 1-2 2h-5"/></svg>
                </div>
                <div className="case-study-meta">
                  <h3>Support Team Scaling</h3>
                  <span>E-Commerce Sector</span>
                </div>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: ".9375rem", lineHeight: 1.75 }}>A scaling e-commerce brand needed to build a 24/7 customer support operation for their peak holiday season. We sourced, trained, and placed 45+ customer support representatives within 4 weeks, maintaining a 94% CSAT.</p>
              <div className="case-study-result">
                <div className="result-stat">
                  <div className="result-value">45+</div>
                  <div className="result-label">Agents Placed</div>
                </div>
                <div className="result-stat">
                  <div className="result-value">4wks</div>
                  <div className="result-label">Ramp Time</div>
                </div>
                <div className="result-stat">
                  <div className="result-value">94%</div>
                  <div className="result-label">CSAT Maintained</div>
                </div>
              </div>
            </div>

            <div className="case-study-card reveal reveal-delay-1">
              <div className="case-study-header">
                <div className="case-study-icon">
                  <svg viewBox="0 0 22 22"><path d="M11 2C6.5 6 5 8.5 5 11s1.5 5 6 9c4.5-4 6-6.5 6-9s-1.5-5-6-9z"/></svg>
                </div>
                <div className="case-study-meta">
                  <h3>Multi-Market Expansion</h3>
                  <span>Retail Sector</span>
                </div>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: ".9375rem", lineHeight: 1.75 }}>An established retail brand sought to expand into three new markets simultaneously. We managed the full expansion strategy — market entry analysis, regulatory compliance, brand localisation, and operational setup — delivering on-time, on-budget market launches.</p>
              <div className="case-study-result">
                <div className="result-stat">
                  <div className="result-value">3</div>
                  <div className="result-label">New Markets</div>
                </div>
                <div className="result-stat">
                  <div className="result-value">100%</div>
                  <div className="result-label">On-Time Launch</div>
                </div>
                <div className="result-stat">
                  <div className="result-value">+62%</div>
                  <div className="result-label">Revenue Growth</div>
                </div>
              </div>
            </div>

            <div className="case-study-card reveal reveal-delay-2">
              <div className="case-study-header">
                <div className="case-study-icon">
                  <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                </div>
                <div className="case-study-meta">
                  <h3>Global Support Desk</h3>
                  <span>SaaS Sector</span>
                </div>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: ".9375rem", lineHeight: 1.75 }}>A fast-growing SaaS firm needed to outsource and standardise their tier-1 support operations. We established a virtual dedicated support desk with remote customer support representatives, streamlining ticket resolutions.</p>
              <div className="case-study-result">
                <div className="result-stat">
                  <div className="result-value">35%</div>
                  <div className="result-label">Ticket Reduction</div>
                </div>
                <div className="result-stat">
                  <div className="result-value">24/7</div>
                  <div className="result-label">Coverage</div>
                </div>
                <div className="result-stat">
                  <div className="result-value">92%</div>
                  <div className="result-label">SLA Compliance</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <div className="glow-orb glow-orb-gold" style={{ width: "400px", height: "400px", top: "-100px", left: "50%", transform: "translateX(-50%)", opacity: 0.3 }}></div>
            <h2 className="heading-lg reveal">Ready to Write Your<br/><span className="text-gold">Success Story?</span></h2>
            <p>Join our growing portfolio of satisfied clients. Let's start with a conversation about your goals.</p>
            <div className="cta-actions">
              <Link href="/contact" className="btn btn-primary" id="testimonials-cta">
                Get in Touch
                <svg className="btn-icon" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.75 9h10.5M9.75 4.5L14.25 9l-4.5 4.5"/></svg>
              </Link>
              <Link href="/services" className="btn btn-outline" id="testimonials-services-link">Explore Services</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
