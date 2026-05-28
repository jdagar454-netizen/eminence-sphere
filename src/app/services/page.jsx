import Link from "next/link";

export default function Services() {
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

            {/* 1. Resume Making */}
            <div className="card service-detail-card reveal reveal-delay-1" id="resume-making">
              <div className="icon-box">
                <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>
              </div>
              <h3 className="heading-sm">Resume Making</h3>
              <p>Stand out in a competitive job market with a high-impact, professionally crafted resume. We optimize your CV for applicant tracking systems (ATS) and write compelling summaries that capture recruiters' attention.</p>
              <div className="service-features">
                <div className="service-feature">ATS-Friendly Layouts &amp; Keywords</div>
                <div className="service-feature">Custom Professional Summary Writing</div>
                <div className="service-feature">Impact-Driven Work Experience Bullet Points</div>
                <div className="service-feature">Cover Letter Drafting Services</div>
                <div className="service-feature">LinkedIn Profile Optimization</div>
                <div className="service-feature">Career Level Tailoring (Entry, Mid, Executive)</div>
              </div>
            </div>

            {/* 2. Job Recruitment */}
            <div className="card service-detail-card reveal reveal-delay-2" id="job-recruitment">
              <div className="icon-box">
                <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <h3 className="heading-sm">Job Recruitment</h3>
              <p>Connecting the right talent with the right opportunities. We run structured recruitment campaigns, screening and pre-qualifying candidates to match them with positions where they will thrive.</p>
              <div className="service-features">
                <div className="service-feature">End-to-End Talent Sourcing</div>
                <div className="service-feature">Support Center &amp; Call Center Hiring</div>
                <div className="service-feature">Remote &amp; Virtual Support Representative Placements</div>
                <div className="service-feature">Screening &amp; Pre-Employment Assessments</div>
                <div className="service-feature">Multi-Stage Candidate Interviewing</div>
                <div className="service-feature">Direct &amp; Temporary Placements</div>
              </div>
            </div>

            {/* 3. Career Consultation */}
            <div className="card service-detail-card reveal reveal-delay-1" id="career-consultation">
              <div className="icon-box">
                <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="m16.2 7.8-2.2 4.4-4.4 2.2 2.2-4.4 4.4-2.2z"/></svg>
              </div>
              <h3 className="heading-sm">Career Consultation</h3>
              <p>Chart a clear roadmap for your professional future. Our career consultation sessions help you discover your strengths, identify ideal job roles, and map out growth strategies to land your dream position.</p>
              <div className="service-features">
                <div className="service-feature">One-on-One Career Path Planning</div>
                <div className="service-feature">Skill Gap Analysis &amp; Recommendations</div>
                <div className="service-feature">Industry &amp; Job Market Insights</div>
                <div className="service-feature">Career Transition Planning</div>
                <div className="service-feature">Personal Brand Development</div>
                <div className="service-feature">Long-Term Goal Setting &amp; Action Plans</div>
              </div>
            </div>

            {/* 4. Mock Interview & Training */}
            <div className="card service-detail-card reveal reveal-delay-2" id="mock-interview-training">
              <div className="icon-box">
                <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <h3 className="heading-sm">Mock Interview &amp; Training</h3>
              <p>Build the confidence and speaking skills needed to pass any job interview. Through simulated interview sessions and technical assessments, we provide actionable feedback to help you refine your answers.</p>
              <div className="service-features">
                <div className="service-feature">Simulated Voice &amp; Non-Voice Interview Sessions</div>
                <div className="service-feature">Behavior &amp; STAR Method Answer Frameworks</div>
                <div className="service-feature">Detailed Verbal &amp; Body Language Feedback</div>
                <div className="service-feature">Customer Support Scenario Exercises</div>
                <div className="service-feature">Confidence Building &amp; Speaking Practice</div>
                <div className="service-feature">Interview Preparation Guides &amp; Resources</div>
              </div>
            </div>

            {/* 5. Professional Hurdles Consultation */}
            <div className="card service-detail-card reveal reveal-delay-1" id="professional-hurdles-consultation">
              <div className="icon-box">
                <svg viewBox="0 0 24 24"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/></svg>
              </div>
              <h3 className="heading-sm">Professional Hurdles Consultation</h3>
              <p>Navigate complex workplace challenges, career stagnation, salary negotiations, and professional hurdles with the guidance of experienced career advisors.</p>
              <div className="service-features">
                <div className="service-feature">Workplace Conflict Resolution Advice</div>
                <div className="service-feature">Salary &amp; Benefits Negotiation Strategies</div>
                <div className="service-feature">Stagnation &amp; Burnout Recovery Coaching</div>
                <div className="service-feature">Job Offer Evaluation &amp; Decisions</div>
                <div className="service-feature">Executive Presence &amp; Influence Consulting</div>
                <div className="service-feature">Career Pivots &amp; Risk Assessment</div>
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
