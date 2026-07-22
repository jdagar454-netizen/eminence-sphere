"use client";

import React, { useState } from 'react';
import { submitJobApplication } from '../lib/firebase';

export default function ApplyModal({ jobTitle, isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experienceYears: '0-1',
    coverNote: '',
    resumeFileName: ''
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, resumeFileName: file.name });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    const result = await submitJobApplication({
      jobTitle: jobTitle || 'General Application',
      ...formData,
      appliedAt: new Date().toISOString()
    });

    if (result.success) {
      setStatus({ loading: false, success: true, error: null });
      setTimeout(() => {
        setStatus({ loading: false, success: false, error: null });
        onClose();
      }, 2000);
    } else {
      setStatus({ loading: false, success: false, error: result.error || 'Submission failed' });
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 99999, background: 'rgba(5, 8, 22, 0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div className="card" style={{ width: '100%', maxWidth: '520px', padding: '2rem', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', position: 'relative' }}>
        
        <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}>
          ✕
        </button>

        <div style={{ marginBottom: '1.5rem' }}>
          <div className="section-tag" style={{ justifyContent: 'flex-start' }}>Direct Application</div>
          <h3 className="heading-md" style={{ marginTop: '0.25rem' }}>Apply for {jobTitle}</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Fill in your contact details to submit your application directly to the Eminence recruitment team.</p>
        </div>

        {status.success ? (
          <div style={{ padding: '2rem', textAlign: 'center', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', borderRadius: 'var(--radius-md)', color: '#10b981' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎉</div>
            <h4 style={{ margin: '0 0 0.5rem 0' }}>Application Received!</h4>
            <p style={{ fontSize: '0.85rem', margin: 0 }}>Our talent acquisition team will review your profile and reach out within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>Full Name *</label>
              <input required type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="e.g. Rahul Sharma" style={{ width: '100%', padding: '0.65rem', background: 'var(--color-bg-2)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>Email Address *</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="rahul@example.com" style={{ width: '100%', padding: '0.65rem', background: 'var(--color-bg-2)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>Phone Number *</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 63965 82575" style={{ width: '100%', padding: '0.65rem', background: 'var(--color-bg-2)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>Relevant Experience</label>
                <select name="experienceYears" value={formData.experienceYears} onChange={handleChange} style={{ width: '100%', padding: '0.65rem', background: 'var(--color-bg-2)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none' }}>
                  <option value="Fresher">Fresher (0 years)</option>
                  <option value="0-1">0 - 1 Years</option>
                  <option value="1-3">1 - 3 Years</option>
                  <option value="3+">3+ Years</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>Upload Resume (.pdf/.docx)</label>
                <input type="file" accept=".pdf,.docx,.txt" onChange={handleFileChange} style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }} />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>Key Skills / Note</label>
              <textarea name="coverNote" value={formData.coverNote} onChange={handleChange} placeholder="Mention your core skills, current location, or notice period..." style={{ width: '100%', height: '70px', padding: '0.65rem', background: 'var(--color-bg-2)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none', resize: 'none' }} />
            </div>

            {status.error && (
              <div style={{ fontSize: '0.8rem', color: '#ef4444' }}>{status.error}</div>
            )}

            <button type="submit" disabled={status.loading} className="btn btn-primary" style={{ padding: '0.85rem', justifyContent: 'center', fontWeight: 'bold', marginTop: '0.5rem' }}>
              {status.loading ? 'Submitting...' : 'Submit Application Instantly'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
