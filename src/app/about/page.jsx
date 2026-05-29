"use client";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import Link from "next/link";

export default function About() {
  useScrollReveal();

  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="glow-orb glow-orb-gold" style={{ width: "500px", height: "500px", top: "-150px", left: "50%", transform: "translateX(-50%)", opacity: 0.4 }}></div>
        <div className="container">
          <div className="badge badge-gold" style={{ marginBottom: "1.25rem" }}>Our Story</div>
          <h1 className="heading-xl page-hero-title reveal">About <span className="text-gold">Eminence Sphere</span></h1>
          <p className="page-hero-subtitle reveal reveal-delay-1">Built on integrity, driven by excellence — discover the people and principles behind every engagement.</p>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="section">
        <div className="container">
          <div className="about-story">
            <div className="about-story-text reveal">
              <div className="section-tag" style={{ justifyContent: "flex-start" }}>Who We Are</div>
              <h2 className="heading-lg">A Legacy of Strategic Excellence</h2>
              <p>At Eminence Sphere, we don’t just fill vacancies—we build high-performing teams. As a rapidly growing recruitment and consulting partner, we specialize in driving workforce success for the BPO, ITES, and Non-IT sectors.</p>
              <p>From bulk hiring initiatives to precision candidate screening, we handle the entire recruitment lifecycle so you can focus on scaling your business.</p>
              <p>By bridging the gap between top-tier talent and industry-leading employers, we guarantee faster closures, exceptional candidate quality, and an entirely seamless hiring experience.</p>
              <Link href="/contact" className="btn btn-primary" style={{ marginTop: "1.5rem" }} id="about-cta">
                Work With Us
                <svg className="btn-icon" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.75 9h10.5M9.75 4.5L14.25 9l-4.5 4.5"/></svg>
              </Link>
            </div>
            <div className="about-story-visual reveal reveal-delay-2">
              <div className="about-decorative">
                <div className="about-decorative-pattern"></div>
                <div className="about-decorative-content">
                  <div className="about-decorative-icon">
                    <svg viewBox="0 0 40 40" fill="none" stroke="#07091C" strokeWidth="1.5" strokeLinecap="round">
                      <circle cx="20" cy="20" r="16"/>
                      <path d="M4 20h32M20 4c-4 4-6 9-6 16s2 12 6 16M20 4c4 4 6 9 6 16s-2 12-6 16"/>
                    </svg>
                  </div>
                  <div className="stat-number" style={{ fontSize: "3rem" }} data-counter data-target="2" data-suffix="+">0+</div>
                  <div style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginTop: "0.25rem" }}>Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ paddingBottom: "5rem" }}>
        <div className="container">
          <div className="stats-grid reveal">
            <div className="stat-item">
              <div className="stat-number" data-counter data-target="50" data-suffix="+">0+</div>
              <div className="stat-label">Clients Served</div>
            </div>
            <div className="stat-item">
              <div className="stat-number" data-counter data-target="2" data-suffix="+">0+</div>
              <div className="stat-label">Years of Expertise</div>
            </div>
            <div className="stat-item">
              <div className="stat-number" data-counter data-target="91" data-suffix="%">0%</div>
              <div className="stat-label">Client Satisfaction</div>
            </div>
            <div className="stat-item">
              <div className="stat-number" data-counter data-target="5" data-suffix="+">0+</div>
              <div className="stat-label">Industries Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="section" style={{ background: "linear-gradient(180deg,rgba(13,18,48,0.4) 0%,transparent 100%)" }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Our Purpose</div>
            <h2 className="heading-lg">Mission &amp; Vision</h2>
            <div className="gold-divider"></div>
          </div>
          <div className="mv-grid">
            <div className="mv-card mv-card-mission reveal reveal-delay-1">
              <div className="mv-icon">
                <svg viewBox="0 0 22 22"><path d="M11 2L2 6v6c0 5.5 4 10.7 9 12 5-1.3 9-6.5 9-12V6l-9-4z"/></svg>
              </div>
              <h3>Our Mission</h3>
              <p>To empower businesses of every scale to achieve their full potential by delivering strategic insight, operational rigour, and transformative solutions — with integrity, innovation, and an unwavering commitment to results.</p>
            </div>
            <div className="mv-card mv-card-vision reveal reveal-delay-2">
              <div className="mv-icon">
                <svg viewBox="0 0 22 22"><circle cx="11" cy="11" r="9"/><path d="M11 2C6.5 6 5 8.5 5 11s1.5 5 6 9c4.5-4 6-6.5 6-9s-1.5-5-6-9z"/><circle cx="11" cy="11" r="3"/></svg>
              </div>
              <h3>Our Vision</h3>
              <p>To be the most trusted consulting partner in the region — recognised not only for the quality of our advice, but for the depth of our client relationships and the lasting impact of our work on businesses and communities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">What We Stand For</div>
            <h2 className="heading-lg">Our Core Values</h2>
            <div className="gold-divider"></div>
            <p>These principles guide every engagement, every recommendation, and every relationship we build.</p>
          </div>
          <div className="values-grid">
            <div className="card value-card reveal reveal-delay-1">
              <div className="icon-box">
                <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h3 className="heading-sm">Integrity</h3>
              <p>We uphold the highest ethical standards in every interaction — honest advice, transparent processes, and unwavering accountability.</p>
            </div>
            <div className="card value-card reveal reveal-delay-2">
              <div className="icon-box">
                <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
              <h3 className="heading-sm">Excellence</h3>
              <p>We set and surpass the highest bars of quality in every deliverable — from strategic analysis to final implementation.</p>
            </div>
            <div className="card value-card reveal reveal-delay-3">
              <div className="icon-box">
                <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
              </div>
              <h3 className="heading-sm">Collaboration</h3>
              <p>We work as true partners — embedding ourselves in your challenges, co-creating solutions, and celebrating your successes together.</p>
            </div>
            <div className="card value-card reveal reveal-delay-1">
              <div className="icon-box">
                <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              </div>
              <h3 className="heading-sm">Innovation</h3>
              <p>We constantly evolve our thinking, embracing new methodologies and technologies to deliver cutting-edge solutions.</p>
            </div>
            <div className="card value-card reveal reveal-delay-2">
              <div className="icon-box">
                <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <h3 className="heading-sm">Commitment</h3>
              <p>We are relentlessly dedicated to delivering on our promises — on time, within scope, and beyond expectations.</p>
            </div>
            <div className="card value-card reveal reveal-delay-3">
              <div className="icon-box">
                <svg viewBox="0 0 24 24"><path d="M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10z"/><path d="M2 12h20M12 2c-2.8 2.8-4 6-4 10s1.2 7.2 4 10M12 2c2.8 2.8 4 6 4 10s-1.2 7.2-4 10"/></svg>
              </div>
              <h3 className="heading-sm">Impact</h3>
              <p>Every engagement is measured by the real-world difference it creates — for businesses, their people, and their communities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="section" style={{ background: "linear-gradient(180deg,rgba(13,18,48,0.4) 0%,transparent 100%)" }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">The People</div>
            <h2 className="heading-lg">Meet Our Leadership</h2>
            <div className="gold-divider"></div>
            <p>Seasoned professionals with deep expertise, united by a passion for helping businesses thrive.</p>
          </div>
          <div className="team-grid">
            <div className="card team-card reveal reveal-delay-1">
              <div className="team-avatar">NC</div>
              <div className="team-name">Nikul Chaudhary</div>
              <div className="team-role">Founder</div>
              <p className="team-bio">Nikul founded Eminence Sphere Consulting &amp; Business Services to bridge the gap between employers and skilled candidates by ensuring faster closures and quality profiles.</p>
            </div>
            <div className="card team-card reveal reveal-delay-2">
              <div className="team-avatar">RA</div>
              <div className="team-name">Rachel Adeyemi</div>
              <div className="team-role">Managing Director</div>
              <p className="team-bio">A seasoned operations leader and MBA graduate, Rachel oversees client delivery and ensures every engagement exceeds expectations.</p>
            </div>
            <div className="card team-card reveal reveal-delay-3">
              <div className="team-avatar">JK</div>
              <div className="team-name">James Kariuki</div>
              <div className="team-role">Director of Support Placements</div>
              <p className="team-bio">James manages our global customer support talent acquisition and matching programs, placing hundreds of agents annually.</p>
            </div>
            <div className="card team-card reveal reveal-delay-1">
              <div className="team-avatar">NP</div>
              <div className="team-name">Nadia Patel</div>
              <div className="team-role">Director, HR &amp; People</div>
              <p className="team-bio">Nadia specialises in organisational design and talent strategy, helping clients build cultures that attract and retain top performers.</p>
            </div>
            <div className="card team-card reveal reveal-delay-2">
              <div className="team-avatar">DL</div>
              <div className="team-name">David Lim</div>
              <div className="team-role">Head of CX &amp; Support Operations</div>
              <p className="team-bio">David guides our customer service quality management practices, optimizing support delivery for our enterprise partners.</p>
            </div>
            <div className="card team-card reveal reveal-delay-3">
              <div className="team-avatar">AM</div>
              <div className="team-name">Amina Mensah</div>
              <div className="team-role">Lead Strategy Consultant</div>
              <p className="team-bio">Amina brings a razor-sharp strategic mind and deep market research expertise, having led engagements across 18 countries.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <div className="glow-orb glow-orb-gold" style={{ width: "400px", height: "400px", top: "-100px", left: "50%", transform: "translateX(-50%)", opacity: 0.3 }}></div>
            <h2 className="heading-lg reveal">Ready to Work With<br/><span className="text-gold">Our Expert Team?</span></h2>
            <p>Let's have a conversation about your business challenges and how we can help you overcome them.</p>
            <div className="cta-actions">
              <Link href="/contact" className="btn btn-primary" id="about-bottom-cta">
                Get in Touch
                <svg className="btn-icon" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.75 9h10.5M9.75 4.5L14.25 9l-4.5 4.5"/></svg>
              </Link>
              <Link href="/services" className="btn btn-outline" id="about-services-link">Our Services</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
