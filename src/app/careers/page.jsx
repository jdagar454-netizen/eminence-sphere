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
    location: "Remote (Work From Home)",
    type: "Full-Time",
    salary: "₹18,000 - ₹25,000 per month",
    shortDescription: "Help customers resolve queries via phone, email, and live chat. Work from the comfort of your home with a leading global brand."
  },
  {
    id: "tech-support-specialist",
    title: "Senior Technical Support Specialist",
    department: "IT & Tech Support Services",
    location: "In-Office (Meerut)",
    type: "Full-Time",
    salary: "₹30,000 - ₹45,000 per month",
    shortDescription: "Solve complex technical hurdles, escalate network issues, and guide enterprise users through configuration pipelines."
  },
  {
    id: "telecalling-sales-executive",
    title: "Telecalling & Sales Executive",
    department: "Telesales & Telecalling",
    location: "Rohta Road, Meerut",
    type: "Full-Time",
    salary: "₹15,000 - ₹22,000 per month + incentives",
    shortDescription: "Drive customer engagement, follow up with potential leads, and support closures for non-IT consulting pipelines."
  }
];

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "jobs"));
        const jobsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // If Firestore is empty (intentionally cleared by admin), use it. 
        // Otherwise on errors, go to fallbacks.
        setJobs(jobsData.length > 0 ? jobsData : []);
      } catch (err) {
        console.error("Error fetching jobs, using local fallbacks:", err);
        setJobs(FALLBACK_JOBS);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Filtered jobs calculations
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDept = selectedDept === 'All' || job.department === selectedDept;
    const matchesType = selectedType === 'All' || job.type === selectedType;

    return matchesSearch && matchesDept && matchesType;
  });

  // Get unique departments & types for filter pills
  const departments = ['All', ...new Set(jobs.map(j => j.department))];
  const types = ['All', ...new Set(jobs.map(j => j.type || 'Full-Time'))];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .careers-section {
          padding-top: calc(var(--nav-height) + 2rem);
          padding-bottom: 6rem;
        }

        .filter-controls-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 1.75rem;
          margin-bottom: 3rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          box-shadow: var(--shadow-card);
        }

        .search-wrapper {
          position: relative;
          width: 100%;
        }

        .search-input {
          width: 100%;
          padding: 0.85rem 1.25rem;
          padding-left: 2.75rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-family: inherit;
          font-size: 0.95rem;
        }

        .search-input:focus {
          outline: none;
          border-color: var(--purple-primary);
          box-shadow: 0 0 0 2px rgba(124, 58, 237, 0.15);
        }

        .search-icon-svg {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          width: 18px;
          height: 18px;
          color: var(--text-muted);
        }

        .filter-pills-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .filter-label-text {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          min-width: 100px;
        }

        .pill-btn {
          padding: 0.4rem 1rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          border: 1px solid var(--color-border);
          background: transparent;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.25s;
        }

        .pill-btn:hover {
          border-color: var(--purple-primary);
          color: var(--purple-primary);
        }

        .pill-btn.active {
          background: var(--purple-primary);
          color: white;
          border-color: var(--purple-primary);
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
          padding: 2.25rem;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .job-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-card-hover);
        }

        .job-meta-line {
          display: flex;
          gap: 1.25rem;
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 1.25rem;
        }
        
        .job-btn-primary {
          background: var(--purple-gradient);
          color: white;
          padding: 0.85rem 1rem;
          border-radius: var(--radius-sm);
          font-weight: 700;
          text-align: center;
          display: block;
          margin-top: auto;
          transition: opacity 0.3s;
        }

        .job-btn-primary:hover {
          opacity: 0.9;
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
          
          <div className="filter-controls-card">
            <div className="search-wrapper">
              <svg className="search-icon-svg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search job titles or keywords..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            {jobs.length > 0 && (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div className="filter-pills-row">
                    <span className="filter-label-text">Department</span>
                    {departments.map(dept => (
                      <button 
                        key={dept} 
                        className={`pill-btn ${selectedDept === dept ? 'active' : ''}`}
                        onClick={() => setSelectedDept(dept)}
                      >
                        {dept}
                      </button>
                    ))}
                  </div>

                  <div className="filter-pills-row">
                    <span className="filter-label-text">Job Type</span>
                    {types.map(type => (
                      <button 
                        key={type} 
                        className={`pill-btn ${selectedType === type ? 'active' : ''}`}
                        onClick={() => setSelectedType(type)}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem' }}>Loading opportunities...</div>
          ) : filteredJobs.length === 0 ? (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem", width: "100%" }}>
              <div className="card" style={{ maxWidth: "600px", width: "100%", textAlign: "center", padding: "3.5rem 2rem" }}>
                <div style={{ fontSize: "3.5rem", marginBottom: "1.5rem" }}>📁</div>
                <h3 className="heading-md" style={{ marginBottom: "1rem" }}>No Opportunities Found</h3>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "2rem" }}>
                  We couldn't find any job vacancies matching your query. Clear your filters or register with our virtual recruitment assistant to be matched with future roles.
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
            <div>
              <div style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
                Showing {filteredJobs.length} active roles
              </div>
              <div className="jobs-grid">
                {filteredJobs.map((job) => (
                  <div key={job.id} className="card job-card">
                    <h3 className="heading-md" style={{ marginBottom: '0.5rem' }}>{job.title}</h3>
                    <p style={{ color: 'var(--purple-primary)', fontWeight: '700', fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {job.department}
                    </p>
                    
                    <div className="job-meta-line">
                      <span>📍 {job.location || 'Remote'}</span>
                      <span>💼 {job.type || 'Full-Time'}</span>
                    </div>

                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', flexGrow: 1, fontSize: '0.9375rem', lineHeight: 1.7 }}>
                      {job.shortDescription}
                    </p>
                    <Link href={`/careers/${job.id}`} className="job-btn-primary">
                      View Details &amp; Apply
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </>
  );
}
