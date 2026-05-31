"use client";

import React, { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import { db, auth } from '../../lib/firebase';
import { collection, onSnapshot, doc, updateDoc, writeBatch, getDocs, deleteDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth';

const AVAILABLE_ROLES = [
  'Customer Support Representative',
  'Senior Customer Support Representative',
  'Virtual Support Representative',
  'Tech Support Specialist',
  'Operations Team Lead',
  'Other'
];

const COLUMNS = [
  { id: 'Applied', title: 'New Applied', color: '#3b82f6' },
  { id: 'Screening', title: 'Screening', color: '#f59e0b' },
  { id: 'Interviewing', title: 'Interviewing', color: '#8b5cf6' },
  { id: 'Placed', title: 'Placed', color: '#10b981' }
];

export default function Pipeline() {
  const [user, setUser] = useState(null);
  const [otpStep, setOtpStep] = useState(1); // 1: Login, 2: OTP, 3: Dashboard
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [pendingOtp, setPendingOtp] = useState(null);
  const [otpExpiry, setOtpExpiry] = useState(0);
  const [otpTimerText, setOtpTimerText] = useState('5:00');
  const [isTimerExpiring, setIsTimerExpiring] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [filterRole, setFilterRole] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');
  const [loading, setLoading] = useState(true);
  const [dragOverColumn, setDragOverColumn] = useState(null);
  const [activeDragId, setActiveDragId] = useState(null);

  const otpRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  // Auth observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      if (usr) {
        setUser(usr);
        if (otpStep === 1) {
          initiateOTP(usr.email);
        }
      } else {
        setUser(null);
        setOtpStep(1);
        setPendingOtp(null);
      }
    });
    return () => unsubscribe();
  }, [otpStep]);

  // Firestore listener
  useEffect(() => {
    if (otpStep !== 3) return;
    setLoading(true);
    const unsubscribe = onSnapshot(collection(db, "candidates"), (snapshot) => {
      const list = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setCandidates(list);
      setLoading(false);
    }, (err) => {
      console.warn("Firestore access error, loading local data:", err);
      const local = JSON.parse(localStorage.getItem('eminence_candidates') || '[]');
      setCandidates(local);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [otpStep]);

  // OTP Timer countdown
  useEffect(() => {
    if (otpStep !== 2 || !otpExpiry) return;

    const timer = setInterval(() => {
      const remaining = Math.max(0, otpExpiry - Date.now());
      const mins = Math.floor(remaining / 60000);
      const secs = Math.floor((remaining % 60000) / 1000);
      setOtpTimerText(`${mins}:${secs.toString().padStart(2, '0')}`);
      setIsTimerExpiring(remaining <= 60000);

      if (remaining === 0) {
        clearInterval(timer);
        setError('Verification code has expired. Please click Resend.');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [otpStep, otpExpiry]);

  const initiateOTP = (userEmail) => {
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setPendingOtp(code);
    setOtpExpiry(Date.now() + 5 * 60 * 1000);
    setOtpStep(2);
    setError('');

    // Trigger EmailJS sending
    sendEmailJSOtp(userEmail, code);
  };

  const sendEmailJSOtp = (userEmail, code) => {
    if (typeof window !== 'undefined' && window.emailjs) {
      window.emailjs.init({ publicKey: 'Nzdtr9YOMTEyK2TH5' });
      window.emailjs.send('service_3tnson7', 'template_crc0amt', {
        to_email: userEmail,
        otp_code: code,
        expiry_mins: '5'
      }).then(() => {
        setInfo('Verification code sent to your registered email.');
      }).catch((err) => {
        console.error('EmailJS error:', err);
        setInfo('Recruitment security OTP printed in development console.');
        console.warn('Recruitment Dev OTP Code:', code);
      });
    } else {
      console.warn('Recruitment Dev OTP Code:', code);
      setInfo('Recruitment security OTP printed in development console.');
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both credentials.');
      return;
    }
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      setError('Invalid admin credentials. Please try again.');
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setError('Please enter your email above to reset password.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setInfo('Password reset instructions dispatched to your email.');
    } catch (err) {
      setError('Could not initiate password reset.');
    }
  };

  const handleOtpChange = (index, value) => {
    const cleaned = value.replace(/\D/g, '');
    if (!cleaned) {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = cleaned[0];
    setOtp(newOtp);

    // Auto-focus next
    if (index < 5 && cleaned) {
      otpRefs[index + 1].current.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      otpRefs[index - 1].current.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < pasteData.length; i++) {
      newOtp[i] = pasteData[i];
    }
    setOtp(newOtp);
    if (pasteData.length === 6) {
      verifyOtpCode(newOtp.join(''));
    } else if (otpRefs[pasteData.length]) {
      otpRefs[pasteData.length].current.focus();
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    verifyOtpCode(otp.join(''));
  };

  const verifyOtpCode = (code) => {
    if (code.length < 6) {
      setError('Enter all 6 digits.');
      return;
    }
    if (code === pendingOtp) {
      setOtpStep(3);
      setError('');
      setInfo('');
    } else {
      setError('Incorrect verification code.');
      setOtp(['', '', '', '', '', '']);
      otpRefs[0].current.focus();
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setOtpStep(1);
    } catch (err) {
      console.error(err);
    }
  };

  const handleResendOtp = () => {
    if (user) {
      initiateOTP(user.email);
    }
  };

  // Drag and Drop
  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
    setActiveDragId(id);
  };

  const handleDragOver = (e, columnId) => {
    e.preventDefault();
    setDragOverColumn(columnId);
  };

  const handleDrop = async (e, columnId) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain") || activeDragId;
    setDragOverColumn(null);
    setActiveDragId(null);
    if (!id) return;

    // Update status in Firestore or local state
    const candidate = candidates.find(c => c.id === id);
    if (!candidate) return;

    try {
      await updateDoc(doc(db, "candidates", id), { status: columnId });
      // updates automatically through firestore listener
    } catch (err) {
      // local fallback
      const updated = candidates.map(c => c.id === id ? { ...c, status: columnId } : c);
      setCandidates(updated);
      localStorage.setItem('eminence_candidates', JSON.stringify(updated));
    }
  };

  const updateCandidateStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, "candidates", id), { status });
    } catch (err) {
      const updated = candidates.map(c => c.id === id ? { ...c, status } : c);
      setCandidates(updated);
      localStorage.setItem('eminence_candidates', JSON.stringify(updated));
    }
  };

  const handleDeleteCandidate = async (id, name) => {
    if (!confirm(`Are you sure you want to remove ${name}?`)) return;
    try {
      await deleteDoc(doc(db, "candidates", id));
    } catch (err) {
      const updated = candidates.filter(c => c.id !== id);
      setCandidates(updated);
      localStorage.setItem('eminence_candidates', JSON.stringify(updated));
    }
  };

  const handleClearAll = async () => {
    if (!confirm("Are you sure you want to clear the entire hiring database? This action cannot be undone.")) return;
    try {
      const batch = writeBatch(db);
      const snapshot = await getDocs(collection(db, "candidates"));
      snapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
    } catch (err) {
      setCandidates([]);
      localStorage.removeItem('eminence_candidates');
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    const list = getFilteredCandidates();
    if (list.length === 0) {
      alert("No candidates to export.");
      return;
    }

    const headers = ['Candidate ID', 'Name', 'Email', 'Phone', 'Role', 'Experience', 'Status', 'Submitted At', 'Resume Summary'];
    const rows = list.map(c => [
      c.id || '',
      c.name || '',
      c.email || '',
      c.phone || '',
      c.role || '',
      c.experience || '',
      c.status || 'Applied',
      c.submittedAt || '',
      c.resume || ''
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Eminence_Sphere_Candidates_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getFilteredCandidates = () => {
    let filtered = [...candidates];
    if (filterRole !== 'ALL') {
      filtered = filtered.filter(c => c.role === filterRole);
    }
    if (searchQuery) {
      const s = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(c => 
        (c.name && c.name.toLowerCase().includes(s)) ||
        (c.email && c.email.toLowerCase().includes(s)) ||
        (c.phone && c.phone.toLowerCase().includes(s))
      );
    }

    filtered.sort((a, b) => {
      if (sortBy === 'date-desc') {
        return new Date(b.submittedAt || 0) - new Date(a.submittedAt || 0);
      } else if (sortBy === 'date-asc') {
        return new Date(a.submittedAt || 0) - new Date(b.submittedAt || 0);
      } else if (sortBy === 'name-asc') {
        return (a.name || '').localeCompare(b.name || '');
      } else if (sortBy === 'name-desc') {
        return (b.name || '').localeCompare(a.name || '');
      } else if (sortBy === 'experience-desc') {
        const getExpNum = (str) => {
          if (!str) return 0;
          const match = String(str).match(/\d+/);
          return match ? parseInt(match[0], 10) : 0;
        };
        return getExpNum(b.experience) - getExpNum(a.experience);
      }
      return 0;
    });

    return filtered;
  };

  // Metrics
  const totalCount = candidates.length;
  const supportCount = candidates.filter(c => c.role === 'Customer Support Representative' || c.role === 'Senior Customer Support Representative').length;
  const virtualCount = candidates.filter(c => c.role === 'Virtual Support Representative').length;
  const lastSubmissionText = candidates.length > 0 
    ? new Date(candidates.reduce((latest, c) => (new Date(c.submittedAt) > new Date(latest.submittedAt) ? c : latest), candidates[0]).submittedAt).toLocaleString()
    : 'N/A';

  const filteredList = getFilteredCandidates();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .admin-dashboard {
          padding-top: calc(var(--nav-height) + 3rem);
          padding-bottom: 6rem;
          min-height: 90vh;
        }

        .kanban-board {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
          align-items: start;
        }

        .kanban-column {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          min-height: 500px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1.25rem;
          transition: all 0.3s;
        }

        .kanban-column.drag-over {
          background: rgba(124, 58, 237, 0.05);
          border-color: var(--purple-primary);
        }

        .kanban-column-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--color-border);
        }

        .kanban-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          padding: 1.25rem;
          cursor: grab;
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
        }

        .kanban-card:hover {
          border-color: var(--gold-primary);
          transform: translateY(-2px);
          box-shadow: var(--shadow-card);
        }

        .kanban-card:active {
          cursor: grabbing;
        }

        .kanban-card.active-dragging {
          opacity: 0.4;
        }

        .card-meta-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: 0.75rem;
          border-top: 1px solid rgba(255, 255, 255, 0.03);
          padding-top: 0.5rem;
        }
      `}} />

      <main className="admin-dashboard">
        <div className="container">

          {/* ── STEP 1: CREDENTIALS ── */}
          {otpStep === 1 && (
            <div className="login-wrapper">
              <div className="login-card">
                <div className="login-steps">
                  <div className="step-dot active">1</div>
                  <div className="step-line"></div>
                  <div className="step-dot">2</div>
                </div>

                <h2>Admin Login</h2>
                <p>Sign in to view and manage candidate details collected by the AI recruitment chatbot.</p>

                {error && <div className="login-error">{error}</div>}
                {info && <div style={{ color: 'var(--gold-primary)', fontSize: '0.85rem', margin: '1rem 0', textAlign: 'center' }}>{info}</div>}

                <form onSubmit={handleSignIn}>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input 
                      className="form-input" 
                      type="email" 
                      placeholder="admin@eminencesphere.online" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: "2rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                      <label className="form-label" style={{ marginBottom: 0 }}>Password</label>
                      <button 
                        type="button" 
                        onClick={handlePasswordReset}
                        style={{ background: 'none', border: 'none', fontSize: "0.75rem", color: "var(--gold-light)", cursor: 'pointer', fontWeight: 500 }}
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="password-input-wrapper">
                      <input 
                        className="form-input" 
                        type={showPassword ? 'text' : 'password'} 
                        placeholder="••••••••" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button 
                        type="button" 
                        className="password-toggle-btn"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      </button>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Continue &rarr;</button>
                </form>
              </div>
            </div>
          )}

          {/* ── STEP 2: OTP ── */}
          {otpStep === 2 && (
            <div className="login-wrapper">
              <div className="login-card">
                <div className="login-steps">
                  <div className="step-dot done">&#10003;</div>
                  <div className="step-line done"></div>
                  <div className="step-dot active">2</div>
                </div>

                <h2>Verify Identity</h2>
                <p>A 6-digit code has been sent to your registered email.</p>

                {error && <div className="login-error">{error}</div>}
                {info && <div style={{ color: 'var(--gold-primary)', fontSize: '0.85rem', margin: '1rem 0', textAlign: 'center' }}>{info}</div>}

                <form onSubmit={handleVerifyOtp}>
                  <div className="otp-group" onPaste={handleOtpPaste}>
                    {otp.map((digit, idx) => (
                      <input 
                        key={idx}
                        ref={otpRefs[idx]}
                        className={`otp-box ${digit ? 'filled' : ''}`}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      />
                    ))}
                  </div>

                  <div className="otp-timer">Code expires in <span className={isTimerExpiring ? 'expiring' : ''}>{otpTimerText}</span></div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem' }}>Verify Code</button>
                </form>

                <div className="otp-footer">
                  <button onClick={handleResendOtp} style={{ background: 'none', border: 'none', color: 'var(--gold-light)', cursor: 'pointer', fontWeight: 500 }}>Resend code</button>
                  <button onClick={() => setOtpStep(1)} style={{ background: 'none', border: 'none', color: 'var(--gold-light)', cursor: 'pointer', fontWeight: 500 }}>&larr; Back</button>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 3: KANBAN DASHBOARD ── */}
          {otpStep === 3 && (
            <div id="dashboard-content">
              {/* Dashboard Header */}
              <div className="admin-header-flex">
                <div className="admin-title-group">
                  <h1>Recruitment Pipeline</h1>
                  <p>Hiring admin console. Drag and drop candidates between status columns to update their profile workflows.</p>
                </div>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
                  <button className="btn btn-outline" onClick={handleExportCSV} style={{ borderColor: "var(--gold-primary)", color: "var(--gold-primary)", padding: "0.5rem 1.25rem" }}>
                    Export CSV
                  </button>
                  <button className="btn btn-outline" onClick={handleClearAll} style={{ borderColor: "#e05c5c", color: "#e05c5c" }}>
                    Clear All
                  </button>
                  <button className="btn btn-primary" onClick={handleSignOut} style={{ padding: "0.5rem 1.25rem" }}>
                    Sign Out
                  </button>
                </div>
              </div>

              {/* Metrics Widgets */}
              <div className="admin-metrics-grid">
                <div className="metric-card">
                  <span className="metric-label">Total Applicants</span>
                  <span className="metric-number">{totalCount}</span>
                </div>
                <div className="metric-card">
                  <span className="metric-label">Support Representatives</span>
                  <span className="metric-number">{supportCount}</span>
                </div>
                <div className="metric-card">
                  <span className="metric-label">Virtual Support</span>
                  <span className="metric-number">{virtualCount}</span>
                </div>
                <div className="metric-card">
                  <span className="metric-label">Last Submission</span>
                  <span className="metric-number" style={{ fontSize: "1.1rem", wordBreak: "break-all", alignSelf: "flex-start", marginTop: "auto" }}>
                    {lastSubmissionText}
                  </span>
                </div>
              </div>

              {/* Filter Controls */}
              <div className="filter-bar">
                <div className="filter-group" style={{ flexWrap: "wrap", gap: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span className="filter-label">Filter by Position:</span>
                    <select className="filter-select" value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
                      <option value="ALL">All Roles</option>
                      {AVAILABLE_ROLES.map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span className="filter-label">Sort by:</span>
                    <select className="filter-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                      <option value="date-desc">Date (Newest)</option>
                      <option value="date-asc">Date (Oldest)</option>
                      <option value="name-asc">Name (A-Z)</option>
                      <option value="name-desc">Name (Z-A)</option>
                      <option value="experience-desc">Experience (High-Low)</option>
                    </select>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span className="filter-label">Search:</span>
                    <input 
                      type="text" 
                      className="filter-select" 
                      placeholder="Name, email, phone..." 
                      style={{ minWidth: "200px" }}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                  Secure Cloud Database (Firebase)
                </div>
              </div>

              {/* Kanban Columns */}
              {loading ? (
                <div className="dashboard-loader">
                  <div className="loader-spinner"></div>
                  <div className="loader-text">Syncing candidates database...</div>
                </div>
              ) : (
                <div className="kanban-board">
                  {COLUMNS.map(col => {
                    const columnCandidates = filteredList.filter(c => (c.status || 'Applied') === col.id);
                    return (
                      <div 
                        key={col.id} 
                        className={`kanban-column ${dragOverColumn === col.id ? 'drag-over' : ''}`}
                        onDragOver={(e) => handleDragOver(e, col.id)}
                        onDragLeave={() => setDragOverColumn(null)}
                        onDrop={(e) => handleDrop(e, col.id)}
                      >
                        <div className="kanban-column-header">
                          <h3 style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: col.color }}></span>
                            {col.title}
                          </h3>
                          <span style={{ fontSize: '0.8rem', padding: '0.1rem 0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                            {columnCandidates.length}
                          </span>
                        </div>

                        {columnCandidates.length === 0 ? (
                          <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                            No candidates here
                          </div>
                        ) : (
                          columnCandidates.map(c => (
                            <div 
                              key={c.id} 
                              className={`kanban-card ${activeDragId === c.id ? 'active-dragging' : ''}`}
                              draggable
                              onDragStart={(e) => handleDragStart(e, c.id)}
                              onDragEnd={() => setActiveDragId(null)}
                            >
                              <div style={{ fontWeight: '600', fontSize: '0.95rem', color: 'var(--text-primary)' }}>{c.name}</div>
                              <div style={{ fontSize: '0.8rem', color: 'var(--gold-light)', marginTop: '0.25rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {c.role}
                              </div>
                              
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                <span>📧 {c.email}</span>
                                <span>📞 {c.phone}</span>
                              </div>

                              {c.resume && (
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.01)', padding: '0.5rem', borderRadius: '4px', marginTop: '0.5rem', maxHeight: '50px', overflowY: 'auto' }}>
                                  {c.resume}
                                </div>
                              )}

                              <div className="card-meta-row">
                                <span>Exp: {c.experience}</span>
                                <button 
                                  onClick={() => handleDeleteCandidate(c.id, c.name)}
                                  style={{ background: 'none', border: 'none', color: '#e05c5c', cursor: 'pointer', fontSize: '0.75rem' }}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      <Script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js" strategy="lazyOnload" />
    </>
  );
}
