"use client";

import { useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import AnimatedCounter from '../../components/AnimatedCounter';
import Link from 'next/link';

const CASE_STUDIES = [
  {
    id: "bpo-recruitment-scale",
    title: "Bulk Support Recruitment for Fintech Leader",
    client: "Global Fintech Brand",
    category: "Recruitment",
    metricValue: "120",
    metricSuffix: "+",
    metricLabel: "Agents Placed",
    summary: "Scaled remote customer support team operations from scratch within a tight 45-day window, maintaining high service delivery standards.",
    details: "When a leading global fintech company expanded its digital banking services, they faced a critical shortage of support agents. Eminence Sphere designed an end-to-end recruitment campaign, screening over 800 candidates. We implemented custom mock-interview pipelines and technical support benchmarks, successfully placing 120+ pre-trained virtual support representatives. The project resulted in a 98% first-year retention rate and cut onboarding time by 30%.",
    color: "var(--purple-primary)"
  },
  {
    id: "operations-restructuring",
    title: "Strategic Operations & CX Optimization",
    client: "E-Commerce Enterprise",
    category: "Operations",
    metricValue: "35",
    metricSuffix: "%",
    metricLabel: "Efficiency Boost",
    summary: "Audited client communication bottlenecks and restructured support workflows to eliminate redundancies and improve customer satisfaction.",
    details: "An e-commerce firm was struggling with high ticket response times and disjointed virtual team coordination. Eminence Sphere conducted a thorough operational audit, identifying critical communication gaps. By re-engineering their workflow pipelines, setting up clear SLAs, and training team leaders in conflict resolution, we helped them achieve a 35% increase in daily operations efficiency and a 40% reduction in response time metrics.",
    color: "#8B5CF6"
  },
  {
    id: "cv-brand-transformation",
    title: "National Talent Pipeline Branding",
    client: "Eminence Career Accelerator",
    category: "Strategy",
    metricValue: "94",
    metricSuffix: "%",
    metricLabel: "Success Rate",
    summary: "Formulated a personal branding and resume optimization pipeline that helped hundreds of job seekers secure BPO placements.",
    details: "To support our growing client placement goals, we launched a career consultation drive. We trained job seekers through simulated mock interviews, professional communication workshops, and ATS-optimized resume building. Over 450 professionals completed the training pipeline, with 94% successfully securing placements in leading support roles.",
    color: "#A78BFA"
  },
  {
    id: "tech-support-pipeline",
    title: "Tier-2 Tech Support Center Setup",
    client: "IT Infrastructure Firm",
    category: "Operations",
    metricValue: "25",
    metricSuffix: "d",
    metricLabel: "Launch Time",
    summary: "Coordinated infrastructure and recruited specialized engineers to establish a Tier-2 technical support center.",
    details: "Our client required a highly technical helpdesk to troubleshoot network configuration hurdles. Eminence Sphere acted as both strategic advisor and talent partner, structuring the operational hierarchy, sourcing specialist engineers, and facilitating key workflow definitions in under 25 days.",
    color: "var(--purple-dark)"
  }
];

export default function Projects() {
  useScrollReveal();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Strategy", "Recruitment", "Operations"];

  const filteredProjects = activeCategory === "All"
    ? CASE_STUDIES
    : CASE_STUDIES.filter(p => p.category === activeCategory);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .projects-section {
          padding-top: calc(var(--nav-height) + 3rem);
          padding-bottom: 6rem;
          background: linear-gradient(180deg, var(--color-bg) 0%, var(--color-bg-2) 100%);
        }

        .filter-tabs {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3.5rem;
          flex-wrap: wrap;
        }

        .filter-tab-btn {
          padding: 0.6rem 1.5rem;
          border-radius: 50px;
          border: 1px solid var(--color-border);
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          background: var(--color-surface);
          color: var(--text-secondary);
          transition: all 0.3s ease;
        }

        .filter-tab-btn:hover {
          color: var(--purple-primary);
          border-color: var(--purple-primary);
        }

        .filter-tab-btn.active {
          background: var(--purple-primary);
          color: #FFFFFF;
          border-color: var(--purple-primary);
          box-shadow: 0 4px 14px rgba(124, 58, 237, 0.25);
        }

        .projects-list {
          display: flex;
          flex-direction: column;
          gap: 4rem;
        }

        .project-card-layout {
          display: grid;
          grid-template-columns: 1.2fr 2fr;
          gap: 3rem;
          align-items: center;
        }

        @media (max-width: 992px) {
          .project-card-layout {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        .project-visual-block {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 3rem 2rem;
          text-align: center;
          box-shadow: var(--shadow-card);
          position: relative;
          overflow: hidden;
          transition: all var(--transition-base);
        }

        .project-visual-block:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-card-hover);
          border-color: var(--purple-primary);
        }

        .project-visual-block::before {
          content: '';
          position: absolute;
          top: 0; left: 0; width: 6px; height: 100%;
          background: var(--purple-gradient);
        }

        .project-metric-val {
          font-family: var(--font-heading);
          font-size: 4rem;
          font-weight: 800;
          color: var(--purple-primary);
          line-height: 1;
        }

        .project-metric-lbl {
          font-size: 0.875rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-top: 0.75rem;
          font-weight: 600;
        }

        .project-details-block h3 {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .project-client-badge {
          display: inline-block;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--purple-primary);
          background: var(--purple-pale);
          padding: 0.25rem 0.75rem;
          border-radius: 4px;
          margin-bottom: 1.25rem;
        }

        .project-body {
          color: var(--text-secondary);
          line-height: 1.75;
          font-size: 0.95rem;
        }

        .project-body p {
          margin-bottom: 1.25rem;
        }
      `}} />

      <section className="page-hero">
        <div className="glow-orb glow-orb-gold" style={{ width: "500px", height: "500px", top: "-150px", left: "50%", transform: "translateX(-50%)", opacity: 0.4 }}></div>
        <div className="container">
          <div className="badge badge-gold" style={{ marginBottom: "1.25rem" }}>Case Studies</div>
          <h1 className="heading-xl page-hero-title">Consulting <span className="text-gold">Case Studies</span></h1>
          <p className="page-hero-subtitle">Real engagements, tangible results. Explore how we have optimized operations, scaled hiring, and enabled growth.</p>
        </div>
      </section>

      <main className="projects-section">
        <div className="container">
          {/* Tabs */}
          <div className="filter-tabs reveal">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-tab-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* List */}
          <div className="projects-list">
            {filteredProjects.map((p, idx) => (
              <div key={p.id} className="card project-card-layout reveal">
                {/* Left: Metric Visual Block */}
                <div className="project-visual-block">
                  <div className="project-metric-val">
                    <AnimatedCounter target={p.metricValue} suffix={p.metricSuffix} />
                  </div>
                  <div className="project-metric-lbl">{p.metricLabel}</div>
                </div>

                {/* Right: Copy */}
                <div className="project-details-block">
                  <div className="project-client-badge">{p.client} &bull; {p.category}</div>
                  <h3>{p.title}</h3>
                  <div className="project-body">
                    <p style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{p.summary}</p>
                    <p>{p.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '6rem' }}>
            <div className="card" style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem 2rem' }}>
              <h3 className="heading-md" style={{ marginBottom: '1rem' }}>Have a similar operational challenge?</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>Let's discuss how we can customize our consulting and recruitment services for your organization.</p>
              <Link href="/contact" className="btn btn-primary">
                Consult with an Expert
                <svg className="btn-icon" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3.75 9h10.5M9.75 4.5L14.25 9l-4.5 4.5"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
