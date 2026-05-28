"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { db } from '../../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';

export default function CareerDetails() {
  const { slug } = useParams();
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const docRef = doc(db, "jobs", slug);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setJob({ id: docSnap.id, ...docSnap.data() });
        } else {
          // Document doesn't exist
          router.push('/not-found');
        }
      } catch (err) {
        console.error("Error fetching job details:", err);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchJob();
  }, [slug, router]);

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
          color: var(--navy-deep);
          padding: 1rem 2rem;
          border-radius: var(--radius-sm);
          font-weight: 700;
          font-size: 1.1rem;
          cursor: pointer;
          border: none;
          display: inline-block;
          margin-top: 2rem;
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
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '3rem' }} dangerouslySetInnerHTML={{ __html: job.description }} />
          
          <h2 className="heading-md" style={{ marginBottom: '1.5rem' }}>Requirements</h2>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', paddingLeft: '1.5rem', marginBottom: '3rem' }}>
            {job.requirements?.map((req, i) => <li key={i} style={{ marginBottom: '0.5rem' }}>{req}</li>)}
          </ul>

          <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
            <h3 className="heading-md" style={{ marginBottom: '1rem' }}>Interested in this position?</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Apply easily by chatting with our AI assistant.</p>
            <button 
              className="apply-btn"
              onClick={() => {
                const launcher = document.querySelector('.es-chatbot-launcher');
                if (launcher) launcher.click();
              }}
            >
              Apply with Eminence AI
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
