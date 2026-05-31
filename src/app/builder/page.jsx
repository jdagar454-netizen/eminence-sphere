"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function ResumeBuilder() {
  const [step, setStep] = useState(1); // 1: Info, 2: Experience, 3: Education, 4: Skills, 5: Preview/Print
  
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "Jane Doe",
    email: "jane.doe@gmail.com",
    phone: "+91 98765 43210",
    location: "New Delhi, India",
    linkedin: "linkedin.com/in/janedoe",
    summary: "Dedicated Customer Support professional with 2+ years of experience resolving complex complaints, maintaining high CSAT scores, and optimization of helpdesk pipelines."
  });

  const [experience, setExperience] = useState([
    {
      role: "Customer Support Specialist",
      company: "TechSolutions Pvt. Ltd.",
      duration: "2024 - Present",
      bullets: "Resolved 50+ tier-1 helpdesk tickets daily with a 96% SLA compliance rate.\nCollaborated with tier-2 engineers to identify and resolve software bugs.\nOptimised team response time by 15% through canned response templates."
    }
  ]);

  const [education, setEducation] = useState([
    {
      degree: "Bachelor of Business Administration (BBA)",
      school: "Delhi University",
      year: "2021 - 2024"
    }
  ]);

  const [skills, setSkills] = useState("Customer Service, De-escalation, Active Listening, Helpdesk Ticketing, CRM Tools (Zendesk, Salesforce)");

  const addExperience = () => {
    setExperience([...experience, { role: "", company: "", duration: "", bullets: "" }]);
  };

  const updateExperience = (index, field, val) => {
    const updated = [...experience];
    updated[index][field] = val;
    setExperience(updated);
  };

  const removeExperience = (index) => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  const addEducation = () => {
    setEducation([...education, { degree: "", school: "", year: "" }]);
  };

  const updateEducation = (index, field, val) => {
    const updated = [...education];
    updated[index][field] = val;
    setEducation(updated);
  };

  const removeEducation = (index) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .builder-container {
          padding-top: calc(var(--nav-height) + 3rem);
          padding-bottom: 6rem;
          min-height: 90vh;
        }

        .builder-split-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-top: 2rem;
        }

        @media (max-width: 992px) {
          .builder-split-layout {
            grid-template-columns: 1fr;
          }
        }

        /* Resume Preview Box */
        .resume-preview-box {
          background: white;
          color: #222222;
          font-family: 'Times New Roman', Times, serif;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          padding: 3rem 2.5rem;
          min-height: 800px;
          box-shadow: var(--shadow-card);
          overflow-y: auto;
        }

        .resume-preview-header {
          text-align: center;
          margin-bottom: 1.5rem;
          border-bottom: 2px solid #333333;
          padding-bottom: 1rem;
        }

        .resume-preview-header h2 {
          font-size: 1.75rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        .resume-preview-meta {
          font-size: 0.85rem;
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          color: #555555;
        }

        .resume-preview-section {
          margin-bottom: 1.5rem;
        }

        .resume-preview-section-title {
          font-size: 1rem;
          font-weight: bold;
          text-transform: uppercase;
          border-bottom: 1px solid #777777;
          margin-bottom: 0.75rem;
          color: #111111;
        }

        .resume-preview-bullet-list {
          list-style-type: square;
          padding-left: 1.25rem;
          font-size: 0.9rem;
          color: #333333;
          line-height: 1.4;
        }

        .resume-preview-bullet-list li {
          margin-bottom: 0.4rem;
        }

        /* Print Media Styles */
        @media print {
          body * {
            visibility: hidden;
          }
          .resume-preview-box, .resume-preview-box * {
            visibility: visible;
          }
          .resume-preview-box {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            border: none;
            box-shadow: none;
            padding: 0;
          }
        }
      `}} />

      <section className="page-hero">
        <div className="glow-orb glow-orb-gold" style={{ width: "500px", height: "500px", top: "-150px", left: "50%", transform: "translateX(-50%)", opacity: 0.4 }}></div>
        <div className="container">
          <div className="badge badge-gold" style={{ marginBottom: "1.25rem" }}>Resume Tools</div>
          <h1 className="heading-xl page-hero-title">Interactive <span className="text-gold">Resume Builder</span></h1>
          <p className="page-hero-subtitle">Design a clean, ATS-optimized professional resume in minutes and download it directly.</p>
        </div>
      </section>

      <main className="builder-container">
        <div className="container">
          
          <div className="builder-split-layout">
            
            {/* ── LEFT SIDE: THE FORM STEPS ── */}
            <div className="card" style={{ padding: '2.5rem' }}>
              
              {/* Form Navigation Headers */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem', flexWrap: 'wrap' }}>
                {["1. Info", "2. Experience", "3. Education", "4. Skills", "5. Finish"].map((lbl, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setStep(idx + 1)}
                    className={`btn ${step === idx + 1 ? 'btn-primary' : 'btn-ghost'}`}
                    style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
                  >
                    {lbl}
                  </button>
                ))}
              </div>

              {/* STEP 1: Personal Info */}
              {step === 1 && (
                <div>
                  <h3 className="heading-sm" style={{ marginBottom: '1.5rem' }}>Personal Details</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input type="text" className="form-input" value={personalInfo.fullName} onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email Address</label>
                      <input type="email" className="form-input" value={personalInfo.email} onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <input type="text" className="form-input" value={personalInfo.phone} onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Location (City, Country)</label>
                      <input type="text" className="form-input" value={personalInfo.location} onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">LinkedIn Profile URL</label>
                      <input type="text" className="form-input" value={personalInfo.linkedin} onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Profile / Career Summary</label>
                      <textarea className="form-input" rows="4" value={personalInfo.summary} onChange={(e) => setPersonalInfo({ ...personalInfo, summary: e.target.value })} style={{ height: 'auto', resize: 'vertical' }}></textarea>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Work Experience */}
              {step === 2 && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 className="heading-sm">Professional Work Experience</h3>
                    <button onClick={addExperience} className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>+ Add Job</button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {experience.map((exp, idx) => (
                      <div key={idx} style={{ border: '1px solid var(--color-border)', padding: '1.5rem', borderRadius: 'var(--radius-sm)', position: 'relative' }}>
                        <button 
                          onClick={() => removeExperience(idx)}
                          style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: '#e05c5c', cursor: 'pointer', fontSize: '0.85rem' }}
                        >
                          Remove
                        </button>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                          <div className="form-group">
                            <label className="form-label">Role Title</label>
                            <input type="text" className="form-input" value={exp.role} onChange={(e) => updateExperience(idx, 'role', e.target.value)} />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Company / Organisation</label>
                            <input type="text" className="form-input" value={exp.company} onChange={(e) => updateExperience(idx, 'company', e.target.value)} />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Duration (e.g. 2024 - Present)</label>
                            <input type="text" className="form-input" value={exp.duration} onChange={(e) => updateExperience(idx, 'duration', e.target.value)} />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Responsibility Bullet Points (one per line)</label>
                            <textarea className="form-input" rows="4" value={exp.bullets} onChange={(e) => updateExperience(idx, 'bullets', e.target.value)} style={{ height: 'auto', resize: 'vertical' }}></textarea>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: Education */}
              {step === 3 && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 className="heading-sm">Education History</h3>
                    <button onClick={addEducation} className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>+ Add Education</button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {education.map((edu, idx) => (
                      <div key={idx} style={{ border: '1px solid var(--color-border)', padding: '1.5rem', borderRadius: 'var(--radius-sm)', position: 'relative' }}>
                        <button 
                          onClick={() => removeEducation(idx)}
                          style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: '#e05c5c', cursor: 'pointer', fontSize: '0.85rem' }}
                        >
                          Remove
                        </button>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                          <div className="form-group">
                            <label className="form-label">Degree Name</label>
                            <input type="text" className="form-input" value={edu.degree} onChange={(e) => updateEducation(idx, 'degree', e.target.value)} />
                          </div>
                          <div className="form-group">
                            <label className="form-label">School / University</label>
                            <input type="text" className="form-input" value={edu.school} onChange={(e) => updateEducation(idx, 'school', e.target.value)} />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Graduation Year</label>
                            <input type="text" className="form-input" value={edu.year} onChange={(e) => updateEducation(idx, 'year', e.target.value)} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 4: Skills */}
              {step === 4 && (
                <div>
                  <h3 className="heading-sm" style={{ marginBottom: '1.5rem' }}>Key Skills</h3>
                  <div className="form-group">
                    <label className="form-label">Professional Core Skills (comma-separated)</label>
                    <textarea 
                      className="form-input" 
                      rows="6" 
                      value={skills} 
                      onChange={(e) => setSkills(e.target.value)}
                      style={{ height: 'auto', resize: 'vertical' }}
                    ></textarea>
                  </div>
                </div>
              )}

              {/* STEP 5: Print Actions */}
              {step === 5 && (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                  <h3 className="heading-sm" style={{ marginBottom: '1rem' }}>Your Resume is Ready!</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2.5rem', lineHeight: 1.6 }}>
                    Your resume has been generated using a high-density, minimalist, ATS-friendly structure that recruiters prefer. Click the download button below to print it or save it as a PDF.
                  </p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '280px', margin: '0 auto' }}>
                    <button onClick={handlePrint} className="btn btn-primary" style={{ justifyContent: 'center' }}>
                      🖨️ Download / Save PDF
                    </button>
                    <Link href="/dashboard" className="btn btn-outline" style={{ justifyContent: 'center' }}>
                      📋 Go to Candidate Dashboard
                    </Link>
                  </div>
                </div>
              )}

              {/* Form Navigation Buttons */}
              {step < 5 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem', marginTop: '2.5rem' }}>
                  <button 
                    className="btn btn-outline" 
                    disabled={step === 1}
                    onClick={() => setStep(prev => prev - 1)}
                  >
                    Back
                  </button>
                  <button 
                    className="btn btn-primary" 
                    onClick={() => setStep(prev => prev + 1)}
                  >
                    Next Step &rarr;
                  </button>
                </div>
              )}

            </div>

            {/* ── RIGHT SIDE: THE RESUME PREVIEW ── */}
            <div>
              <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem', letterSpacing: '0.05em' }}>ATS Preview Panel</h4>
              <div className="resume-preview-box">
                
                {/* Header */}
                <div className="resume-preview-header">
                  <h2>{personalInfo.fullName}</h2>
                  <div className="resume-preview-meta">
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>| {personalInfo.phone}</span>}
                    {personalInfo.location && <span>| {personalInfo.location}</span>}
                    {personalInfo.linkedin && <span>| {personalInfo.linkedin}</span>}
                  </div>
                </div>

                {/* Summary */}
                {personalInfo.summary && (
                  <div className="resume-preview-section">
                    <div className="resume-preview-section-title">Professional Summary</div>
                    <p style={{ fontSize: '0.9rem', color: '#333333', lineHeight: 1.4 }}>{personalInfo.summary}</p>
                  </div>
                )}

                {/* Work History */}
                {experience.length > 0 && (
                  <div className="resume-preview-section">
                    <div className="resume-preview-section-title">Professional Experience</div>
                    {experience.map((exp, idx) => (
                      <div key={idx} style={{ marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '0.95rem', color: '#111111' }}>
                          <span>{exp.role || "Role"} - {exp.company || "Company"}</span>
                          <span>{exp.duration || "Duration"}</span>
                        </div>
                        {exp.bullets && (
                          <ul className="resume-preview-bullet-list" style={{ marginTop: '0.4rem' }}>
                            {exp.bullets.split('\n').filter(b => b.trim()).map((b, i) => (
                              <li key={i}>{b.replace(/^[•\-\*]\s*/, '')}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Education */}
                {education.length > 0 && (
                  <div className="resume-preview-section">
                    <div className="resume-preview-section-title">Education</div>
                    {education.map((edu, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#333333', marginBottom: '0.5rem' }}>
                        <span><strong>{edu.degree || "Degree"}</strong> - {edu.school || "School"}</span>
                        <span>{edu.year || "Year"}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Skills */}
                {skills && (
                  <div className="resume-preview-section">
                    <div className="resume-preview-section-title">Skills</div>
                    <p style={{ fontSize: '0.9rem', color: '#333333', lineHeight: 1.4 }}>
                      {skills}
                    </p>
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>
      </main>
    </>
  );
}
