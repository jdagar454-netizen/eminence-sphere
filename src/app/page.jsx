import Link from 'next/link';

export default function Home() {
  return (
    <main>
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="hero" id="hero">
        <canvas id="hero-canvas"></canvas>

        <div className="glow-orb glow-orb-gold" style={{ width: '600px', height: '600px', top: '-100px', right: '-100px', opacity: 0.5 }}></div>
        <div className="glow-orb glow-orb-blue" style={{ width: '500px', height: '500px', bottom: '-100px', left: '-100px', opacity: 0.6 }}></div>

        <div className="container">
          <div className="hero-inner">
            {/* Left: Copy */}
            <div className="hero-content">
              <div className="hero-eyebrow">
                <span className="hero-eyebrow-dot"></span>
                Trusted Business Consulting
              </div>
              <h1 className="heading-xl hero-title">
                Elevating Businesses<br/>
                <span className="line-accent">to Eminence</span>
              </h1>
              <p className="hero-subtitle">
                We partner with ambitious organisations to unlock strategic potential, optimise performance, and drive sustainable growth — with precision, integrity, and excellence.
              </p>
              <div className="hero-actions">
                <Link href="/contact" className="btn btn-primary" id="hero-cta-primary">
                  Start Your Journey
                  <svg className="btn-icon" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.75 9h10.5M9.75 4.5L14.25 9l-4.5 4.5"/></svg>
                </Link>
                <Link href="/services" className="btn btn-outline" id="hero-cta-secondary">Explore Services</Link>
              </div>
              <div className="hero-trust">
                <div className="trust-avatars">
                  <div className="trust-avatar">AK</div>
                  <div className="trust-avatar">RP</div>
                  <div className="trust-avatar">SM</div>
                  <div className="trust-avatar">JL</div>
                </div>
                <div className="trust-text">
                  <strong>50+ Satisfied Clients</strong><br/>
                  Across industries and markets
                </div>
              </div>
            </div>

            {/* Right: Visual Card */}
            <div className="hero-visual">
              <div className="floating-badge floating-badge-1">
                <span className="badge-dot"></span>
                Active Engagements: 47
              </div>
              <div className="hero-card-stack">
                <div className="hero-card-bg"></div>
                <div className="hero-card-main">
                  <div>
                    <div className="hero-card-icon">
                      <svg viewBox="0 0 28 28"><path d="M14 3C8 3 3 8 3 14s5 11 11 11 11-5 11-11S20 3 14 3z" strokeWidth="1.5"/><path d="M3 14h22M14 3c-3 3-4.5 7-4.5 11S11 22 14 25c3-3 4.5-7 4.5-11S17 6 14 3z" strokeWidth="1.5"/></svg>
                    </div>
                    <div className="hero-card-title">Strategic Excellence</div>
                    <div className="hero-card-desc">Transforming vision into measurable results through expert consulting.</div>
                  </div>
                  <div className="hero-card-metrics">
                    <div className="metric-item">
                      <div className="metric-value" data-counter data-target="91" data-suffix="%">0%</div>
                      <div className="metric-label">Client Satisfaction</div>
                    </div>
                    <div className="metric-item">
                      <div className="metric-value" data-counter data-target="2" data-suffix="yrs">0yrs</div>
                      <div className="metric-label">Experience</div>
                    </div>
                    <div className="metric-item">
                      <div className="metric-value" data-counter data-target="50" data-suffix="+">0+</div>
                      <div className="metric-label">Projects Done</div>
                    </div>
                    <div className="metric-item">
                      <div className="metric-value" data-counter data-target="5" data-suffix="+">0+</div>
                      <div className="metric-label">Industries</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="floating-badge floating-badge-2">
                <span className="badge-icon">🏆</span>
                Top Consulting Firm 2024
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ STATS ═══════════════════ */}
      <section style={{ padding: '0 0 5rem' }}>
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
              <div className="stat-label">Success Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-number" data-counter data-target="5" data-suffix="+">0+</div>
              <div className="stat-label">Industries Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ SERVICES PREVIEW ═══════════════════ */}
      <section className="section" id="services-preview">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">What We Do</div>
            <h2 className="heading-lg">Expert Services Tailored<br/>to Your Needs</h2>
            <div className="gold-divider"></div>
            <p>From strategy formulation to execution, we provide end-to-end consulting services that drive meaningful, lasting results.</p>
          </div>

          <div className="services-grid">
            {/* Service 1 */}
            <div className="card reveal reveal-delay-1" id="service-resume">
              <div className="icon-box">
                <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>
              </div>
              <h3 className="heading-sm">Resume Making</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '.9375rem', lineHeight: 1.7, margin: '0.75rem 0 1.25rem' }}>Craft professional, ATS-friendly resumes and CVs tailored to stand out to top recruiters and hiring managers.</p>
              <Link href="/services#resume-making" className="btn btn-ghost">
                Learn More
                <svg className="btn-icon" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.75 9h10.5M9.75 4.5L14.25 9l-4.5 4.5"/></svg>
              </Link>
            </div>
            {/* Service 2 */}
            <div className="card reveal reveal-delay-2" id="service-recruitment">
              <div className="icon-box">
                <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <h3 className="heading-sm">Job Recruitment</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '.9375rem', lineHeight: 1.7, margin: '0.75rem 0 1.25rem' }}>Find the perfect match with our end-to-end recruitment campaigns, direct placements, and virtual customer support hiring.</p>
              <Link href="/services#job-recruitment" className="btn btn-ghost">
                Learn More
                <svg className="btn-icon" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.75 9h10.5M9.75 4.5L14.25 9l-4.5 4.5"/></svg>
              </Link>
            </div>
            {/* Service 3 */}
            <div className="card reveal reveal-delay-3" id="service-career">
              <div className="icon-box">
                <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="m16.2 7.8-2.2 4.4-4.4 2.2 2.2-4.4 4.4-2.2z"/></svg>
              </div>
              <h3 className="heading-sm">Career Consultation</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '.9375rem', lineHeight: 1.7, margin: '0.75rem 0 1.25rem' }}>Personalised 1-on-1 coaching sessions to chart your career path, identify growth opportunities, and accelerate professional growth.</p>
              <Link href="/services#career-consultation" className="btn btn-ghost">
                Learn More
                <svg className="btn-icon" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.75 9h10.5M9.75 4.5L14.25 9l-4.5 4.5"/></svg>
              </Link>
            </div>
            {/* Service 4 */}
            <div className="card reveal reveal-delay-1" id="service-mock-interview">
              <div className="icon-box">
                <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <h3 className="heading-sm">Mock Interview &amp; Training</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '.9375rem', lineHeight: 1.7, margin: '0.75rem 0 1.25rem' }}>Ace your next interview with simulated mock sessions, comprehensive feedback, and professional communication training.</p>
              <Link href="/services#mock-interview-training" className="btn btn-ghost">
                Learn More
                <svg className="btn-icon" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.75 9h10.5M9.75 4.5L14.25 9l-4.5 4.5"/></svg>
              </Link>
            </div>
            {/* Service 5 */}
            <div className="card reveal reveal-delay-2" id="service-hurdles">
              <div className="icon-box">
                <svg viewBox="0 0 24 24"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/></svg>
              </div>
              <h3 className="heading-sm">Professional Hurdles Consultation</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '.9375rem', lineHeight: 1.7, margin: '0.75rem 0 1.25rem' }}>Navigate complex workplace challenges, career transitions, salary negotiations, and professional hurdles with expert advice.</p>
              <Link href="/services#professional-hurdles-consultation" className="btn btn-ghost">
                Learn More
                <svg className="btn-icon" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.75 9h10.5M9.75 4.5L14.25 9l-4.5 4.5"/></svg>
              </Link>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/services" className="btn btn-outline" id="view-all-services">View All Services</Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════ WHY CHOOSE US ═══════════════════ */}
      <section className="section" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(13,18,48,0.5) 100%)' }} id="why-us">
        <div className="container">
          <div className="why-us-inner">
            <div className="why-us-content">
              <div className="section-tag" style={{ justifyContent: 'flex-start' }}>Our Advantage</div>
              <h2 className="heading-lg reveal">Why Businesses<br/>Choose Eminence Sphere</h2>
              <div className="why-us-list">
                <div className="why-item reveal reveal-delay-1">
                  <div className="why-icon">
                    <svg viewBox="0 0 20 20"><path d="M10 1l2.4 6.8H20l-5.8 4.2 2.2 6.8L10 14.5 3.6 18.8l2.2-6.8L0 7.8h7.6L10 1z"/></svg>
                  </div>
                  <div className="why-text">
                    <h4>Proven Track Record</h4>
                    <p>Over 200 successful engagements across diverse industries, delivering measurable ROI and sustainable growth.</p>
                  </div>
                </div>
                <div className="why-item reveal reveal-delay-2">
                  <div className="why-icon">
                    <svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="8"/><path d="M10 6v4l3 3"/></svg>
                  </div>
                  <div className="why-text">
                    <h4>Bespoke Solutions</h4>
                    <p>Every engagement is custom-built around your unique challenges, objectives, and organisational context.</p>
                  </div>
                </div>
                <div className="why-item reveal reveal-delay-3">
                  <div className="why-icon">
                    <svg viewBox="0 0 20 20"><path d="M10 2C5.6 2 2 5.6 2 10s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 2c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6 2.7-6 6-6z"/><path d="M10 5v5l4 2"/></svg>
                  </div>
                  <div className="why-text">
                    <h4>Expert Team</h4>
                    <p>Our consultants bring deep sector expertise and real-world business leadership experience to every project.</p>
                  </div>
                </div>
                <div className="why-item reveal reveal-delay-4">
                  <div className="why-icon">
                    <svg viewBox="0 0 20 20"><path d="M2 10h16M10 2l8 8-8 8"/></svg>
                  </div>
                  <div className="why-text">
                    <h4>Results-Oriented</h4>
                    <p>We focus on delivery — measurable outcomes, accountable timelines, and tangible business impact.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="why-visual reveal reveal-delay-2">
              <div className="why-image-block">
                <div className="why-image-pattern"></div>
                <div className="why-image-center">
                  <img src="/images/logo.png" alt="Eminence Sphere" style={{ width: '200px', height: 'auto', opacity: 0.85 }} />
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '1rem' }}>Eminence Sphere<br/>Consulting &amp; Business Services</p>
                </div>
                <div className="why-badge-stack">
                  <div className="years-badge">
                    <div className="years-num" data-counter data-target="2" data-suffix="">0</div>
                    <div className="years-label">Years of<br/>Excellence</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ TESTIMONIALS ═══════════════════ */}
      <section className="section" id="testimonials-preview">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Client Stories</div>
            <h2 className="heading-lg">What Our Clients Say</h2>
            <div className="gold-divider"></div>
            <p>We measure our success by the success of those we serve.</p>
          </div>
          <div className="testimonials-grid">
            <div className="card testimonial-card reveal reveal-delay-1">
              <div className="quote-mark">"</div>
              <p className="testimonial-text">The placement process at Eminence Sphere was exceptional. They mapped my skills perfectly to a Senior Customer Support Representative role, and the support I received during transition was outstanding.</p>
              <div className="testimonial-author">
                <div className="author-avatar">CA</div>
                <div>
                  <div className="author-name">Chhavi Attri</div>
                  <div className="author-title">Senior Customer support Representative</div>
                </div>
              </div>
            </div>
            <div className="card testimonial-card reveal reveal-delay-2">
              <div className="quote-mark">"</div>
              <p className="testimonial-text">Eminence Sphere helped me land my dream role as a Senior Customer Support Representative. Their team is highly professional and guided me at every step of the recruitment journey.</p>
              <div className="testimonial-author">
                <div className="author-avatar">NT</div>
                <div>
                  <div className="author-name">Nitika Tyagi</div>
                  <div className="author-title">Senior Customer support Representative</div>
                </div>
              </div>
            </div>
            <div className="card testimonial-card reveal reveal-delay-3">
              <div className="quote-mark">"</div>
              <p className="testimonial-text">Eminence Sphere's remote work placements are second to none. They made transitioning to a Virtual Senior Customer Support Representative role seamless and stress-free.</p>
              <div className="testimonial-author">
                <div className="author-avatar">PS</div>
                <div>
                  <div className="author-name">Prince Saroha</div>
                  <div className="author-title">Virtual Senior Customer support Representative</div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/testimonials" className="btn btn-outline" id="view-all-testimonials">View All Testimonials</Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════ CTA ═══════════════════ */}
      <section className="cta-section" id="cta">
        <div className="container">
          <div className="cta-box">
            <div className="glow-orb glow-orb-gold" style={{ width: '400px', height: '400px', top: '-100px', left: '50%', transform: 'translateX(-50%)', opacity: 0.3 }}></div>
            <div className="badge badge-gold" style={{ marginBottom: '1.5rem' }}>Ready to Transform?</div>
            <h2 className="heading-lg reveal">Let's Build Your<br/><span className="text-gold">Success Story Together</span></h2>
            <p>Schedule a complimentary consultation and discover how Eminence Sphere can unlock your organisation's full potential.</p>
            <div className="cta-actions">
              <Link href="/contact" className="btn btn-primary" id="cta-main">
                Book a Free Consultation
                <svg className="btn-icon" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.75 9h10.5M9.75 4.5L14.25 9l-4.5 4.5"/></svg>
              </Link>
              <Link href="/about" className="btn btn-outline" id="cta-secondary">Learn About Us</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
