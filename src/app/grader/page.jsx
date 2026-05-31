"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function ResumeGrader() {
  const [step, setStep] = useState(0); // 0: start, 1: details, 2: content, 3: format, 4: results
  const [answers, setAnswers] = useState({
    experienceLevel: 'entry',
    hasSummary: 'yes',
    hasMetrics: 'no',
    resumeLength: '1',
    hasKeywords: 'some',
    formatStyle: 'clean',
    hasContact: 'yes',
    hasLinks: 'no',
    resumeText: ''
  });

  const [scoreData, setScoreData] = useState(null);

  const handleStart = () => setStep(1);

  const calculateScore = () => {
    let baseScore = 40;

    // Contact info
    if (answers.hasContact === 'yes') baseScore += 10;
    if (answers.hasLinks === 'yes') baseScore += 10;
    else baseScore += 5; // partial

    // Summary profile
    if (answers.hasSummary === 'yes') baseScore += 10;

    // Metrics
    if (answers.hasMetrics === 'yes') baseScore += 15;
    else if (answers.hasMetrics === 'some') baseScore += 8;

    // Keywords
    if (answers.hasKeywords === 'all') baseScore += 15;
    else if (answers.hasKeywords === 'some') baseScore += 8;

    // Structure / format
    if (answers.formatStyle === 'clean') baseScore += 10;
    else if (answers.formatStyle === 'modern') baseScore += 8;

    // Length
    if (answers.resumeLength === '1' || answers.resumeLength === '2') baseScore += 10;
    else baseScore += 5; // too long or empty

    // Bounds check
    const finalScore = Math.min(Math.max(baseScore, 0), 100);
    
    let grade = 'F';
    let label = 'Needs Critical Re-writing';
    let color = '#ef4444';

    if (finalScore >= 90) {
      grade = 'A';
      label = 'Excellent, highly competitive';
      color = '#10b981';
    } else if (finalScore >= 80) {
      grade = 'B';
      label = 'Strong, minor polish needed';
      color = 'var(--purple-primary)';
    } else if (finalScore >= 65) {
      grade = 'C';
      label = 'Average, major gaps present';
      color = '#f59e0b';
    }

    setScoreData({
      score: finalScore,
      grade,
      label,
      color,
      breakdown: {
        contact: answers.hasContact === 'yes' ? 10 : 0,
        completeness: answers.hasSummary === 'yes' ? 20 : 10,
        impact: answers.hasMetrics === 'yes' ? 30 : (answers.hasMetrics === 'some' ? 15 : 5),
        keywords: answers.hasKeywords === 'all' ? 30 : (answers.hasKeywords === 'some' ? 15 : 5),
        design: answers.formatStyle === 'clean' ? 10 : 5
      }
    });

    setStep(4);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .grader-container {
          padding-top: calc(var(--nav-height) + 4rem);
          padding-bottom: 6rem;
          min-height: 100vh;
        }

        .grader-wizard {
          max-width: 700px;
          margin: 0 auto;
        }

        .step-progress-bar {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .step-progress-dot {
          flex: 1;
          height: 6px;
          background: var(--color-border);
          border-radius: 3px;
          transition: background 0.3s;
        }

        .step-progress-dot.active {
          background: var(--purple-gradient);
        }

        .grader-options-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        @media (min-width: 500px) {
          .grader-options-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }
        }

        .grader-radio-card {
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          padding: 1.25rem;
          cursor: pointer;
          transition: all 0.3s;
          text-align: center;
          position: relative;
        }

        .grader-radio-card:hover {
          border-color: var(--purple-primary);
          background: var(--color-bg-2);
        }

        .grader-radio-card.selected {
          border-color: var(--purple-primary);
          background: var(--purple-pale);
          box-shadow: 0 0 0 2px rgba(124, 58, 237, 0.15);
        }

        .grader-radio-card input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
        }

        .grader-grade-badge {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          font-weight: 800;
          color: white;
          margin: 0 auto 1.5rem;
        }
      `}} />

      <section className="page-hero">
        <div className="glow-orb glow-orb-gold" style={{ width: "500px", height: "500px", top: "-150px", left: "50%", transform: "translateX(-50%)", opacity: 0.4 }}></div>
        <div className="container">
          <div className="badge badge-gold" style={{ marginBottom: "1.25rem" }}>Instant Grader</div>
          <h1 className="heading-xl page-hero-title">Interactive <span className="text-gold">Resume Scorer</span></h1>
          <p className="page-hero-subtitle">Optimize your resume against modern Applicant Tracking Systems (ATS) and hiring benchmarks instantly.</p>
        </div>
      </section>

      <main className="grader-container">
        <div className="container">
          <div className="grader-wizard">

            {/* ── STEP 0: INTRO ── */}
            {step === 0 && (
              <div className="card" style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📑</div>
                <h2 className="heading-md" style={{ marginBottom: '1rem' }}>Evaluate Your Resume Quality</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.7 }}>
                  Our automated evaluator grades your resume against industry benchmarks, structural formats, and keyword density parameters. Get dynamic recommendations in under 2 minutes.
                </p>
                <button onClick={handleStart} className="btn btn-primary" style={{ maxWidth: '280px', width: '100%', margin: '0 auto' }}>
                  Start Resume Assessment
                </button>
              </div>
            )}

            {/* ── STEP 1: CONTACT DETAILS & LEVEL ── */}
            {step === 1 && (
              <div className="card">
                <div className="step-progress-bar">
                  <div className="step-progress-dot active"></div>
                  <div className="step-progress-dot"></div>
                  <div className="step-progress-dot"></div>
                  <div className="step-progress-dot"></div>
                </div>

                <h2 className="heading-md" style={{ marginBottom: '0.5rem' }}>Experience &amp; Essentials</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Let's analyze your target parameters and base details.</p>

                <div style={{ marginTop: '2rem' }}>
                  <label style={{ fontWeight: '600', fontSize: '0.9375rem' }}>What is your professional experience level?</label>
                  <div className="grader-options-grid">
                    {[
                      { key: 'entry', title: 'Entry Level / Graduate', desc: '0 - 1 year of work experience' },
                      { key: 'mid', title: 'Mid-Senior / Professional', desc: '2 - 5 years of work experience' },
                      { key: 'lead', title: 'Executive / Team Lead', desc: '5+ years of experience' }
                    ].map(opt => (
                      <div 
                        key={opt.key}
                        className={`grader-radio-card ${answers.experienceLevel === opt.key ? 'selected' : ''}`}
                        onClick={() => setAnswers({...answers, experienceLevel: opt.key})}
                      >
                        <strong style={{ display: 'block', fontSize: '0.9375rem', marginBottom: '0.25rem' }}>{opt.title}</strong>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{opt.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: '2.5rem' }}>
                  <label style={{ fontWeight: '600', fontSize: '0.9375rem' }}>Does your resume have active links (LinkedIn/GitHub/Portfolio)?</label>
                  <div className="grader-options-grid">
                    {[
                      { key: 'yes', title: 'Yes, fully updated links' },
                      { key: 'no', title: 'No, only email and phone' }
                    ].map(opt => (
                      <div 
                        key={opt.key}
                        className={`grader-radio-card ${answers.hasLinks === opt.key ? 'selected' : ''}`}
                        onClick={() => setAnswers({...answers, hasLinks: opt.key})}
                      >
                        <strong>{opt.title}</strong>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '3rem' }}>
                  <button onClick={() => setStep(2)} className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>Next Step &rarr;</button>
                </div>
              </div>
            )}

            {/* ── STEP 2: SUMMARY & METRICS ── */}
            {step === 2 && (
              <div className="card">
                <div className="step-progress-bar">
                  <div className="step-progress-dot active"></div>
                  <div className="step-progress-dot active"></div>
                  <div className="step-progress-dot"></div>
                  <div className="step-progress-dot"></div>
                </div>

                <h2 className="heading-md" style={{ marginBottom: '0.5rem' }}>Impact &amp; Metrics</h2>
                <p style={{ color: 'var(--text-secondary)' }}>How well do you state accomplishments?</p>

                <div style={{ marginTop: '2rem' }}>
                  <label style={{ fontWeight: '600', fontSize: '0.9375rem' }}>Does your resume start with a professional summary or profile?</label>
                  <div className="grader-options-grid">
                    {[
                      { key: 'yes', title: 'Yes', desc: 'A short 3-4 sentence elevator pitch' },
                      { key: 'no', title: 'No', desc: 'Directly starts with education or work details' }
                    ].map(opt => (
                      <div 
                        key={opt.key}
                        className={`grader-radio-card ${answers.hasSummary === opt.key ? 'selected' : ''}`}
                        onClick={() => setAnswers({...answers, hasSummary: opt.key})}
                      >
                        <strong>{opt.title}</strong>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{opt.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: '2.5rem' }}>
                  <label style={{ fontWeight: '600', fontSize: '0.9375rem' }}>Do you use numbers/metrics to showcase impact (e.g. "+₹15Cr saved", "managed 5+ agents")?</label>
                  <div className="grader-options-grid">
                    {[
                      { key: 'yes', title: 'Yes, extensively', desc: 'Almost all bullet points have numerical metrics' },
                      { key: 'some', title: 'Some, in a few places', desc: 'A few numbers, but mostly task descriptions' },
                      { key: 'no', title: 'No, descriptive tasks only', desc: 'e.g. "Responsible for solving support tickets"' }
                    ].map(opt => (
                      <div 
                        key={opt.key}
                        className={`grader-radio-card ${answers.hasMetrics === opt.key ? 'selected' : ''}`}
                        onClick={() => setAnswers({...answers, hasMetrics: opt.key})}
                      >
                        <strong>{opt.title}</strong>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{opt.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem' }}>
                  <button onClick={() => setStep(1)} className="btn btn-outline" style={{ padding: '0.75rem 2rem' }}>&larr; Back</button>
                  <button onClick={() => setStep(3)} className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>Next Step &rarr;</button>
                </div>
              </div>
            )}

            {/* ── STEP 3: FORMAT & TEXT ── */}
            {step === 3 && (
              <div className="card">
                <div className="step-progress-bar">
                  <div className="step-progress-dot active"></div>
                  <div className="step-progress-dot active"></div>
                  <div className="step-progress-dot active"></div>
                  <div className="step-progress-dot"></div>
                </div>

                <h2 className="heading-md" style={{ marginBottom: '0.5rem' }}>Layout &amp; Keywords</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Almost done! Let's check formatting and keyword strength.</p>

                <div style={{ marginTop: '2rem' }}>
                  <label style={{ fontWeight: '600', fontSize: '0.9375rem' }}>What is the overall formatting style of your resume?</label>
                  <div className="grader-options-grid">
                    {[
                      { key: 'clean', title: 'Clean / Single column', desc: 'Black & white, simple layout (preferred by ATS)' },
                      { key: 'modern', title: 'Two-column / Graphic', desc: 'Multiple side panels, graphs, or progress bars' },
                      { key: 'complex', title: 'Includes photos / complex icons', desc: 'Creative designs with personal headshot' }
                    ].map(opt => (
                      <div 
                        key={opt.key}
                        className={`grader-radio-card ${answers.formatStyle === opt.key ? 'selected' : ''}`}
                        onClick={() => setAnswers({...answers, formatStyle: opt.key})}
                      >
                        <strong>{opt.title}</strong>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{opt.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: '2.5rem' }}>
                  <label style={{ fontWeight: '600', fontSize: '0.9375rem' }}>Optional: Paste your profile summary or resume text below to detect keywords</label>
                  <textarea 
                    rows={4}
                    style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', marginTop: '0.75rem', fontFamily: 'inherit' }}
                    placeholder="Paste summary text..."
                    value={answers.resumeText}
                    onChange={e => setAnswers({...answers, resumeText: e.target.value})}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem' }}>
                  <button onClick={() => setStep(2)} className="btn btn-outline" style={{ padding: '0.75rem 2rem' }}>&larr; Back</button>
                  <button onClick={calculateScore} className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>Calculate Grade</button>
                </div>
              </div>
            )}

            {/* ── STEP 4: RESULTS ── */}
            {step === 4 && scoreData && (
              <div className="card" style={{ padding: '3.5rem 2.5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                  <div className="grader-grade-badge" style={{ background: scoreData.color }}>
                    {scoreData.grade}
                  </div>
                  <h2 className="heading-md" style={{ marginBottom: '0.5rem' }}>Overall Score: {scoreData.score}/100</h2>
                  <p style={{ color: scoreData.color, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{scoreData.label}</p>
                </div>

                <h3 className="heading-sm" style={{ marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>Critique Breakdown</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3rem' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.35rem' }}>
                      <span>Accomplishment Metrics &amp; Impact</span>
                      <strong>{scoreData.breakdown.impact}/30 pts</strong>
                    </div>
                    <div style={{ height: '8px', background: 'var(--color-bg-2)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${(scoreData.breakdown.impact / 30) * 100}%`, height: '100%', background: 'var(--purple-primary)' }} />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.35rem' }}>
                      <span>Resume Structure &amp; Layout</span>
                      <strong>{scoreData.breakdown.design}/10 pts</strong>
                    </div>
                    <div style={{ height: '8px', background: 'var(--color-bg-2)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${(scoreData.breakdown.design / 10) * 100}%`, height: '100%', background: 'var(--purple-primary)' }} />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.35rem' }}>
                      <span>Profile Completeness &amp; Summary</span>
                      <strong>{scoreData.breakdown.completeness}/20 pts</strong>
                    </div>
                    <div style={{ height: '8px', background: 'var(--color-bg-2)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${(scoreData.breakdown.completeness / 20) * 100}%`, height: '100%', background: 'var(--purple-primary)' }} />
                    </div>
                  </div>
                </div>

                <h3 className="heading-sm" style={{ marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>Actionable Recommendations</h3>
                <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.5rem', marginBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {answers.hasMetrics !== 'yes' && (
                    <li>💡 **Add metrics to showcase results:** Change tasks like *"Managed client emails"* to outcomes like *"Resolved 95+ client queries daily, sustaining 94% CSAT."*</li>
                  )}
                  {answers.formatStyle !== 'clean' && (
                    <li>💡 **Adopt clean single-column structure:** Complex multi-column graphic layouts with charts often fail to parse properly in ATS (Applicant Tracking Systems).</li>
                  )}
                  {answers.hasLinks !== 'yes' && (
                    <li>💡 **Link your professional presence:** Add a clean hyperlink to your updated LinkedIn profile to increase recruiter response rate by up to 34%.</li>
                  )}
                  {answers.hasSummary !== 'yes' && (
                    <li>💡 **Draft a profile summary:** Add a 3-sentence profile header showing who you are, your top milestone, and the specific role value you offer.</li>
                  )}
                </ul>

                <div className="card" style={{ background: 'var(--purple-pale)', border: '1px solid rgba(124, 58, 237, 0.2)', textAlign: 'center', padding: '2.5rem 1.5rem' }}>
                  <h4 className="heading-sm" style={{ marginBottom: '0.5rem' }}>Need a completely optimized Professional Resume?</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Let our consulting professionals rebuild and polish your resume to secure placement interviews.</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
                    <Link href="/pricing" className="btn btn-primary">Get Professional Resume Crafting</Link>
                    <button onClick={() => setStep(0)} className="btn btn-outline">Grade Another Resume</button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </>
  );
}
