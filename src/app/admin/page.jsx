"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '../../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, orderBy, query, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('candidates'); // 'candidates' | 'jobs'
  const [candidates, setCandidates] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Form states for Add/Edit Job
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJobId, setEditingJobId] = useState(null);
  const [jobForm, setJobForm] = useState({
    title: '',
    department: '',
    location: '',
    type: 'Full-Time',
    salary: '',
    shortDescription: '',
    description: '',
    requirements: ''
  });
  const [formError, setFormError] = useState('');
  const [savingJob, setSavingJob] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/admin/login');
      } else {
        setUser(currentUser);
        fetchData();
      }
    });
    return () => unsubscribe();
  }, [router]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Candidates
      const candQuery = query(collection(db, "candidates"), orderBy("submittedAt", "desc"));
      const candSnapshot = await getDocs(candQuery);
      const candData = candSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCandidates(candData);

      // Fetch Jobs
      const jobsSnapshot = await getDocs(collection(db, "jobs"));
      const jobsData = jobsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setJobs(jobsData);
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/admin/login');
  };

  const handleOpenAddJob = () => {
    setEditingJobId(null);
    setJobForm({
      title: '',
      department: '',
      location: '',
      type: 'Full-Time',
      salary: '',
      shortDescription: '',
      description: '',
      requirements: ''
    });
    setFormError('');
    setShowJobForm(true);
  };

  const handleOpenEditJob = (job) => {
    setEditingJobId(job.id);
    setJobForm({
      title: job.title || '',
      department: job.department || '',
      location: job.location || '',
      type: job.type || 'Full-Time',
      salary: job.salary || '',
      shortDescription: job.shortDescription || '',
      description: job.description || '',
      requirements: Array.isArray(job.requirements) ? job.requirements.join('\n') : (job.requirements || '')
    });
    setFormError('');
    setShowJobForm(true);
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job listing?")) return;
    try {
      await deleteDoc(doc(db, "jobs", jobId));
      setJobs(jobs.filter(j => j.id !== jobId));
    } catch (err) {
      console.error("Failed to delete job:", err);
      alert("Error deleting job: " + err.message);
    }
  };

  const handleSaveJob = async (e) => {
    e.preventDefault();
    setFormError('');
    
    // Basic validation
    if (!jobForm.title || !jobForm.department || !jobForm.shortDescription || !jobForm.description) {
      setFormError('Please fill in all required fields.');
      return;
    }

    setSavingJob(true);
    try {
      const requirementsArray = jobForm.requirements
        ? jobForm.requirements.split('\n').map(r => r.trim()).filter(r => r.length > 0)
        : [];

      const jobData = {
        title: jobForm.title,
        department: jobForm.department,
        location: jobForm.location || 'Remote',
        type: jobForm.type,
        salary: jobForm.salary || 'Competitive',
        shortDescription: jobForm.shortDescription,
        description: jobForm.description,
        requirements: requirementsArray
      };

      if (editingJobId) {
        // Edit Mode
        const jobRef = doc(db, "jobs", editingJobId);
        await updateDoc(jobRef, jobData);
      } else {
        // Add Mode
        // Generate custom id based on title-slug
        const customId = jobForm.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');
        
        // Add doc with title as ID to make SEO friendly routing match [slug]
        const jobRef = doc(db, "jobs", customId);
        await updateDoc(jobRef, jobData); // Using updateDoc on custom doc ref will create it
      }

      await fetchData();
      setShowJobForm(false);
    } catch (err) {
      console.error("Failed to save job:", err);
      setFormError("Failed to save: " + err.message);
    } finally {
      setSavingJob(false);
    }
  };

  if (loading || !user) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .admin-dashboard-container {
          padding: 2rem;
          padding-top: calc(var(--nav-height) + 2rem);
          max-width: 1200px;
          margin: 0 auto;
          min-height: 100vh;
        }

        .tabs-header {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          border-bottom: 1px solid var(--color-border);
          padding-bottom: 1px;
        }

        .tab-btn {
          padding: 0.75rem 1.5rem;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-weight: 600;
          cursor: pointer;
          position: relative;
          transition: color 0.3s;
        }

        .tab-btn:hover {
          color: var(--text-primary);
        }

        .tab-btn.active {
          color: var(--gold-light);
        }

        .tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 2px;
          background: var(--gold-gradient);
        }

        .action-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        /* Modal Overlay */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 2rem;
        }

        .modal-card {
          background: var(--color-bg-2);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          max-width: 650px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          padding: 2.5rem;
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
          margin-bottom: 1.5rem;
        }

        .form-grid-full {
          grid-column: span 2;
        }

        .form-group-admin {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group-admin label {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .form-group-admin input, 
        .form-group-admin select, 
        .form-group-admin textarea {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          padding: 0.75rem 1rem;
          color: var(--text-primary);
          font-family: inherit;
        }

        .form-group-admin input:focus, 
        .form-group-admin select:focus, 
        .form-group-admin textarea:focus {
          outline: none;
          border-color: var(--gold-primary);
          box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.2);
        }

        .form-actions-admin {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 2rem;
          border-top: 1px solid var(--color-border);
          padding-top: 1.5rem;
        }
      ` }} />

      <div className="admin-dashboard-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 className="heading-lg">Admin Dashboard</h1>
          <button onClick={handleLogout} className="btn btn-outline">Logout</button>
        </div>

        <div className="tabs-header">
          <button 
            className={`tab-btn ${activeTab === 'candidates' ? 'active' : ''}`}
            onClick={() => setActiveTab('candidates')}
          >
            Chatbot Submissions ({candidates.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'jobs' ? 'active' : ''}`}
            onClick={() => setActiveTab('jobs')}
          >
            Job Openings ({jobs.length})
          </button>
        </div>

        {/* ═══════════════════ TAB 1: CANDIDATES ═══════════════════ */}
        {activeTab === 'candidates' && (
          <div className="card">
            <h2 className="heading-md" style={{ marginBottom: '1.5rem' }}>Candidate Registrations</h2>
            {candidates.length === 0 ? (
              <p className="text-secondary">No candidates found.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                      <th style={{ padding: '1rem' }}>Name</th>
                      <th style={{ padding: '1rem' }}>Role</th>
                      <th style={{ padding: '1rem' }}>Email</th>
                      <th style={{ padding: '1rem' }}>Date</th>
                      <th style={{ padding: '1rem' }}>Resume</th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidates.map((cand) => (
                      <tr key={cand.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <td style={{ padding: '1rem', fontWeight: '500' }}>{cand.name}</td>
                        <td style={{ padding: '1rem' }}>{cand.role}</td>
                        <td style={{ padding: '1rem' }}>
                          <a href={`mailto:${cand.email}`} className="text-gold">{cand.email}</a>
                        </td>
                        <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                          {new Date(cand.submittedAt).toLocaleDateString()}
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <span title={cand.resume} style={{ cursor: 'help', color: 'var(--text-muted)' }}>
                            {cand.resume.substring(0, 30)}{cand.resume.length > 30 ? '...' : ''}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ═══════════════════ TAB 2: JOBS ═══════════════════ */}
        {activeTab === 'jobs' && (
          <div>
            <div className="action-header-row">
              <h2 className="heading-md">Current Openings</h2>
              <button onClick={handleOpenAddJob} className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>+ Create Job</button>
            </div>

            <div className="card">
              {jobs.length === 0 ? (
                <p className="text-secondary">No active job listings. Click "+ Create Job" to add one.</p>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                        <th style={{ padding: '1rem' }}>Job Title</th>
                        <th style={{ padding: '1rem' }}>Department</th>
                        <th style={{ padding: '1rem' }}>Location</th>
                        <th style={{ padding: '1rem' }}>Type</th>
                        <th style={{ padding: '1rem' }}>Salary (INR)</th>
                        <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobs.map((job) => (
                        <tr key={job.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                          <td style={{ padding: '1rem', fontWeight: '500' }}>{job.title}</td>
                          <td style={{ padding: '1rem' }}>{job.department}</td>
                          <td style={{ padding: '1rem' }}>{job.location}</td>
                          <td style={{ padding: '1rem' }}>
                            <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.5rem', background: 'rgba(212,175,55,0.1)', color: 'var(--gold-light)', borderRadius: '4px' }}>
                              {job.type}
                            </span>
                          </td>
                          <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{job.salary}</td>
                          <td style={{ padding: '1rem', textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                              <button onClick={() => handleOpenEditJob(job)} className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Edit</button>
                              <button onClick={() => handleDeleteJob(job.id)} className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderColor: '#ef4444', color: '#ef4444' }}>Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ═══════════════════ CREATE / EDIT MODAL ═══════════════════ */}
      {showJobForm && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3 className="heading-md" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
              {editingJobId ? "Edit Job Opening" : "Create New Job Opening"}
            </h3>

            {formError && (
              <div style={{ color: '#ef4444', background: 'rgba(239,68,68,0.1)', padding: '0.75rem 1rem', borderRadius: '4px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                {formError}
              </div>
            )}

            <form onSubmit={handleSaveJob}>
              <div className="form-grid">
                <div className="form-group-admin">
                  <label>Job Title *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Sales Coordinator"
                    value={jobForm.title} 
                    onChange={e => setJobForm({...jobForm, title: e.target.value})}
                    required 
                  />
                </div>

                <div className="form-group-admin">
                  <label>Department *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Sales & Telecalling"
                    value={jobForm.department} 
                    onChange={e => setJobForm({...jobForm, department: e.target.value})}
                    required 
                  />
                </div>

                <div className="form-group-admin">
                  <label>Location</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Remote or Meerut"
                    value={jobForm.location} 
                    onChange={e => setJobForm({...jobForm, location: e.target.value})}
                  />
                </div>

                <div className="form-group-admin">
                  <label>Job Type</label>
                  <select 
                    value={jobForm.type} 
                    onChange={e => setJobForm({...jobForm, type: e.target.value})}
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>

                <div className="form-group-admin form-grid-full">
                  <label>Salary (INR Monthly or Annual Range)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. ₹18,000 - ₹25,000 per month"
                    value={jobForm.salary} 
                    onChange={e => setJobForm({...jobForm, salary: e.target.value})}
                  />
                </div>

                <div className="form-group-admin form-grid-full">
                  <label>Short Description * (shown on careers catalog page)</label>
                  <textarea 
                    rows={2}
                    placeholder="Brief description summarizing the placement role..."
                    value={jobForm.shortDescription} 
                    onChange={e => setJobForm({...jobForm, shortDescription: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group-admin form-grid-full">
                  <label>Detailed Job Description * (shown on details page)</label>
                  <textarea 
                    rows={4}
                    placeholder="Describe the company, responsibilities, objectives, and work structure..."
                    value={jobForm.description} 
                    onChange={e => setJobForm({...jobForm, description: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group-admin form-grid-full">
                  <label>Requirements (one requirement per line)</label>
                  <textarea 
                    rows={4}
                    placeholder="Excellent communication skills&#10;Comfortable with technology&#10;Prior BPO support experience is a plus"
                    value={jobForm.requirements} 
                    onChange={e => setJobForm({...jobForm, requirements: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-actions-admin">
                <button 
                  type="button" 
                  onClick={() => setShowJobForm(false)} 
                  className="btn btn-outline"
                  disabled={savingJob}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={savingJob}
                >
                  {savingJob ? "Saving..." : "Save Job Opening"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
