"use client";

import Script from "next/script";

export default function Pipeline() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .admin-dashboard {
          padding-top: calc(var(--nav-height) + 3rem);
          padding-bottom: 6rem;
          min-height: 80vh;
        }
        
        .admin-header-flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-bottom: 3rem;
          border-bottom: 1px solid var(--color-border);
          padding-bottom: 1.5rem;
        }

        .admin-title-group h1 {
          font-family: var(--font-heading);
          font-size: 2.5rem;
          font-weight: 700;
        }

        .admin-title-group p {
          color: var(--text-secondary);
          font-size: 0.9375rem;
          margin-top: 0.25rem;
        }

        /* Metric Cards */
        .admin-metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .metric-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .metric-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; width: 4px; height: 100%;
          background: var(--gold-gradient);
        }

        .metric-label {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .metric-number {
          font-family: var(--font-heading);
          font-size: 2.25rem;
          font-weight: 800;
          color: var(--gold-light);
          line-height: 1;
        }

        /* Filters */
        .filter-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 2rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--color-border);
          padding: 0.75rem 1.25rem;
          border-radius: var(--radius-sm);
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .filter-label {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .filter-select {
          background: var(--color-bg-2);
          border: 1px solid var(--color-border);
          color: var(--text-primary);
          padding: 0.4rem 1rem;
          border-radius: var(--radius-sm);
          outline: none;
          cursor: pointer;
          font-family: var(--font-body);
          font-size: 0.875rem;
        }

        .filter-select:focus {
          border-color: var(--gold-primary);
        }

        /* Candidate Grid */
        .candidate-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .candidate-row-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 1.75rem;
          transition: all var(--transition-base);
          display: grid;
          grid-template-columns: 2fr 2fr 1.5fr 3fr 1fr;
          align-items: center;
          gap: 1.5rem;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .candidate-row-card:hover {
          border-color: var(--color-border-hover);
          background: var(--color-surface-hover);
          box-shadow: 0 4px 20px rgba(201, 168, 76, 0.05);
        }

        .candidate-name-col {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .cand-name {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .cand-id {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-family: monospace;
          letter-spacing: 0.05em;
        }

        .candidate-contact-col {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          font-size: 0.875rem;
        }

        .cand-email {
          color: var(--gold-light);
          word-break: break-all;
        }

        .cand-email:hover {
          text-decoration: underline;
        }

        .cand-phone {
          color: var(--text-secondary);
        }

        .candidate-role-col {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .cand-role {
          font-weight: 600;
          font-size: 0.9375rem;
          color: var(--text-primary);
        }

        .cand-exp {
          font-size: 0.8125rem;
          color: var(--text-secondary);
        }

        .candidate-resume-col {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.5;
          max-height: 80px;
          overflow-y: auto;
          padding-right: 0.5rem;
        }

        .candidate-actions-col {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          align-items: flex-end;
        }

        .action-btn {
          padding: 0.4rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 600;
          text-align: center;
          cursor: pointer;
          width: 100%;
          border: 1px solid transparent;
          transition: all var(--transition-fast);
        }

        .action-btn-download {
          background: var(--gold-gradient);
          color: var(--navy-deep);
        }

        .action-btn-download:hover {
          opacity: 0.9;
        }

        .action-btn-delete {
          background: transparent;
          border-color: rgba(224, 92, 92, 0.4);
          color: #e05c5c;
        }

        .action-btn-delete:hover {
          background: rgba(224, 92, 92, 0.1);
          border-color: #e05c5c;
        }

        /* Status badges and dropdowns */
        .status-select {
          background: var(--color-bg-2);
          border: 1px solid var(--color-border);
          padding: 0.35rem 0.6rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 600;
          outline: none;
          cursor: pointer;
          transition: border-color var(--transition-fast);
          margin-top: 0.5rem;
          display: inline-block;
        }
        .status-select:focus {
          border-color: var(--gold-primary);
        }
        .status-applied {
          color: #3498db;
          border-color: rgba(52, 152, 219, 0.4);
          background: rgba(52, 152, 219, 0.1);
        }
        .status-screening {
          color: #f39c12;
          border-color: rgba(243, 156, 18, 0.4);
          background: rgba(243, 156, 18, 0.1);
        }
        .status-interviewing {
          color: #9b59b6;
          border-color: rgba(155, 89, 182, 0.4);
          background: rgba(155, 89, 182, 0.1);
        }
        .status-placed {
          color: #2ecc71;
          border-color: rgba(46, 204, 113, 0.4);
          background: rgba(46, 204, 113, 0.1);
        }
        .status-rejected {
          color: #e74c3c;
          border-color: rgba(231, 76, 60, 0.4);
          background: rgba(231, 76, 60, 0.1);
        }

        /* Empty state */
        .empty-state {
          text-align: center;
          padding: 5rem 2rem;
          background: var(--color-surface);
          border: 1px dashed var(--color-border);
          border-radius: var(--radius-lg);
        }

        .empty-state h3 {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .empty-state p {
          color: var(--text-secondary);
          font-size: 0.9375rem;
          margin-bottom: 1.5rem;
        }

        /* Responsive */
        @media (max-width: 992px) {
          .candidate-row-card {
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
          }
          
          .candidate-resume-col {
            grid-column: span 2;
          }

          .candidate-actions-col {
            grid-column: span 2;
            flex-direction: row;
          }

          .action-btn {
            width:auto;
            flex: 1;
          }
        }

        @media (max-width: 576px) {
          .candidate-row-card {
            grid-template-columns: 1fr;
          }
          
          .candidate-resume-col {
            grid-column: span 1;
          }

          .candidate-actions-col {
            grid-column: span 1;
          }
        }

        /* Admin Login Screen styles */
        .login-wrapper {
          min-height: 50vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 0;
        }

        .login-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          padding: 3rem 2.5rem;
          width: 100%;
          max-width: 440px;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: var(--shadow-card);
          position: relative;
          overflow: hidden;
          margin: 2rem auto;
        }

        .login-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: var(--gold-gradient);
        }

        .login-card h2 {
          font-family: var(--font-heading);
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          text-align: center;
        }

        .login-card p {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.5;
          text-align: center;
          margin-bottom: 2rem;
        }

        .login-card .form-group {
          margin-bottom: 1.5rem;
        }

        .login-card .form-label {
          display: block;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .login-card .form-input {
          width: 100%;
          background: var(--color-bg-2);
          border: 1px solid var(--color-border);
          color: var(--text-primary);
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          outline: none;
          font-family: var(--font-body);
          font-size: 0.9375rem;
          transition: border-color var(--transition-fast);
        }

        .login-card .form-input:focus {
          border-color: var(--gold-primary);
        }

        .login-card .btn-primary {
          width: 100%;
          padding: 0.75rem;
          font-weight: 600;
          margin-top: 1rem;
        }

        .login-error {
          color: #e05c5c;
          font-size: 0.875rem;
          margin-top: 1rem;
          text-align: center;
          background: rgba(224, 92, 92, 0.1);
          padding: 0.75rem;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(224, 92, 92, 0.2);
        }

        /* Password show/hide toggle */
        .password-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .password-input-wrapper .form-input {
          padding-right: 3rem;
        }

        .password-toggle-btn {
          position: absolute;
          right: 0.75rem;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.25rem;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color var(--transition-fast);
          line-height: 0;
        }

        .password-toggle-btn:hover {
          color: var(--gold-light);
        }

        .password-toggle-btn svg {
          width: 18px;
          height: 18px;
          stroke: currentColor;
          fill: none;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: opacity 0.2s;
        }

        /* ── 2-Step Auth: Step indicators ── */
        .login-steps {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          margin-bottom: 2rem;
        }

        .step-dot {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 2px solid var(--color-border);
          background: transparent;
          color: var(--text-muted);
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
          flex-shrink: 0;
        }

        .step-dot.active {
          border-color: var(--gold-primary);
          background: var(--gold-gradient);
          color: var(--navy-deep);
        }

        .step-dot.done {
          border-color: #4caf82;
          background: #4caf82;
          color: #fff;
        }

        .step-line {
          flex: 1;
          height: 2px;
          background: var(--color-border);
          margin: 0 0.5rem;
          transition: background 0.3s;
          max-width: 60px;
        }

        .step-line.done { background: #4caf82; }

        /* ── OTP Input boxes ── */
        .otp-group {
          display: flex;
          gap: 0.6rem;
          justify-content: center;
          margin: 1.75rem 0 0.5rem;
        }

        .otp-box {
          width: 48px;
          height: 56px;
          background: var(--color-bg-2);
          border: 2px solid var(--color-border);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-size: 1.5rem;
          font-family: var(--font-heading);
          font-weight: 700;
          text-align: center;
          outline: none;
          transition: border-color 0.2s, transform 0.15s;
          caret-color: transparent;
        }

        .otp-box:focus {
          border-color: var(--gold-primary);
          transform: translateY(-2px);
        }

        .otp-box.filled {
          border-color: var(--gold-light);
        }

        .otp-box.shake {
          animation: otp-shake 0.4s ease;
        }

        @keyframes otp-shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-5px); }
          40%       { transform: translateX(5px); }
          60%       { transform: translateX(-4px); }
          80%       { transform: translateX(4px); }
        }

        /* OTP timer */
        .otp-timer {
          text-align: center;
          font-size: 0.8125rem;
          color: var(--text-muted);
          margin-top: 0.25rem;
        }

        .otp-timer span {
          color: var(--gold-light);
          font-weight: 600;
          font-family: var(--font-heading);
        }

        .otp-timer span.expiring { color: #e05c5c; }

        /* OTP footer links */
        .otp-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1.25rem;
          font-size: 0.8125rem;
        }

        .otp-footer a {
          color: var(--gold-light);
          text-decoration: none;
          font-weight: 500;
        }

        .otp-footer a:hover { text-decoration: underline; }

        /* Step slide animations */
        .login-step {
          transition: opacity 0.3s, transform 0.3s;
        }

        .login-step.slide-out {
          opacity: 0;
          transform: translateX(-24px);
          pointer-events: none;
        }

        .login-step.slide-in {
          animation: slideIn 0.35s ease forwards;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* ── Dashboard loading spinner ── */
        .dashboard-loader {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
          gap: 1.25rem;
        }

        .loader-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid var(--color-border);
          border-top-color: var(--gold-primary);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .loader-text {
          color: var(--text-muted);
          font-size: 0.875rem;
          letter-spacing: 0.03em;
        }

        /* Skeleton cards */
        .skeleton-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          margin-bottom: 1rem;
        }

        .skeleton-line {
          height: 14px;
          background: linear-gradient(90deg, var(--color-bg-2) 25%, rgba(201,168,76,0.08) 50%, var(--color-bg-2) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 6px;
          margin-bottom: 0.75rem;
        }

        .skeleton-line:nth-child(1) { width: 45%; }
        .skeleton-line:nth-child(2) { width: 70%; }
        .skeleton-line:nth-child(3) { width: 55%; }

        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      ` }} />

      <main className="admin-dashboard">
        <div className="container">

          {/* Login Container */}
          <div className="login-wrapper" id="login-container" style={{ display: "block" }}>
            <div className="login-card">

              {/* Step indicators */}
              <div className="login-steps">
                <div className="step-dot active" id="step-dot-1">1</div>
                <div className="step-line" id="step-line-1"></div>
                <div className="step-dot" id="step-dot-2">2</div>
              </div>

              {/* ── STEP 1: Credentials ── */}
              <div id="login-step-1" className="login-step">
                <h2>Admin Login</h2>
                <p>Sign in to view and manage candidate details collected by the AI recruitment chatbot.</p>
                <div className="form-group">
                  <label className="form-label" htmlFor="login-email">Email Address</label>
                  <input className="form-input" type="email" id="login-email" placeholder="admin@eminencesphere.online" />
                </div>
                <div className="form-group" style={{ marginBottom: "2rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <label className="form-label" htmlFor="login-password" style={{ marginBottom: 0 }}>Password</label>
                    <a href="#" id="forgot-password-link" style={{ fontSize: "0.75rem", color: "var(--gold-light)", textDecoration: "none", fontWeight: 500 }}>Forgot Password?</a>
                  </div>
                  <div className="password-input-wrapper">
                    <input className="form-input" type="password" id="login-password" placeholder="••••••••" />
                    <button type="button" className="password-toggle-btn" id="password-toggle" aria-label="Show or hide password">
                      <svg id="eye-icon" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      <svg id="eye-off-icon" viewBox="0 0 24 24" style={{ display: "none" }}><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    </button>
                  </div>
                </div>
                <button className="btn btn-primary" id="login-btn">Continue &rarr;</button>
                <div className="login-error" id="login-error" style={{ display: "none" }}></div>
              </div>

              {/* ── STEP 2: OTP Verification ── */}
              <div id="login-step-2" className="login-step" style={{ display: "none" }}>
                <h2>Verify Identity</h2>
                <p>A 6-digit code has been sent to<br/><strong id="otp-email-display" style={{ color: "var(--gold-light)" }}></strong></p>

                {/* 6 OTP digit boxes */}
                <div className="otp-group" id="otp-group">
                  <input className="otp-box" id="otp-0" type="text" inputMode="numeric" maxLength="1" autoComplete="one-time-code" />
                  <input className="otp-box" id="otp-1" type="text" inputMode="numeric" maxLength="1" />
                  <input className="otp-box" id="otp-2" type="text" inputMode="numeric" maxLength="1" />
                  <input className="otp-box" id="otp-3" type="text" inputMode="numeric" maxLength="1" />
                  <input className="otp-box" id="otp-4" type="text" inputMode="numeric" maxLength="1" />
                  <input className="otp-box" id="otp-5" type="text" inputMode="numeric" maxLength="1" />
                </div>

                {/* Countdown */}
                <div className="otp-timer">Code expires in <span id="otp-countdown">5:00</span></div>

                <button className="btn btn-primary" id="otp-verify-btn" style={{ marginTop: "1.5rem" }}>Verify Code</button>
                <div className="login-error" id="otp-error" style={{ display: "none" }}></div>

                <div className="otp-footer">
                  <a href="#" id="otp-resend">Resend code</a>
                  <a href="#" id="otp-back">&larr; Back</a>
                </div>
              </div>

            </div>
          </div>

          {/* Dashboard Content (hidden by default) */}
          <div id="dashboard-content" style={{ display: "none" }}>
            {/* Dashboard Header */}
            <div className="admin-header-flex">
              <div className="admin-title-group">
                <h1>Recruitment Pipeline</h1>
                <p>Hiring admin console to view and manage candidate details collected by the AI recruitment chatbot.</p>
              </div>
              <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
                <button className="btn btn-outline" id="export-csv-btn" style={{ borderColor: "var(--gold-primary)", color: "var(--gold-primary)", padding: "0.5rem 1.25rem" }}>
                  Export CSV
                </button>
                <button className="btn btn-outline" id="clear-all-btn" style={{ borderColor: "#e05c5c", color: "#e05c5c" }}>
                  Clear All Candidates
                </button>
                <button className="btn btn-primary" id="sign-out-btn" style={{ padding: "0.5rem 1.25rem" }}>
                  Sign Out
                </button>
              </div>
            </div>

            {/* Metrics Widgets */}
            <div className="admin-metrics-grid">
              <div className="metric-card">
                <span className="metric-label">Total Applicants</span>
                <span className="metric-number" id="metric-total">0</span>
              </div>
              <div className="metric-card">
                <span className="metric-label">Support Representatives</span>
                <span className="metric-number" id="metric-support">0</span>
              </div>
              <div className="metric-card">
                <span className="metric-label">Virtual Support</span>
                <span className="metric-number" id="metric-virtual">0</span>
              </div>
              <div className="metric-card">
                <span className="metric-label">Last Submission</span>
                <span className="metric-number" id="metric-last-date" style={{ fontSize: "1.1rem", wordBreak: "break-all", alignSelf: "flex-start", marginTop: "auto" }}>N/A</span>
              </div>
            </div>

            {/* Filter Controls */}
            <div className="filter-bar">
              <div className="filter-group" style={{ flexWrap: "wrap", gap: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span className="filter-label">Filter by Position:</span>
                  <select className="filter-select" id="role-filter" defaultValue="ALL">
                    <option value="ALL">All Roles</option>
                    <option value="Customer Support Representative">Customer Support Rep</option>
                    <option value="Senior Customer Support Representative">Senior Customer Support Rep</option>
                    <option value="Virtual Support Representative">Virtual Support Rep</option>
                    <option value="Tech Support Specialist">Tech Support Specialist</option>
                    <option value="Operations Team Lead">Operations Team Lead</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span className="filter-label">Sort by:</span>
                  <select className="filter-select" id="sort-filter" defaultValue="date-desc">
                    <option value="date-desc">Date (Newest)</option>
                    <option value="date-asc">Date (Oldest)</option>
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="experience-desc">Experience (High-Low)</option>
                  </select>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span className="filter-label">Search:</span>
                  <input type="text" id="search-input" className="filter-select" placeholder="Name, email, phone..." style={{ minWidth: "200px" }} />
                </div>
              </div>
              <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                Secure Cloud Database (Firebase)
              </div>
            </div>

            {/* Candidate Profiles List */}
            <div className="candidate-list" id="candidates-container">
              {/* Loading skeleton (shown while fetching) */}
              <div id="dashboard-loader" className="dashboard-loader">
                <div className="loader-spinner"></div>
                <div className="loader-text">Loading candidates from cloud...</div>
                <div className="skeleton-card"><div className="skeleton-line"></div><div className="skeleton-line"></div><div className="skeleton-line"></div></div>
                <div className="skeleton-card"><div className="skeleton-line"></div><div className="skeleton-line"></div><div className="skeleton-line"></div></div>
                <div className="skeleton-card"><div className="skeleton-line"></div><div className="skeleton-line"></div><div className="skeleton-line"></div></div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js" strategy="lazyOnload" />
      <Script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-auth-compat.js" strategy="lazyOnload" />
      <Script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore-compat.js" strategy="lazyOnload" />
      <Script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js" strategy="lazyOnload" />
      <Script src="/js/firebase-config.js" strategy="lazyOnload" />
      <Script src="/js/pipeline.js" strategy="lazyOnload" />
    </>
  );
}
