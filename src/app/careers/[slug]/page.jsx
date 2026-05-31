"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { db } from '../../../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Link from 'next/link';

const FALLBACK_JOBS_DETAILS = {
  "customer-support-wfh": {
    title: "Customer Support Representative (WFH)",
    department: "Customer Support & BPO",
    location: "Remote (Work From Home)",
    type: "Full-Time",
    salary: "₹18,000 - ₹25,000 per month",
    description: "Eminence Sphere is hiring Entry-Level Customer Support Representatives for our remote work placement pipeline. In this role, you will act as the primary point of contact for customer queries, helping them troubleshoot technical issues, manage accounts, and process request closures with high efficiency.",
    requirements: [
      "Excellent verbal & written communication in English",
      "Comfort with basic technology tools and internet browsing",
      "Previous customer service experience is a plus, but entry-level candidates are welcome",
      "Quiet workspace environment at home with reliable internet connection"
    ]
  },
  "tech-support-specialist": {
    title: "Senior Technical Support Specialist",
    department: "IT & Tech Support Services",
    location: "In-Office (Meerut)",
    type: "Full-Time",
    salary: "₹30,000 - ₹45,000 per month",
    description: "We are seeking a seasoned Tech Support Specialist to support global BPO clients. You will manage advanced tier-2 technical queries, coordinate troubleshooting pipelines, and maintain high standards of performance and resolution closure rates.",
    requirements: [
      "Graduate in CS/IT or equivalent technical certification",
      "1-3 years of technical helpdesk or enterprise systems support experience",
      "Deep knowledge of hardware systems, operating software, and routing protocols",
      "Analytical mindset to solve complex network hurdles"
    ]
  },
  "telecalling-sales-executive": {
    title: "Telecalling & Sales Executive",
    department: "Telesales & Telecalling",
    location: "Rohta Road, Meerut",
    type: "Full-Time",
    salary: "₹15,000 - ₹22,000 per month + incentives",
    description: "Join a fast-growing recruitment and sales outreach setup. You will run out-bound calling campaigns to pitch services, schedule candidate screening interviews, and coordinate recruitment workflows.",
    requirements: [
      "High energy levels and persuasive communication skills",
      "Bilingual fluency in Hindi & English",
      "Basic knowledge of spreadsheet operations and contact databases",
      "Goal-oriented approach to close hiring outreach milestones"
    ]
  }
};

export default function CareerDetails() {
  const { slug } = useParams();
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Application Form State
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', experience: '', resume: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const docRef = doc(db, "jobs", slug);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setJob({ id: docSnap.id, ...docSnap.data() });
        } else if (FALLBACK_JOBS_DETAILS[slug]) {
          setJob({ id: slug, ...FALLBACK_JOBS_DETAILS[slug] });
        } else {
          router.push('/not-found');
        }
      } catch (err) {
        console.warn("Error fetching job details, using fallbacks:", err.message || err);
        if (FALLBACK_JOBS_DETAILS[slug]) {
          setJob({ id: slug, ...FALLBACK_JOBS_DETAILS[slug] });
        } else {
          router.push('/not-found');
        }
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchJob();
  }, [slug, router]);

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setError('Please fill out all required fields.');
      return;
    }
    setError('');
    setSubmitting(true);

    const id = 'ES-' + Date.now();
    const payload = {
      ...formData,
      id,
      role: job.title,
      status: 'Applied',
      submittedAt: new Date().toISOString()
    };

    try {
      await setDoc(doc(db, "candidates", id), payload);
      
      // Save application details locally so Candidate Portal can read it
      const localApps = JSON.parse(localStorage.getItem('eminence_local_applications') || '[]');
      localApps.push(payload);
      localStorage.setItem('eminence_local_applications', JSON.stringify(localApps));

      setFormSubmitted(true);
    } catch (err) {
      console.warn("Firestore error, saving locally:", err);
      // Fallback local storage
      const local = JSON.parse(localStorage.getItem('eminence_candidates') || '[]');
      local.push(payload);
      localStorage.setItem('eminence_candidates', JSON.stringify(local));
      setFormSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading job details...</div>;
  }

  if (!job) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .job-header-section {
          padding-top: calc(var(--nav-height) + 4rem);
          padding-bottom: 4rem;
          background: var(--color-bg-2);
          border-bottom: 1px solid var(--color-border);
        }
        .job-content-section {
          padding: 4rem 0;
        }
        .apply-btn {
          background: var(--gold-gradient);
          color: white;
          padding: 1rem 2rem;
          border-radius: var(--radius-sm);
          font-weight: 700;
          font-size: 1.1rem;
          cursor: pointer;
          border: none;
          display: inline-block;
          margin-top: 1rem;
        }
      `}} />
      <section className="job-header-section">
        <div className="container">
          <Link href="/careers" style={{ color: 'var(--gold-primary)', display: 'inline-block', marginBottom: '2rem' }}>&larr; Back to Careers</Link>
          <div className="badge badge-gold" style={{ marginBottom: "1rem" }}>{job.department}</div>
          <h1 className="heading-xl">{job.title}</h1>
          <div style={{ display: 'flex', gap: '2rem', marginTop: '1.5rem', color: 'var(--text-secondary)' }}>
            <span>📍 {job.location || 'Remote'}</span>
            <span>💼 {job.type || 'Full-time'}</span>
            <span>💰 {job.salary || 'Competitive'}</span>
          </div>
        </div>
      </section>

      <section className="job-content-section">
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 className="heading-md" style={{ marginBottom: '1.5rem' }}>About the Role</h2>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '3rem' }}>
            {job.description}
          </div>
          
          <h2 className="heading-md" style={{ marginBottom: '1.5rem' }}>Requirements</h2>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', paddingLeft: '1.5rem', marginBottom: '3rem' }}>
            {job.requirements?.map((req, i) => <li key={i} style={{ marginBottom: '0.5rem' }}>{req}</li>)}
          </ul>

          <div className="card" style={{ padding: '3rem 2.5rem' }}>
            {!showForm ? (
              <div style={{ textAlign: 'center' }}>
                <h3 className="heading-md" style={{ marginBottom: '1rem' }}>Interested in this position?</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Apply directly to our recruitment pipeline in seconds.</p>
                <button className="apply-btn" onClick={() => setShowForm(true)}>
                  Apply for Role Now
                </button>
              </div>
            ) : formSubmitted ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                <h3 className="heading-md" style={{ marginBottom: '1rem' }}>Application Submitted!</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Your candidate profile has been synced with our recruitment database.</p>
                <Link href="/dashboard" className="btn btn-primary">Go to Candidate Dashboard</Link>
              </div>
            ) : (
              <div>
                <h3 className="heading-sm" style={{ marginBottom: '1.5rem' }}>Job Application Form</h3>
                
                {error && <div className="login-error" style={{ marginBottom: '1.5rem' }}>{error}</div>}

                <form onSubmit={handleApplySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      required 
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input 
                      type="email" 
                      className="form-input" 
                      required 
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      required 
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Years of Experience *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. 2 years" 
                      required 
                      value={formData.experience}
                      onChange={e => setFormData({ ...formData, experience: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Resume summary/link</label>
                    <textarea 
                      className="form-input" 
                      rows="4" 
                      placeholder="Paste resume summary, skills, or cloud link here..."
                      value={formData.resume}
                      onChange={e => setFormData({ ...formData, resume: e.target.value })}
                      style={{ height: 'auto', resize: 'vertical' }}
                    ></textarea>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button type="button" onClick={() => setShowForm(false)} className="btn btn-outline">Cancel</button>
                    <button type="submit" disabled={submitting} className="btn btn-primary">
                      {submitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
