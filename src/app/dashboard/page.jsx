"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { submitHiringRequest } from '../../lib/firebase';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('candidate'); // 'candidate' or 'employer'
  const [assessmentHistory, setAssessmentHistory] = useState([]);
  const [resumeScore, setResumeScore] = useState(88);
  const [profileComplete, setProfileComplete] = useState(85);

  // Client hiring request form state
  const [hiringForm, setHiringForm] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    roleCategory: 'Customer Support / BPO',
    headcount: '5-15',
    budgetRange: '₹20,000 - ₹35,000 / mo',
    requirements: ''
  });
  const [hiringStatus, setHiringStatus] = useState({ loading: false, success: false, error: null });

  const applications = [
    { id: 1, role: "Senior Customer Support Representative", company: "Eminence Client (WFH)", status: "Interview Scheduled", date: "Jul 20, 2026", stage: 3 },
    { id: 2, role: "Technical Support Specialist", company: "Eminence Client (In-Office)", status: "Application Under Review", date: "Jul 18, 2026", stage: 2 }
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const history = JSON.parse(localStorage.getItem('eminence_assessment_history') || '[]');
      setAssessmentHistory(history);
      const graderResult = JSON.parse(localStorage.getItem('eminence_resume_grader_result') || 'null');
      if (graderResult && graderResult.score) {
        setResumeScore(graderResult.score);
      }
    }
  }, []);

  const handleHiringSubmit = async (e) => {
    e.preventDefault();
    setHiringStatus({ loading: true, success: false, error: null });
    const res = await submitHiringRequest(hiringForm);
    if (res.success) {
      setHiringStatus({ loading: false, success: true, error: null });
      setHiringForm({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        roleCategory: 'Customer Support / BPO',
        headcount: '5-15',
        budgetRange: '₹20,000 - ₹35,000 / mo',
        requirements: ''
      });
    } else {
      setHiringStatus({ loading: false, success: false, error: res.error || 'Failed to submit' });
    }
  };

  return (
    <div className="container" style={{ paddingTop: 'calc(var(--nav-height) + 3rem)', paddingBottom: '6rem', minHeight: '90vh' }}>
      
      {/* HEADER & PORTAL MODE TOGGLE */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div>
          <div className="section-tag" style={{ justifyContent: 'flex-start' }}>Eminence Sphere Portal</div>
          <h1 className="heading-xl" style={{ margin: '0.25rem 0 0.5rem 0' }}>
            Interactive <span className="text-gold">Command Center</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
            Track application progress, review candidate assessments, or submit corporate hiring pipelines.
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'inline-flex', background: 'var(--color-surface)', padding: '6px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
          <button
            onClick={() => setActiveTab('candidate')}
            style={{ padding: '0.6rem 1.5rem', border: 'none', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s', background: activeTab === 'candidate' ? 'var(--purple-primary)' : 'transparent', color: activeTab === 'candidate' ? '#fff' : 'var(--text-secondary)' }}
          >
            👨‍💼 Candidate Dashboard
          </button>
          <button
            onClick={() => setActiveTab('employer')}
            style={{ padding: '0.6rem 1.5rem', border: 'none', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s', background: activeTab === 'employer' ? 'var(--purple-primary)' : 'transparent', color: activeTab === 'employer' ? '#fff' : 'var(--text-secondary)' }}
          >
            🏢 Employer &amp; Corporate Portal
          </button>
        </div>
      </div>

      {/* ═══════════════════ CANDIDATE VIEW ═══════════════════ */}
      {activeTab === 'candidate' && (
        <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr', gap: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Active Applications */}
            <div className="card" style={{ padding: '2rem', border: '1px solid var(--color-border)' }}>
              <h3 className="heading-md" style={{ marginBottom: '1.5rem' }}>Active Job Applications</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {applications.map((app) => (
                  <div key={app.id} style={{ background: 'var(--color-bg-2)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '700' }}>{app.role}</h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{app.company} • Applied on {app.date}</span>
                      </div>
                      <span style={{ fontSize: '0.8rem', background: 'rgba(124, 58, 237, 0.15)', color: 'var(--purple-primary)', padding: '0.35rem 0.85rem', borderRadius: '20px', fontWeight: 'bold' }}>
                        {app.status}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div style={{ marginTop: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                        <span>Submitted</span>
                        <span>Screening</span>
                        <span>Interview</span>
                        <span>Selection</span>
                      </div>
                      <div style={{ height: '8px', background: 'var(--color-surface)', borderRadius: '10px', overflow: 'hidden' }}>
                        <div style={{ width: `${(app.stage / 4) * 100}%`, height: '100%', background: 'linear-gradient(90deg, var(--purple-primary), var(--gold-accent))', transition: 'width 0.5s ease' }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assessment History */}
            <div className="card" style={{ padding: '2rem', border: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 className="heading-md" style={{ margin: 0 }}>Practice &amp; Assessment Logs</h3>
                <Link href="/practice-arena" className="btn btn-ghost" style={{ fontSize: '0.85rem', padding: '0.25rem 0.75rem' }}>Open Practice Arena →</Link>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div style={{ background: 'var(--color-bg-2)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Customer Support Quiz</span>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--purple-primary)', margin: '0.25rem 0' }}>85%</div>
                  <span style={{ fontSize: '0.75rem', color: '#10b981' }}>✓ Passed • Passed on Jul 15</span>
                </div>
                <div style={{ background: 'var(--color-bg-2)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>English Fluency Audit</span>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--gold-accent)', margin: '0.25rem 0' }}>Score: C1</div>
                  <span style={{ fontSize: '0.75rem', color: '#10b981' }}>✓ Verified Advanced</span>
                </div>
              </div>
            </div>
          </div>

          {/* SIDEBAR: Profile & Tools */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="card" style={{ padding: '1.75rem', border: '1px solid var(--color-border)', textAlign: 'center' }}>
              <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'var(--purple-primary)', color: '#fff', fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                AO
              </div>
              <h3 className="heading-sm" style={{ margin: 0 }}>Aman Ojha</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0.25rem 0 1rem 0' }}>Customer Support Executive</p>
              
              <div style={{ background: 'var(--color-bg-2)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                Profile Completeness: <strong style={{ color: 'var(--purple-primary)' }}>{profileComplete}%</strong>
              </div>

              <Link href="/grader" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}>
                Grade Resume ({resumeScore}%)
              </Link>
            </div>

            <div className="card" style={{ padding: '1.5rem', border: '1px solid var(--color-border)' }}>
              <h4 className="heading-sm" style={{ marginBottom: '1rem' }}>Quick Preparation Tools</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li><Link href="/builder" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textDecoration: 'none', display: 'flex', justifyContent: 'space-between' }}><span>📝 Resume Builder</span><span>→</span></Link></li>
                <li><Link href="/interview-prep" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textDecoration: 'none', display: 'flex', justifyContent: 'space-between' }}><span>🎯 Interview Prep</span><span>→</span></Link></li>
                <li><Link href="/assessments" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textDecoration: 'none', display: 'flex', justifyContent: 'space-between' }}><span>🧠 Skill Assessments</span><span>→</span></Link></li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════ EMPLOYER VIEW ═══════════════════ */}
      {activeTab === 'employer' && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '2rem' }}>
          
          {/* HIRING FORM */}
          <div className="card" style={{ padding: '2.5rem', border: '1px solid var(--color-border)' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <div className="section-tag" style={{ justifyContent: 'flex-start' }}>Corporate Hiring</div>
              <h3 className="heading-md" style={{ marginTop: '0.25rem' }}>Submit Bulk Hiring or HR Requirements</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Partner with Eminence Sphere to source pre-vetted candidates for BPO, Customer Support, IT, and Telesales roles.</p>
            </div>

            {hiringStatus.success ? (
              <div style={{ padding: '2.5rem', textAlign: 'center', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', borderRadius: 'var(--radius-md)', color: '#10b981' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🏢</div>
                <h4 style={{ margin: '0 0 0.5rem 0' }}>Requirement Received!</h4>
                <p style={{ fontSize: '0.9rem', margin: 0 }}>Our Senior HR Consultant will get in touch with you within 4 business hours to finalize talent sourcing terms.</p>
              </div>
            ) : (
              <form onSubmit={handleHiringSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>Company Name *</label>
                    <input required type="text" value={hiringForm.companyName} onChange={(e) => setHiringForm({ ...hiringForm, companyName: e.target.value })} placeholder="Acme Tech Solutions" style={{ width: '100%', padding: '0.65rem', background: 'var(--color-bg-2)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>Contact Person *</label>
                    <input required type="text" value={hiringForm.contactPerson} onChange={(e) => setHiringForm({ ...hiringForm, contactPerson: e.target.value })} placeholder="HR Manager / Hiring Lead" style={{ width: '100%', padding: '0.65rem', background: 'var(--color-bg-2)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>Corporate Email *</label>
                    <input required type="email" value={hiringForm.email} onChange={(e) => setHiringForm({ ...hiringForm, email: e.target.value })} placeholder="hr@acme.com" style={{ width: '100%', padding: '0.65rem', background: 'var(--color-bg-2)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>Phone Number *</label>
                    <input required type="tel" value={hiringForm.phone} onChange={(e) => setHiringForm({ ...hiringForm, phone: e.target.value })} placeholder="+91 63965 82575" style={{ width: '100%', padding: '0.65rem', background: 'var(--color-bg-2)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>Required Role Category</label>
                    <select value={hiringForm.roleCategory} onChange={(e) => setHiringForm({ ...hiringForm, roleCategory: e.target.value })} style={{ width: '100%', padding: '0.65rem', background: 'var(--color-bg-2)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none' }}>
                      <option>Customer Support / BPO</option>
                      <option>Technical Support &amp; IT</option>
                      <option>Telesales &amp; Lead Generation</option>
                      <option>Executive Search &amp; Leadership</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>Required Headcount</label>
                    <select value={hiringForm.headcount} onChange={(e) => setHiringForm({ ...hiringForm, headcount: e.target.value })} style={{ width: '100%', padding: '0.65rem', background: 'var(--color-bg-2)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none' }}>
                      <option>1 - 5 Candidates</option>
                      <option>5 - 15 Candidates</option>
                      <option>15 - 50 Candidates (Bulk)</option>
                      <option>50+ Candidates (Enterprise)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>Detailed Requirements / Skills Needed</label>
                  <textarea value={hiringForm.requirements} onChange={(e) => setHiringForm({ ...hiringForm, requirements: e.target.value })} placeholder="Describe work model (WFH/Office), shift timings, required fluency, software skills..." style={{ width: '100%', height: '90px', padding: '0.65rem', background: 'var(--color-bg-2)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none', resize: 'none' }} />
                </div>

                {hiringStatus.error && <div style={{ color: '#ef4444', fontSize: '0.85rem' }}>{hiringStatus.error}</div>}

                <button type="submit" disabled={hiringStatus.loading} className="btn btn-primary" style={{ padding: '0.9rem', justifyContent: 'center', fontWeight: 'bold' }}>
                  {hiringStatus.loading ? 'Submitting Request...' : 'Submit Hiring Requirement →'}
                </button>
              </form>
            )}
          </div>

          {/* EMPLOYER ADVANTAGES */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="card" style={{ padding: '2rem', border: '1px solid var(--color-border)' }}>
              <h4 className="heading-sm" style={{ marginBottom: '1rem' }}>Why Hire with Eminence Sphere?</h4>
              <ul style={{ paddingLeft: '1.2rem', margin: 0, color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.8 }}>
                <li>Pre-screened candidates evaluated for communication &amp; technical skills.</li>
                <li>Zero upfront posting charges for enterprise client partners.</li>
                <li>Average sourcing turnaround time under 48 hours.</li>
                <li>Comprehensive candidate replacement guarantee.</li>
              </ul>
            </div>

            <div className="card" style={{ padding: '2rem', border: '1px solid var(--color-border)', background: 'linear-gradient(135deg, rgba(124,58,237,0.1), transparent)' }}>
              <h4 className="heading-sm" style={{ marginBottom: '0.5rem' }}>Need Custom HR Consulting?</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Our HR experts craft customized compensation structures, employee policies, and performance management framework.</p>
              <Link href="/contact" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}>Talk to HR Advisor</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
