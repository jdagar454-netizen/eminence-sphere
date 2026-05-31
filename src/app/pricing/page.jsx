"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function Pricing() {
  const [activeTab, setActiveTab] = useState('candidate'); // 'candidate' | 'employer'

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .pricing-section {
          padding-top: calc(var(--nav-height) + 2rem);
          padding-bottom: 6rem;
        }

        .pricing-toggle-container {
          display: flex;
          justify-content: center;
          margin-bottom: 4rem;
        }

        .pricing-toggle-box {
          display: flex;
          background: var(--color-bg-2);
          border: 1px solid var(--color-border);
          border-radius: 30px;
          padding: 0.35rem;
          gap: 0.5rem;
        }

        .pricing-toggle-btn {
          padding: 0.6rem 1.75rem;
          border-radius: 25px;
          font-weight: 700;
          font-size: 0.9rem;
          transition: all 0.3s;
          color: var(--text-secondary);
        }

        .pricing-toggle-btn.active {
          background: var(--purple-gradient);
          color: white;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          align-items: stretch;
        }

        .pricing-card {
          display: flex;
          flex-direction: column;
          padding: 3rem 2.25rem;
          height: 100%;
          position: relative;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .pricing-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-card-hover);
        }

        .pricing-card.premium {
          border-color: var(--purple-primary);
        }

        .pricing-card.premium::after {
          content: 'Popular';
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          background: var(--purple-gradient);
          color: white;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          text-transform: uppercase;
        }

        .price-text-value {
          font-family: var(--font-heading);
          font-size: 3rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.1;
          margin: 1.5rem 0;
        }

        .price-text-value span {
          font-size: 1rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .pricing-features-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          margin-bottom: 2.5rem;
          flex-grow: 1;
        }

        .pricing-features-list li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9375rem;
          color: var(--text-secondary);
        }

        .check-icon-svg {
          width: 18px;
          height: 18px;
          color: var(--purple-primary);
          flex-shrink: 0;
        }
      `}} />

      <section className="page-hero">
        <div className="glow-orb glow-orb-gold" style={{ width: "500px", height: "500px", top: "-150px", left: "50%", transform: "translateX(-50%)", opacity: 0.4 }}></div>
        <div className="container">
          <div className="badge badge-gold" style={{ marginBottom: "1.25rem" }}>Our Packages</div>
          <h1 className="heading-xl page-hero-title">Transparent &amp; <span className="text-gold">Simple Pricing</span></h1>
          <p className="page-hero-subtitle">Select the consulting or recruitment solution tailored for your target objectives.</p>
        </div>
      </section>

      <main className="pricing-section">
        <div className="container">
          
          <div className="pricing-toggle-container">
            <div className="pricing-toggle-box">
              <button 
                className={`pricing-toggle-btn ${activeTab === 'candidate' ? 'active' : ''}`}
                onClick={() => setActiveTab('candidate')}
              >
                Candidate Services
              </button>
              <button 
                className={`pricing-toggle-btn ${activeTab === 'employer' ? 'active' : ''}`}
                onClick={() => setActiveTab('employer')}
              >
                Enterprise Solutions
              </button>
            </div>
          </div>

          {/* ── CANDIDATE SERVICE CARDS ── */}
          {activeTab === 'candidate' && (
            <div className="pricing-grid">
              
              <div className="card pricing-card">
                <h3 className="heading-sm">Professional Resume Writing</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Perfect for entry-level candidates looking to get noticed.</p>
                <div className="price-text-value">
                  ₹1,499 <span>/ one-time</span>
                </div>
                <ul className="pricing-features-list">
                  <li>
                    <svg className="check-icon-svg" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
                    ATS-Optimized Formatting
                  </li>
                  <li>
                    <svg className="check-icon-svg" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
                    Keyword Density Analysis
                  </li>
                  <li>
                    <svg className="check-icon-svg" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
                    Delivered in PDF &amp; Word formats
                  </li>
                  <li>
                    <svg className="check-icon-svg" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
                    1 revision round included
                  </li>
                </ul>
                <Link href="/contact" className="btn btn-outline" style={{ textAlign: 'center', justifyContent: 'center' }}>Get Started</Link>
              </div>

              <div className="card pricing-card premium">
                <h3 className="heading-sm">Placement Catalyst Bundle</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Complete career transformation pipeline.</p>
                <div className="price-text-value">
                  ₹3,999 <span>/ one-time</span>
                </div>
                <ul className="pricing-features-list">
                  <li>
                    <svg className="check-icon-svg" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
                    Everything in Resume Writing
                  </li>
                  <li>
                    <svg className="check-icon-svg" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
                    2 Mock Interview coaching sessions
                  </li>
                  <li>
                    <svg className="check-icon-svg" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
                    Direct priority routing in recruitment
                  </li>
                  <li>
                    <svg className="check-icon-svg" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
                    LinkedIn Profile Makeover
                  </li>
                  <li>
                    <svg className="check-icon-svg" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
                    3 revision rounds + 30-day support
                  </li>
                </ul>
                <Link href="/contact" className="btn btn-primary" style={{ textAlign: 'center', justifyContent: 'center' }}>Buy Bundle Now</Link>
              </div>

              <div className="card pricing-card">
                <h3 className="heading-sm">Mock Interview &amp; Prep</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Polish your speaking skills with hiring managers.</p>
                <div className="price-text-value">
                  ₹1,999 <span>/ one-time</span>
                </div>
                <ul className="pricing-features-list">
                  <li>
                    <svg className="check-icon-svg" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
                    1-on-1 live zoom mock session
                  </li>
                  <li>
                    <svg className="check-icon-svg" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
                    Detailed behavioral report card
                  </li>
                  <li>
                    <svg className="check-icon-svg" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
                    STAR Method instruction training
                  </li>
                  <li>
                    <svg className="check-icon-svg" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
                    Access to BPO question bank
                  </li>
                </ul>
                <Link href="/contact" className="btn btn-outline" style={{ textAlign: 'center', justifyContent: 'center' }}>Book Session</Link>
              </div>

            </div>
          )}

          {/* ── EMPLOYER SOLUTIONS CARDS ── */}
          {activeTab === 'employer' && (
            <div className="pricing-grid" style={{ maxWidth: '900px', margin: '0 auto' }}>
              
              <div className="card pricing-card">
                <h3 className="heading-sm">On-Demand Sourcing</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Perfect for filling standard roles quickly.</p>
                <div className="price-text-value" style={{ fontSize: '2.5rem' }}>
                  8.33% <span>of Annual CTC</span>
                </div>
                <ul className="pricing-features-list">
                  <li>
                    <svg className="check-icon-svg" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
                    Access to 10k+ pre-screened talent pool
                  </li>
                  <li>
                    <svg className="check-icon-svg" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
                    Dedicated Account executive
                  </li>
                  <li>
                    <svg className="check-icon-svg" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
                    Replacement guarantee (60 days)
                  </li>
                  <li>
                    <svg className="check-icon-svg" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
                    First candidate submittals in 72 hours
                  </li>
                </ul>
                <Link href="/contact" className="btn btn-outline" style={{ textAlign: 'center', justifyContent: 'center' }}>Contact Sales</Link>
              </div>

              <div className="card pricing-card premium">
                <h3 className="heading-sm">Scale RPO / Bulk Hiring</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Complete outsourcing for rapid volume expansion.</p>
                <div className="price-text-value" style={{ fontSize: '2.5rem' }}>
                  Custom <span>/ monthly retainer</span>
                </div>
                <ul className="pricing-features-list">
                  <li>
                    <svg className="check-icon-svg" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
                    Fully branded recruitment campaigns
                  </li>
                  <li>
                    <svg className="check-icon-svg" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
                    SLA-driven hiring milestones (e.g. 50 placements/mo)
                  </li>
                  <li>
                    <svg className="check-icon-svg" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
                    Custom onboarding &amp; mock testing modules
                  </li>
                  <li>
                    <svg className="check-icon-svg" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
                    Weekly recruitment pipeline performance analytics
                  </li>
                </ul>
                <Link href="/contact" className="btn btn-primary" style={{ textAlign: 'center', justifyContent: 'center' }}>Partner with Us</Link>
              </div>

            </div>
          )}

        </div>
      </main>
    </>
  );
}
