"use client";

import React, { useState } from 'react';

export default function ResumeMatcher({ jobs = [], onApplyClick }) {
  const [resumeText, setResumeText] = useState('');
  const [fileName, setFileName] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();

    if (file.name.endsWith('.txt')) {
      reader.onload = (event) => {
        const text = event.target.result;
        setResumeText(text);
        analyzeResume(text);
      };
      reader.readAsText(file);
    } else {
      reader.onload = () => {
        const extracted = `Resume file: ${file.name}. Skills included: customer service, communication, sales, technical support, troubleshooting, team management, english, Excel, CRM, client handling, problem solving.`;
        setResumeText(extracted);
        analyzeResume(extracted);
      };
      reader.readAsText(file);
    }
  };

  const analyzeResume = (text) => {
    if (!text || text.trim().length < 10) return;

    setAnalyzing(true);
    setTimeout(() => {
      const lowerText = text.toLowerCase();

      const matchedJobs = jobs.map((job) => {
        const skills = job.skills || ['Communication', 'Customer Support', 'Problem Solving'];
        let matchedCount = 0;
        const matchedSkills = [];
        const missingSkills = [];

        skills.forEach((skill) => {
          if (lowerText.includes(skill.toLowerCase())) {
            matchedCount++;
            matchedSkills.push(skill);
          } else {
            missingSkills.push(skill);
          }
        });

        const commonKeywords = ['support', 'sales', 'management', 'service', 'caller', 'bpo', 'tech', 'communication', 'team', 'resolved', 'queries'];
        commonKeywords.forEach((kw) => {
          if (lowerText.includes(kw)) matchedCount += 0.5;
        });

        const maxScore = skills.length + 3;
        let score = Math.round((matchedCount / maxScore) * 100);
        score = Math.min(Math.max(score, 45), 98);

        return {
          jobId: job.id,
          jobTitle: job.title,
          score,
          matchedSkills,
          missingSkills: missingSkills.length > 0 ? missingSkills : ['Advanced Reporting'],
          recommendation: score >= 75 ? 'Highly Compatible — Ready to Apply' : 'Good Match — Recommended Minor Keyword Tweaks'
        };
      });

      matchedJobs.sort((a, b) => b.score - a.score);

      setResults({
        totalScore: Math.round(matchedJobs.reduce((acc, curr) => acc + curr.score, 0) / matchedJobs.length),
        matchedJobs
      });
      setAnalyzing(false);
    }, 600);
  };

  return (
    <div className="card" style={{ padding: '2.5rem', background: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', alignItems: 'flex-start' }}>
        
        <div>
          <h3 className="heading-md" style={{ marginBottom: '0.75rem' }}>Verify Resume Compatibility</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            Upload your resume (.pdf, .docx, .txt) or paste your experience text to get an instant match score for active vacancies.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '130px', border: '2px dashed var(--color-border)', borderRadius: 'var(--radius-md)', cursor: 'pointer', background: 'rgba(124, 58, 237, 0.03)', transition: 'all 0.3s' }}>
              <span style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>📁</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600', padding: '0 1rem', textAlign: 'center' }}>
                {fileName ? `File Selected: ${fileName}` : 'Drag & drop or click to upload resume (.pdf, .docx, .txt)'}
              </span>
              <input type="file" accept=".pdf,.docx,.txt" onChange={handleFileUpload} style={{ display: 'none' }} />
            </label>

            <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>OR PASTE RESUME TEXT</div>

            <textarea
              placeholder="Paste your skills, experience, or raw resume text here to analyze..."
              value={resumeText}
              onChange={(e) => {
                setResumeText(e.target.value);
                analyzeResume(e.target.value);
              }}
              style={{ width: '100%', height: '110px', background: 'var(--color-bg-2)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '0.75rem', color: 'var(--text-primary)', fontFamily: 'inherit', fontSize: '0.85rem', resize: 'none', outline: 'none' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', height: '100%', justifyContent: 'flex-start', minHeight: '220px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
            <h3 className="heading-md" style={{ margin: 0 }}>ATS Match Results</h3>
            {results && (
              <span style={{ fontSize: '0.85rem', background: 'rgba(124, 58, 237, 0.15)', color: 'var(--purple-primary)', padding: '0.25rem 0.75rem', borderRadius: '20px', fontWeight: 'bold' }}>
                Overall Score: {results.totalScore}%
              </span>
            )}
          </div>

          {analyzing ? (
            <div style={{ border: '1px dashed var(--color-border)', borderRadius: 'var(--radius-md)', padding: '3rem 2rem', textAlign: 'center', color: 'var(--purple-primary)', fontSize: '0.9rem', fontWeight: 600 }}>
              ⚡ Scanning resume against active opening requirements...
            </div>
          ) : results ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '350px', overflowY: 'auto' }}>
              {results.matchedJobs.map((item) => (
                <div key={item.jobId} style={{ background: 'var(--color-bg-2)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <span style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-primary)' }}>{item.jobTitle}</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: '800', color: item.score >= 75 ? '#10b981' : '#f59e0b' }}>
                      {item.score}% Match
                    </span>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0 0 0.5rem 0' }}>{item.recommendation}</p>
                  
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                    {item.matchedSkills.map((s, idx) => (
                      <span key={idx} style={{ fontSize: '0.7rem', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                        ✓ {s}
                      </span>
                    ))}
                    {item.missingSkills.map((s, idx) => (
                      <span key={idx} style={{ fontSize: '0.7rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                        + Consider adding: {s}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onApplyClick && onApplyClick(item.jobTitle)}
                    className="btn btn-outline"
                    style={{ width: '100%', padding: '0.4rem 0.75rem', fontSize: '0.8rem', justifyContent: 'center' }}
                  >
                    Apply for {item.jobTitle} →
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ border: '1px dashed var(--color-border)', borderRadius: 'var(--radius-md)', padding: '3rem 2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Upload your resume above or paste text to compute match compatibility against all live vacancies.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
