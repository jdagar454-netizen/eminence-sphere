"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

const FALLBACK_JOBS = [
  {
    id: "customer-support-wfh",
    title: "Customer Support Representative (WFH)",
    department: "Customer support & BPO",
    shortDescription: "Help customers resolve queries via phone, email, and live chat. Work from the comfort of your home with a leading global brand."
  },
  {
    id: "tech-support-specialist",
    title: "Senior Technical Support Specialist",
    department: "IT & Tech Support Services",
    shortDescription: "Solve complex technical hurdles, escalate network issues, and guide enterprise users through configuration pipelines."
  },
  {
    id: "telecalling-sales-executive",
    title: "Telecalling & Sales Executive",
    department: "Telesales & Telecalling",
    shortDescription: "Drive customer engagement, follow up with potential leads, and support closures for non-IT consulting pipelines."
  }
];

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "jobs"));
        const jobsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // If Firestore contains jobs (or has been successfully fetched as empty), use it
        setJobs(jobsData);
      } catch (err) {
        console.error("Error fetching jobs, using local fallbacks:", err);
        setJobs(FALLBACK_JOBS);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .careers-section {
          padding-top: calc(var(--nav-height) + 3rem);
          padding-bottom: 6rem;
        }

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
          padding: 2rem;
        }
        
        .job-btn-primary {
          background: var(--gold-gradient);
          color: var(--navy-deep);
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          font-weight: 600;
          text-align: center;
          display: block;
          margin-top: auto;
        }
      ` }} />
      <section className="page-hero">
        <div className="glow-orb glow-orb-gold" style={{ width: "500px", height: "500px", top: "-150px", left: "50%", transform: "translateX(-50%)", opacity: 0.4 }}></div>
        <div className="container">
          <div className="badge badge-gold" style={{ marginBottom: "1.25rem" }}>Hiring Opportunities</div>
          <h1 className="heading-xl page-hero-title">Careers &amp; <span className="text-gold">Placements</span></h1>
          <p className="page-hero-subtitle">Connect with industry leaders. We are currently sourcing candidates for placement at leading global enterprises.</p>
        </div>
      </section>

      <main className="careers-section">
        <div className="container">
          
          <div className="careers-intro" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="section-tag">Join Our Team</div>
            <h2 className="heading-lg">Active Placements</h2>
            <div className="gold-divider" style={{ margin: '1rem auto' }}></div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem' }}>Loading opportunities...</div>
          ) : jobs.length === 0 ? (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem", width: "100%" }}>
              <div className="card" style={{ maxWidth: "600px", width: "100%", textAlign: "center", padding: "3rem 2rem", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>📁</div>
                <h3 className="heading-md" style={{ marginBottom: "1rem", color: "var(--text-primary)" }}>No Active Openings</h3>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "2rem" }}>
                  We are not currently listing active job vacancies. However, our talent pipeline is always open. Submit your details to our virtual recruitment assistant to be matched with future roles.
                </p>
                <button 
                  className="job-btn-primary open-bot-btn" 
                  style={{ maxWidth: "280px", margin: "0 auto", cursor: "pointer", border: "none" }}
                  onClick={() => {
                    const launcher = document.querySelector('.es-chatbot-launcher');
                    if (launcher) launcher.click();
                  }}
                >
                  Register with AI Assistant
                </button>
              </div>
            </div>
          ) : (
            <div className="jobs-grid">
              {jobs.map((job) => (
                <div key={job.id} className="card job-card">
                  <h3 className="heading-md" style={{ marginBottom: '0.5rem' }}>{job.title}</h3>
                  <p style={{ color: 'var(--gold-primary)', fontWeight: '600', marginBottom: '1rem' }}>{job.department}</p>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', flexGrow: 1 }}>{job.shortDescription}</p>
                  <Link href={`/careers/${job.id}`} className="job-btn-primary">
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>
    </>
  );
}
