"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CandidateDashboard() {
  const [assessmentHistory, setAssessmentHistory] = useState([]);
  const [resumeScore, setResumeScore] = useState(null);
  const [profileComplete, setProfileComplete] = useState(65); // initial progress
  
  // Track visual application steps
  const mockApplications = [
    { id: 1, role: "Senior Customer Support Representative", company: "Eminence Client (Fintech)", status: "Interviewing", date: "May 28, 2026" },
    { id: 2, role: "Tech Support Specialist", company: "Eminence Client (SaaS)", status: "Screening", date: "May 29, 2026" }
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Fetch local data
      const history = JSON.parse(localStorage.getItem('eminence_assessment_history') || '[]');
      setAssessmentHistory(history);
      
      const graderResult = JSON.parse(localStorage.getItem('eminence_resume_grader_result') || 'null');
      if (graderResult && graderResult.score) {
        setResumeScore(graderResult.score);
        setProfileComplete(90); // increase profile percent if resume graded
      }
    }
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .dashboard-container {
          padding-top: calc(var(--nav-height) + 3rem);
          padding-bottom: 6rem;
          min-height: 90vh;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 2.5fr 1fr;
          gap: 2rem;
          margin-top: 3rem;
        }

        @media (max-width: 992px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Tracker styling */
        .status-tracker {
          display: flex;
          justify-content: space-between;
          position: relative;
          margin: 2rem 0;
          padding: 0 1rem;
        }

        .status-tracker::before {
          content: '';
          position: absolute;
          top: 15px;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--color-border);
          z-index: 1;
        }

        .tracker-step {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .tracker-node {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--color-surface);
          border: 2px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 0.85rem;
          transition: all 0.3s;
          color: var(--text-muted);
        }

        .tracker-step.active .tracker-node {
          border-color: var(--purple-primary);
          background: var(--purple-primary);
          color: white;
          box-shadow: 0 0 12px rgba(124,58,237,0.4);
        }

        .tracker-step.completed .tracker-node {
          border-color: #10b981;
          background: #10b981;
          color: white;
        }

        .tracker-label {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--text-secondary);
        }
      `}} />

      <section className="page-hero">
        <div className="glow-orb glow-orb-gold" style={{ width: "500px", height: "500px", top: "-150px", left: "50%", transform: "translateX(-50%)", opacity: 0.4 }}></div>
        <div className="container">
          <div className="badge badge-gold" style={{ marginBottom: "1.25rem" }}>Candidate space</div>
          <h1 className="heading-xl page-hero-title">Candidate <span className="text-gold">Portal Dashboard</span></h1>
          <p className="page-hero-subtitle">Track your application pipeline progress, view diagnostic test marks, and polish your skills.</p>
        </div>
      </section>

      <main className="dashboard-container">
        <div className="container">

          <div className="dashboard-grid">
            
            {/* ── LEFT COLUMN: APPLICATIONS & PROGRESS ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Profile Card & Completion progress */}
              <div className="card" style={{ padding: '2.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h2 className="heading-sm" style={{ marginBottom: '0.25rem' }}>Welcome Back, Candidate</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Review your active matches and career benchmarks.</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Profile Complete: {profileComplete}%</span>
                    <div style={{ width: '150px', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', marginTop: '0.5rem', overflow: 'hidden' }}>
                      <div style={{ width: `${profileComplete}%`, height: '100%', background: 'var(--gold-gradient)' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Applications */}
              <div className="card" style={{ padding: '2.5rem' }}>
                <h3 className="heading-sm" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
                  📂 Active Job Applications
                </h3>

                {mockApplications.map((app) => {
                  const statusIdx = app.status === "Applied" ? 0 : app.status === "Screening" ? 1 : app.status === "Interviewing" ? 2 : 3;
                  return (
                    <div key={app.id} style={{ marginBottom: '2.5rem', borderBottom: '1px solid rgba(255,255,255,0.02)', paddingBottom: '2rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <div>
                          <strong style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{app.role}</strong>
                          <div style={{ fontSize: '0.875rem', color: 'var(--gold-light)', marginTop: '0.25rem' }}>{app.company}</div>
                        </div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Applied: {app.date}</span>
                      </div>

                      {/* Tracker Visual */}
                      <div className="status-tracker">
                        <div className={`tracker-step ${statusIdx >= 0 ? (statusIdx === 0 ? 'active' : 'completed') : ''}`}>
                          <div className="tracker-node">{statusIdx > 0 ? '✓' : '1'}</div>
                          <span className="tracker-label">Applied</span>
                        </div>
                        <div className={`tracker-step ${statusIdx >= 1 ? (statusIdx === 1 ? 'active' : 'completed') : ''}`}>
                          <div className="tracker-node">{statusIdx > 1 ? '✓' : '2'}</div>
                          <span className="tracker-label">Screening</span>
                        </div>
                        <div className={`tracker-step ${statusIdx >= 2 ? (statusIdx === 2 ? 'active' : 'completed') : ''}`}>
                          <div className="tracker-node">{statusIdx > 2 ? '✓' : '3'}</div>
                          <span className="tracker-label">Interview</span>
                        </div>
                        <div className={`tracker-step ${statusIdx >= 3 ? (statusIdx === 3 ? 'active' : 'completed') : ''}`}>
                          <div className="tracker-node">{statusIdx > 3 ? '✓' : '4'}</div>
                          <span className="tracker-label">Offered</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Assessment Records */}
              <div className="card" style={{ padding: '2.5rem' }}>
                <h3 className="heading-sm" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
                  📊 Diagnostic Test Records
                </h3>

                {assessmentHistory.length === 0 ? (
                  <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    <p style={{ marginBottom: '1.5rem' }}>You haven't completed any skill assessments yet.</p>
                    <Link href="/assessments" className="btn btn-outline">Browse Assessments</Link>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {assessmentHistory.map((hist, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--color-border)', padding: '1rem 1.5rem', borderRadius: 'var(--radius-sm)' }}>
                        <div>
                          <strong style={{ color: 'var(--text-primary)' }}>{hist.title}</strong>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Completed on {hist.date}</div>
                        </div>
                        <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--purple-primary)' }}>
                          {hist.score}%
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* ── RIGHT COLUMN: BENCHMARKS & MOCK QUICK LINKS ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* ATS Score Card */}
              <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Resume ATS Benchmark</h4>
                <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: '4px solid var(--color-border)', borderTopColor: 'var(--purple-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                  <span style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                    {resumeScore ? `${resumeScore}%` : 'N/A'}
                  </span>
                </div>
                {resumeScore ? (
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Based on your last graded resume.</p>
                ) : (
                  <div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>Grade your resume to check search visibility.</p>
                    <Link href="/grader" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>Scan Resume</Link>
                  </div>
                )}
              </div>

              {/* Quick Hub Links */}
              <div className="card" style={{ padding: '2rem' }}>
                <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>Quick Preparation</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <Link href="/practice-arena" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
                    🎙️ Voice &amp; Chat Arena
                  </Link>
                  <Link href="/interview-prep" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
                    📚 Interview Practice Hub
                  </Link>
                  <Link href="/careers" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
                    🔍 Search Open Roles
                  </Link>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>
    </>
  );
}
