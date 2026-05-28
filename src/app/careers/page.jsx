"use client";

import Link from "next/link";

export default function Careers() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .careers-section {
          padding-top: calc(var(--nav-height) + 3rem);
          padding-bottom: 6rem;
        }

        .careers-intro {
          max-width: 800px;
          margin: 0 auto 4rem;
          text-align: center;
        }

        .careers-intro p {
          color: var(--text-secondary);
          font-size: 1.0625rem;
          line-height: 1.75;
          margin-top: 1rem;
        }

        /* Job Grid */
        .jobs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .job-card {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .job-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--color-border);
          padding-bottom: 1.25rem;
        }

        .job-title-group h3 {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.3;
        }

        .job-company {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--gold-light);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 0.25rem;
        }

        .job-badge {
          font-size: 0.7rem;
          font-weight: 600;
          padding: 0.25rem 0.6rem;
          border-radius: 4px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          background: rgba(201, 168, 76, 0.1);
          border: 1px solid var(--color-border);
          color: var(--gold-primary);
        }

        .job-badge-remote {
          background: rgba(76, 217, 100, 0.1);
          border-color: rgba(76, 217, 100, 0.3);
          color: #4cd964;
        }

        .job-details-list {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1.5rem;
          font-size: 0.8125rem;
          color: var(--text-secondary);
        }

        .job-detail-item {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .job-detail-item svg {
          width: 14px;
          height: 14px;
          stroke: var(--gold-primary);
          fill: none;
          stroke-width: 2;
        }

        .job-description {
          font-size: 0.9375rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .job-requirements-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
        }

        .job-requirements {
          list-style-type: none;
          padding: 0;
          margin: 0 0 2rem;
          flex-grow: 1;
        }

        .job-requirement-item {
          font-size: 0.875rem;
          color: var(--text-secondary);
          position: relative;
          padding-left: 1.25rem;
          margin-bottom: 0.5rem;
          line-height: 1.5;
        }

        .job-requirement-item::before {
          content: '✓';
          position: absolute;
          left: 0;
          top: 0;
          color: var(--gold-primary);
          font-weight: 700;
        }

        .job-actions {
          display: flex;
          gap: 1rem;
          margin-top: auto;
        }

        .job-btn {
          flex: 1;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          font-size: 0.875rem;
          font-weight: 600;
          text-align: center;
          transition: all var(--transition-base);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .job-btn-primary {
          background: var(--gold-gradient);
          color: var(--navy-deep);
        }

        .job-btn-primary:hover {
          opacity: 0.9;
          box-shadow: 0 4px 16px rgba(201, 168, 76, 0.25);
        }

        .job-btn-outline {
          border: 1px solid var(--color-border);
          color: var(--text-primary);
          background: transparent;
        }

        .job-btn-outline:hover {
          border-color: var(--gold-primary);
          color: var(--gold-primary);
          background: var(--gold-pale);
        }

        @media (max-width: 576px) {
          .jobs-grid {
            grid-template-columns: 1fr;
          }
          .job-actions {
            flex-direction: column;
          }
        }
      ` }} />
      <section className="page-hero">
        <div className="glow-orb glow-orb-gold" style={{ width: "500px", height: "500px", top: "-150px", left: "50%", transform: "translateX(-50%)", opacity: 0.4 }}></div>
        <div className="container">
          <div className="badge badge-gold" style={{ marginBottom: "1.25rem" }}>Hiring Opportunities</div>
          <h1 className="heading-xl page-hero-title reveal">Careers &amp; <span className="text-gold">Placements</span></h1>
          <p className="page-hero-subtitle reveal reveal-delay-1">Connect with industry leaders. We are currently sourcing candidates for placement at leading global enterprises.</p>
        </div>
      </section>

      <main className="careers-section">
        <div className="container">
          
          <div className="careers-intro reveal">
            <div className="section-tag">Join Our Team</div>
            <h2 className="heading-lg">Careers &amp; Placements</h2>
            <div className="gold-divider"></div>
            <p>Eminence Sphere partners with leading global enterprises for talent sourcing and placements. While we are currently in-between active sourcing cycles, you can register in our talent pool today using our AI Recruitment Assistant to be notified of future opportunities.</p>
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem", width: "100%" }}>
            <div className="card reveal reveal-delay-1" style={{ maxWidth: "600px", width: "100%", textAlign: "center", padding: "3rem 2rem", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>📁</div>
              <h3 className="heading-md" style={{ marginBottom: "1rem", color: "var(--text-primary)" }}>No Active Openings</h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "2rem" }}>
                We are not currently listing active job vacancies. However, our talent pipeline is always open. Submit your details to our virtual recruitment assistant to be matched with future roles.
              </p>
              <button 
                className="job-btn job-btn-primary open-bot-btn" 
                style={{ maxWidth: "280px", margin: "0 auto" }}
                onClick={() => {
                  const launcher = document.getElementById('es-chatbot-launcher');
                  const windowEl = document.getElementById('es-chatbot-window');
                  if (launcher && windowEl && !windowEl.classList.contains('open')) {
                    launcher.click();
                  }
                }}
              >
                Register with AI Assistant
              </button>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
