"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '../../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, orderBy, query, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('jobs'); // 'jobs' | 'applications' | 'inquiries' | 'client_requests' | 'candidates'
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [clientRequests, setClientRequests] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Form states for Add/Edit Job
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJobId, setEditingJobId] = useState(null);
  const [jobForm, setJobForm] = useState({
    title: '',
    department: '',
    category: 'Customer Support & BPO',
    location: '',
    type: 'Full-Time',
    salary: '',
    shortDescription: '',
    description: '',
    requirements: '',
    active: true
  });
  const [formError, setFormError] = useState('');
  const [savingJob, setSavingJob] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        // Fallback for dev mode: if no auth configured, allow access or check user
        setUser(currentUser || { email: 'admin@eminencesphere.online' });
        fetchData();
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
      // 1. Fetch Jobs
      const jobsSnapshot = await getDocs(collection(db, "jobs"));
      const jobsData = jobsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setJobs(jobsData);

      // 2. Fetch Direct Applications
      try {
        const appSnapshot = await getDocs(query(collection(db, "applications"), orderBy("createdAt", "desc")));
        const appData = appSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setApplications(appData);
      } catch (e) {
        const appSnapshot = await getDocs(collection(db, "applications"));
        setApplications(appSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }

      // 3. Fetch Contact Inquiries
      try {
        const inqSnapshot = await getDocs(query(collection(db, "contact_inquiries"), orderBy("createdAt", "desc")));
        setInquiries(inqSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (e) {
        const inqSnapshot = await getDocs(collection(db, "contact_inquiries"));
        setInquiries(inqSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }

      // 4. Fetch Corporate Client Hiring Requests
      try {
        const reqSnapshot = await getDocs(query(collection(db, "client_hiring_requests"), orderBy("createdAt", "desc")));
        setClientRequests(reqSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (e) {
        const reqSnapshot = await getDocs(collection(db, "client_hiring_requests"));
        setClientRequests(reqSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }

      // 5. Fetch Chatbot Candidates
      try {
        const candSnapshot = await getDocs(collection(db, "candidates"));
        setCandidates(candSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (e) {
        console.warn("No chatbot candidates:", e);
      }

    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {}
    router.push('/admin/login');
  };

  const handleOpenAddJob = () => {
    setEditingJobId(null);
    setJobForm({
      title: '',
      department: '',
      category: 'Customer Support & BPO',
      location: '',
      type: 'Full-Time',
      salary: '',
      shortDescription: '',
      description: '',
      requirements: '',
      active: true
    });
    setFormError('');
    setShowJobForm(true);
  };

  const handleOpenEditJob = (job) => {
    setEditingJobId(job.id);
    setJobForm({
      title: job.title || '',
      department: job.department || '',
      category: job.category || job.department || 'Customer Support & BPO',
      location: job.location || '',
      type: job.type || 'Full-Time',
      salary: job.salary || '',
      shortDescription: job.shortDescription || '',
      description: job.description || '',
      requirements: Array.isArray(job.requirements) ? job.requirements.join('\n') : (job.requirements || ''),
      active: job.active !== undefined ? job.active : true
    });
    setFormError('');
    setShowJobForm(true);
  };

  const handleToggleJobActive = async (job) => {
    const nextStatus = !job.active;
    try {
      await updateDoc(doc(db, "jobs", job.id), { active: nextStatus });
      setJobs(jobs.map(j => j.id === job.id ? { ...j, active: nextStatus } : j));
    } catch (err) {
      alert("Failed to toggle status: " + err.message);
    }
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
        category: jobForm.category || jobForm.department,
        location: jobForm.location || 'Remote (Work From Home)',
        type: jobForm.type,
        salary: jobForm.salary || '₹18,000 - ₹25,000 / mo',
        shortDescription: jobForm.shortDescription,
        description: jobForm.description,
        requirements: requirementsArray,
        active: jobForm.active,
        updatedAt: new Date().toISOString()
      };

      if (editingJobId) {
        await updateDoc(doc(db, "jobs", editingJobId), jobData);
      } else {
        const customId = jobForm.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');

        await updateDoc(doc(db, "jobs", customId), jobData);
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

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--color-bg-1)', color: 'var(--text-primary)' }}>
        Loading Admin Operations Portal...
      </div>
    );
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
          overflow-x: auto;
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
          white-space: nowrap;
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

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
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
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--purple-primary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>HR & Operational Control</span>
            <h1 className="heading-lg" style={{ margin: 0 }}>Eminence Sphere Portal</h1>
          </div>
          <button onClick={handleLogout} className="btn btn-outline">Logout</button>
        </div>

        <div className="tabs-header">
          <button 
            className={`tab-btn ${activeTab === 'jobs' ? 'active' : ''}`}
            onClick={() => setActiveTab('jobs')}
          >
            💼 Job Openings ({jobs.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'applications' ? 'active' : ''}`}
            onClick={() => setActiveTab('applications')}
          >
            📥 Applications ({applications.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
            onClick={() => setActiveTab('inquiries')}
          >
            ✉️ Inquiries ({inquiries.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'client_requests' ? 'active' : ''}`}
            onClick={() => setActiveTab('client_requests')}
          >
            🏢 Hiring Requests ({clientRequests.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'candidates' ? 'active' : ''}`}
            onClick={() => setActiveTab('candidates')}
          >
            🤖 Chatbot Submissions ({candidates.length})
          </button>
        </div>

        {/* ═══════════════════ TAB 1: JOBS ═══════════════════ */}
        {activeTab === 'jobs' && (
          <div>
            <div className="action-header-row">
              <h2 className="heading-md">Live Vacancies & Openings</h2>
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
                        <th style={{ padding: '1rem' }}>Title</th>
                        <th style={{ padding: '1rem' }}>Category</th>
                        <th style={{ padding: '1rem' }}>Location</th>
                        <th style={{ padding: '1rem' }}>Salary</th>
                        <th style={{ padding: '1rem' }}>Status</th>
                        <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobs.map((job) => (
                        <tr key={job.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                          <td style={{ padding: '1rem', fontWeight: 'bold' }}>{job.title}</td>
                          <td style={{ padding: '1rem' }}>{job.category || job.department}</td>
                          <td style={{ padding: '1rem' }}>{job.location}</td>
                          <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{job.salary}</td>
                          <td style={{ padding: '1rem' }}>
                            <button
                              onClick={() => handleToggleJobActive(job)}
                              style={{
                                border: 'none',
                                cursor: 'pointer',
                                padding: '0.25rem 0.65rem',
                                borderRadius: '20px',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                background: job.active !== false ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                color: job.active !== false ? '#22c55e' : '#ef4444'
                              }}
                            >
                              {job.active !== false ? '🟢 Active' : '🔴 Paused'}
                            </button>
                          </td>
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

        {/* ═══════════════════ TAB 2: APPLICATIONS ═══════════════════ */}
        {activeTab === 'applications' && (
          <div className="card">
            <h2 className="heading-md" style={{ marginBottom: '1.5rem' }}>Candidate Applications</h2>
            {applications.length === 0 ? (
              <p className="text-secondary">No direct applications received yet.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                      <th style={{ padding: '1rem' }}>Applicant Name</th>
                      <th style={{ padding: '1rem' }}>Job Applied For</th>
                      <th style={{ padding: '1rem' }}>Contact Email & Phone</th>
                      <th style={{ padding: '1rem' }}>Experience</th>
                      <th style={{ padding: '1rem' }}>Resume File</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app) => (
                      <tr key={app.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <td style={{ padding: '1rem', fontWeight: 'bold' }}>{app.fullName}</td>
                        <td style={{ padding: '1rem', color: 'var(--purple-primary)', fontWeight: 600 }}>{app.jobTitle}</td>
                        <td style={{ padding: '1rem' }}>
                          <div><a href={`mailto:${app.email}`} className="text-gold">{app.email}</a></div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{app.phone}</div>
                        </td>
                        <td style={{ padding: '1rem' }}>{app.experienceYears} Years</td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            📄 {app.resumeFileName || 'Submitted via Form'}
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

        {/* ═══════════════════ TAB 3: CONTACT INQUIRIES ═══════════════════ */}
        {activeTab === 'inquiries' && (
          <div className="card">
            <h2 className="heading-md" style={{ marginBottom: '1.5rem' }}>Client & Visitor Inquiries</h2>
            {inquiries.length === 0 ? (
              <p className="text-secondary">No contact inquiries received yet.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                      <th style={{ padding: '1rem' }}>Name & Company</th>
                      <th style={{ padding: '1rem' }}>Email & Phone</th>
                      <th style={{ padding: '1rem' }}>Service Needed</th>
                      <th style={{ padding: '1rem' }}>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.map((inq) => (
                      <tr key={inq.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <td style={{ padding: '1rem', fontWeight: 'bold' }}>
                          {inq.firstName} {inq.lastName}
                          {inq.company && <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>🏢 {inq.company}</div>}
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <div><a href={`mailto:${inq.email}`} className="text-gold">{inq.email}</a></div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{inq.phone}</div>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.5rem', background: 'rgba(124,58,237,0.1)', color: 'var(--purple-primary)', borderRadius: '4px' }}>
                            {inq.service || 'General Inquiry'}
                          </span>
                        </td>
                        <td style={{ padding: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                          {inq.message}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ═══════════════════ TAB 4: CLIENT HIRING REQUESTS ═══════════════════ */}
        {activeTab === 'client_requests' && (
          <div className="card">
            <h2 className="heading-md" style={{ marginBottom: '1.5rem' }}>Corporate Bulk Hiring Requests</h2>
            {clientRequests.length === 0 ? (
              <p className="text-secondary">No corporate client hiring requests submitted yet.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                      <th style={{ padding: '1rem' }}>Company</th>
                      <th style={{ padding: '1rem' }}>Contact Person</th>
                      <th style={{ padding: '1rem' }}>Role Needed</th>
                      <th style={{ padding: '1rem' }}>Headcount</th>
                      <th style={{ padding: '1rem' }}>Budget / Head</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientRequests.map((req) => (
                      <tr key={req.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <td style={{ padding: '1rem', fontWeight: 'bold' }}>{req.companyName}</td>
                        <td style={{ padding: '1rem' }}>
                          <div>{req.contactName}</div>
                          <div><a href={`mailto:${req.email}`} className="text-gold">{req.email}</a></div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{req.phone}</div>
                        </td>
                        <td style={{ padding: '1rem', color: 'var(--purple-primary)', fontWeight: 600 }}>{req.targetRole}</td>
                        <td style={{ padding: '1rem', fontWeight: 700 }}>{req.headcount} Positions</td>
                        <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{req.budgetRange}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ═══════════════════ TAB 5: CANDIDATES ═══════════════════ */}
        {activeTab === 'candidates' && (
          <div className="card">
            <h2 className="heading-md" style={{ marginBottom: '1.5rem' }}>Chatbot Assistant Leads</h2>
            {candidates.length === 0 ? (
              <p className="text-secondary">No chatbot candidate leads found.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                      <th style={{ padding: '1rem' }}>Name</th>
                      <th style={{ padding: '1rem' }}>Role</th>
                      <th style={{ padding: '1rem' }}>Email</th>
                      <th style={{ padding: '1rem' }}>Experience</th>
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
                          {cand.experience || 'Not specified'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
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
                    placeholder="e.g. Senior Customer Support Representative"
                    value={jobForm.title} 
                    onChange={e => setJobForm({...jobForm, title: e.target.value})}
                    required 
                  />
                </div>

                <div className="form-group-admin">
                  <label>Department / Category *</label>
                  <select 
                    value={jobForm.category} 
                    onChange={e => setJobForm({...jobForm, category: e.target.value, department: e.target.value})}
                  >
                    <option value="Customer Support & BPO">Customer Support & BPO</option>
                    <option value="IT & Tech Support Services">IT & Tech Support Services</option>
                    <option value="Telesales & Telecalling">Telesales & Telecalling</option>
                    <option value="Operations & Management">Operations & Management</option>
                  </select>
                </div>

                <div className="form-group-admin">
                  <label>Location</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Remote (Work From Home) or Meerut"
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
                  <label>Salary (INR Monthly Range)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. ₹18,000 - ₹25,000 / mo"
                    value={jobForm.salary} 
                    onChange={e => setJobForm({...jobForm, salary: e.target.value})}
                  />
                </div>

                <div className="form-group-admin form-grid-full">
                  <label>Short Description * (shown on job cards)</label>
                  <textarea 
                    rows={2}
                    placeholder="Brief description summarizing the placement role..."
                    value={jobForm.shortDescription} 
                    onChange={e => setJobForm({...jobForm, shortDescription: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group-admin form-grid-full">
                  <label>Detailed Description *</label>
                  <textarea 
                    rows={4}
                    placeholder="Describe responsibilities and requirements..."
                    value={jobForm.description} 
                    onChange={e => setJobForm({...jobForm, description: e.target.value})}
                    required
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
