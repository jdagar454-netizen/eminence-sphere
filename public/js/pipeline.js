// ════════════════════════════════════════════════
// EMAILJS CONFIG — fill these in after setup
// ════════════════════════════════════════════════
const EMAILJS_PUBLIC_KEY  = 'Nzdtr9YOMTEyK2TH5';
const EMAILJS_SERVICE_ID  = 'service_3tnson7';
const EMAILJS_TEMPLATE_ID = 'template_crc0amt';
// ════════════════════════════════════════════════

// ── Dashboard Controller ──
(function() {
  'use strict';

  // ── 2-Step auth state ──
  let otpVerified   = false;   // true once OTP passed
  let pendingOTP    = null;    // current 6-digit code (in-memory only)
  let otpExpiry     = 0;       // timestamp when OTP expires
  let otpTimerID    = null;    // interval id for countdown
  let currentUser   = null;    // Firebase user after step 1

  // ── DOM refs ──
  const loginContainer  = document.getElementById('login-container');
  const dashboardContent= document.getElementById('dashboard-content');
  const loginEmail      = document.getElementById('login-email');
  const loginPassword   = document.getElementById('login-password');
  const loginBtn        = document.getElementById('login-btn');
  const loginError      = document.getElementById('login-error');
  const signOutBtn      = document.getElementById('sign-out-btn');
  const step1El         = document.getElementById('login-step-1');
  const step2El         = document.getElementById('login-step-2');
  const otpEmailDisplay = document.getElementById('otp-email-display');
  const otpVerifyBtn    = document.getElementById('otp-verify-btn');
  const otpErrorEl      = document.getElementById('otp-error');
  const otpCountdown    = document.getElementById('otp-countdown');
  const otpBoxes        = Array.from(document.querySelectorAll('.otp-box'));
  const stepDot1        = document.getElementById('step-dot-1');
  const stepDot2        = document.getElementById('step-dot-2');
  const stepLine1       = document.getElementById('step-line-1');

  // Dashboard elements
  const container  = document.getElementById('candidates-container');
  const filterSelect = document.getElementById('role-filter');
  const clearBtn   = document.getElementById('clear-all-btn');
  const mTotal     = document.getElementById('metric-total');
  const mSupport   = document.getElementById('metric-support');
  const mVirtual   = document.getElementById('metric-virtual');
  const mLastDate  = document.getElementById('metric-last-date');

  let currentCandidates = [];

  // ── HTML escape helper ──
  function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g,
      tag => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[tag] || tag));
  }

  // ── Auth state observer ──
  if (typeof firebase !== 'undefined') {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        currentUser = user;
        if (otpVerified) {
          showDashboard();
        } else {
          // Kick off OTP step
          initiateOTPStep(user);
        }
      } else {
        currentUser = null;
        otpVerified = false;
        pendingOTP  = null;
        clearOTPTimer();
        showStep1();
      }
    });
  } else {
    console.error('Firebase SDK not loaded. Falling back to local mode.');
    loginContainer.style.display = 'none';
    dashboardContent.style.display = 'block';
    loadPipelineLocal();
  }

  // ══════════════════════════════════
  // STEP 1 — credentials
  // ══════════════════════════════════
  if (loginBtn) {
    loginBtn.addEventListener('click', handleSignIn);
  }
  if (loginPassword) {
    loginPassword.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSignIn();
    });
  }

  function handleSignIn() {
    const email    = loginEmail.value.trim();
    const password = loginPassword.value;
    if (!email || !password) {
      showLoginStatus('Please enter both email and password.', true);
      return;
    }
    loginBtn.disabled = true;
    loginBtn.textContent = 'Verifying...';
    loginError.style.display = 'none';

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        loginBtn.disabled = false;
        loginBtn.innerHTML = 'Continue &rarr;';
        // onAuthStateChanged will fire → initiateOTPStep()
      })
      .catch((error) => {
        loginBtn.disabled = false;
        loginBtn.innerHTML = 'Continue &rarr;';
        let msg = 'Invalid email or password.';
        if (error.code === 'auth/invalid-email')       msg = 'Please enter a valid email address.';
        if (error.code === 'auth/user-not-found')      msg = 'No administrator found with this email.';
        if (error.code === 'auth/wrong-password')      msg = 'Incorrect password. Please try again.';
        if (error.code === 'auth/invalid-credential')  msg = 'Invalid credentials. Please try again.';
        showLoginStatus(`${msg}`, true);
      });
  }

  // Forgot password
  const forgotPasswordLink = document.getElementById('forgot-password-link');
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', (e) => {
      e.preventDefault();
      const email = loginEmail.value.trim();
      if (!email) { showLoginStatus('Enter your email above first.', true); return; }
      forgotPasswordLink.style.pointerEvents = 'none';
      forgotPasswordLink.textContent = 'Sending...';
      firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
          showLoginStatus('Reset email sent! Check your inbox.', false);
          forgotPasswordLink.style.pointerEvents = 'auto';
          forgotPasswordLink.textContent = 'Forgot Password?';
        })
        .catch((err) => {
          showLoginStatus(`Could not send reset email: ${err.code}`, true);
          forgotPasswordLink.style.pointerEvents = 'auto';
          forgotPasswordLink.textContent = 'Forgot Password?';
        });
    });
  }

  // Password visibility toggle
  const passwordToggleBtn = document.getElementById('password-toggle');
  const eyeIcon    = document.getElementById('eye-icon');
  const eyeOffIcon = document.getElementById('eye-off-icon');
  if (passwordToggleBtn) {
    passwordToggleBtn.addEventListener('click', () => {
      const hidden = loginPassword.type === 'password';
      loginPassword.type = hidden ? 'text' : 'password';
      eyeIcon.style.display    = hidden ? 'none'  : 'block';
      eyeOffIcon.style.display = hidden ? 'block' : 'none';
      loginPassword.focus();
    });
  }

  function showLoginStatus(msg, isError = true) {
    loginError.textContent = msg;
    loginError.style.display = 'block';
    loginError.style.color      = isError ? '#e05c5c' : '#c9a84c';
    loginError.style.background = isError ? 'rgba(224,92,92,0.1)'   : 'rgba(201,168,76,0.1)';
    loginError.style.borderColor= isError ? 'rgba(224,92,92,0.2)'   : 'rgba(201,168,76,0.2)';
  }

  function showStep1() {
    if (loginContainer) loginContainer.style.display = 'block';
    if (dashboardContent) dashboardContent.style.display = 'none';
    if (step1El) step1El.style.display = 'block';
    if (step2El) step2El.style.display = 'none';
    if (stepDot1) stepDot1.className = 'step-dot active';
    if (stepDot2) stepDot2.className = 'step-dot';
    if (stepLine1) stepLine1.className = 'step-line';
  }

  // ══════════════════════════════════
  // STEP 2 — OTP verification
  // ══════════════════════════════════
  function initiateOTPStep(user) {
    // Generate 6-digit OTP
    pendingOTP = String(Math.floor(100000 + Math.random() * 900000));
    otpExpiry  = Date.now() + 5 * 60 * 1000; // 5 minutes

    // Update step UI
    step1El.classList.add('slide-out');
    setTimeout(() => {
      step1El.style.display = 'none';
      step1El.classList.remove('slide-out');
      step2El.style.display = 'block';
      step2El.classList.add('slide-in');
      if (otpBoxes[0]) otpBoxes[0].focus();
    }, 300);

    stepDot1.className = 'step-dot done';
    stepDot1.innerHTML = '&#10003;';
    stepDot2.className = 'step-dot active';
    stepLine1.className = 'step-line done';

    // Show masked email
    const parts  = user.email.split('@');
    const masked = parts[0].substring(0, 3) + '***@' + parts[1];
    otpEmailDisplay.textContent = masked;

    // Start countdown
    startOTPTimer();

    // Send email
    sendOTPEmail(user.email, pendingOTP);
  }

  function sendOTPEmail(toEmail, code) {
    if (EMAILJS_PUBLIC_KEY === 'YOUR_EMAILJS_PUBLIC_KEY') {
      // EmailJS not configured — show code in console (dev mode only)
      console.warn('⚠️ EmailJS not configured. OTP code (dev only):', code);
      showOTPStatus('EmailJS not set up — OTP printed in browser console (F12).', false);
      return;
    }
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      to_email: toEmail,
      otp_code: code,
      expiry_mins: '5'
    }).then(() => {
      showOTPStatus('Code sent! Check your email inbox.', false);
    }).catch((err) => {
      console.error('EmailJS error:', err);
      showOTPStatus('Could not send email. OTP is in browser console (F12).', false);
      console.warn('OTP fallback (dev):', code);
    });
  }

  function startOTPTimer() {
    clearOTPTimer();
    otpTimerID = setInterval(() => {
      const remaining = Math.max(0, otpExpiry - Date.now());
      const mins = Math.floor(remaining / 60000);
      const secs = Math.floor((remaining % 60000) / 1000);
      otpCountdown.textContent = `${mins}:${secs.toString().padStart(2,'0')}`;
      if (remaining <= 60000) otpCountdown.className = 'expiring';
      else otpCountdown.className = '';
      if (remaining === 0) {
        clearOTPTimer();
        showOTPStatus('Code expired. Click Resend to get a new one.', true);
        otpVerifyBtn.disabled = true;
      }
    }, 1000);
  }

  function clearOTPTimer() {
    if (otpTimerID) { clearInterval(otpTimerID); otpTimerID = null; }
  }

  // OTP box keyboard UX — auto-advance, backspace, paste
  otpBoxes.forEach((box, i) => {
    box.addEventListener('input', (e) => {
      const val = e.target.value.replace(/\D/g, '');
      box.value = val ? val[0] : '';
      box.classList.toggle('filled', !!box.value);
      if (val && i < 5) otpBoxes[i + 1].focus();
      if (getOTPValue().length === 6) verifyOTP();
    });
    box.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !box.value && i > 0) {
        otpBoxes[i - 1].value = '';
        otpBoxes[i - 1].classList.remove('filled');
        otpBoxes[i - 1].focus();
      }
      if (e.key === 'ArrowLeft'  && i > 0) otpBoxes[i - 1].focus();
      if (e.key === 'ArrowRight' && i < 5) otpBoxes[i + 1].focus();
    });
    // Handle paste into first box
    box.addEventListener('paste', (e) => {
      e.preventDefault();
      const text = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g,'').slice(0,6);
      text.split('').forEach((ch, idx) => {
        if (otpBoxes[idx]) {
          otpBoxes[idx].value = ch;
          otpBoxes[idx].classList.add('filled');
        }
      });
      if (text.length === 6) verifyOTP();
      else if (otpBoxes[text.length]) otpBoxes[text.length].focus();
    });
  });

  if (otpVerifyBtn) {
    otpVerifyBtn.addEventListener('click', verifyOTP);
  }

  function getOTPValue() {
    return otpBoxes.map(b => b.value).join('');
  }

  function verifyOTP() {
    const entered = getOTPValue();
    if (entered.length < 6) {
      showOTPStatus('Please enter all 6 digits.', true);
      return;
    }
    if (Date.now() > otpExpiry) {
      showOTPStatus('Code expired. Click Resend to get a new one.', true);
      return;
    }
    if (entered === pendingOTP) {
      // ✅ OTP correct
      otpVerified = true;
      pendingOTP  = null;
      clearOTPTimer();
      showDashboard();
    } else {
      // ❌ Wrong code — shake boxes
      otpBoxes.forEach(b => {
        b.classList.remove('shake');
        void b.offsetWidth; // reflow to restart animation
        b.classList.add('shake');
      });
      showOTPStatus('Incorrect code. Please try again.', true);
      otpBoxes.forEach(b => { b.value=''; b.classList.remove('filled','shake'); });
      otpBoxes[0].focus();
    }
  }

  function showOTPStatus(msg, isError) {
    otpErrorEl.textContent = msg;
    otpErrorEl.style.display = 'block';
    otpErrorEl.style.color      = isError ? '#e05c5c' : '#c9a84c';
    otpErrorEl.style.background = isError ? 'rgba(224,92,92,0.1)'   : 'rgba(201,168,76,0.1)';
    otpErrorEl.style.borderColor= isError ? 'rgba(224,92,92,0.2)'   : 'rgba(201,168,76,0.2)';
  }

  // Resend OTP
  const otpResend = document.getElementById('otp-resend');
  if (otpResend) {
    otpResend.addEventListener('click', (e) => {
      e.preventDefault();
      if (!currentUser) return;
      otpBoxes.forEach(b => { b.value=''; b.classList.remove('filled'); });
      otpErrorEl.style.display = 'none';
      otpVerifyBtn.disabled = false;
      pendingOTP = String(Math.floor(100000 + Math.random() * 900000));
      otpExpiry  = Date.now() + 5 * 60 * 1000;
      startOTPTimer();
      sendOTPEmail(currentUser.email, pendingOTP);
      otpBoxes[0].focus();
    });
  }

  // Back to step 1
  const otpBack = document.getElementById('otp-back');
  if (otpBack) {
    otpBack.addEventListener('click', (e) => {
      e.preventDefault();
      clearOTPTimer();
      pendingOTP = null;
      firebase.auth().signOut(); // triggers onAuthStateChanged → showStep1()
    });
  }

  function showDashboard() {
    loginContainer.style.display = 'none';
    dashboardContent.style.display = 'block';
    loginEmail.value = '';
    loginPassword.value = '';
    loginError.style.display = 'none';
    fetchCandidatesFromFirestore();
  }

  // Handle sign out
  if (signOutBtn) {
    signOutBtn.addEventListener('click', () => {
      otpVerified = false;
      firebase.auth().signOut()
        .then(() => console.log('Signed out successfully.'))
        .catch(err => console.error('Error signing out:', err));
    });
  }

  // Fetch candidates from Firestore
  function fetchCandidatesFromFirestore() {
    const loader = document.getElementById('dashboard-loader');
    if (loader) loader.style.display = 'flex';
    const db = firebase.firestore();
    db.collection("candidates").orderBy("submittedAt", "desc")
      .onSnapshot((querySnapshot) => {
        const candidates = [];
        querySnapshot.forEach((doc) => {
          candidates.push(doc.data());
        });
        currentCandidates = candidates;
        if (loader) loader.style.display = 'none';
        renderPipeline(candidates);
      }, (error) => {
        console.error("Error listening to candidates collection:", error);
        if (loader) loader.style.display = 'none';
        loadPipelineLocal();
      });
  }

  // Local storage fallback loader
  function loadPipelineLocal() {
    currentCandidates = JSON.parse(localStorage.getItem('eminence_candidates')) || [];
    renderPipeline(currentCandidates);
  }

  function renderPipeline(candidates) {
    if (!filterSelect || !mTotal || !mSupport || !mVirtual || !mLastDate || !container) return;
    const filterRole = filterSelect.value;

    // 1. Calculate Metrics
    mTotal.textContent = candidates.length;
    mSupport.textContent = candidates.filter(c => c.role === 'Customer Support Representative' || c.role === 'Senior Customer Support Representative').length;
    mVirtual.textContent = candidates.filter(c => c.role === 'Virtual Support Representative').length;

    if (candidates.length > 0) {
      const sorted = [...candidates].sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
      const latestDate = new Date(sorted[0].submittedAt);
      mLastDate.textContent = latestDate.toLocaleDateString() + ' ' + latestDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    } else {
      mLastDate.textContent = 'N/A';
    }

    // 2. Filter list
    const filtered = filterRole === 'ALL' 
      ? candidates 
      : candidates.filter(c => c.role === filterRole);

    // 3. Render
    container.innerHTML = '';

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <h3>No Candidates Registered</h3>
          <p>Applications submitted via the chatbot widget will appear here automatically.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(c => {
      const card = document.createElement('div');
      card.className = 'candidate-row-card';
      card.innerHTML = `
        <div class="candidate-name-col">
          <span class="cand-name">${escapeHTML(c.name)}</span>
          <span class="cand-id">ID: ${escapeHTML(c.id)}</span>
        </div>
        
        <div class="candidate-contact-col">
          <a href="mailto:${escapeHTML(c.email)}" class="cand-email">${escapeHTML(c.email)}</a>
          <span class="cand-phone">${escapeHTML(c.phone)}</span>
        </div>

        <div class="candidate-role-col">
          <span class="cand-role">${escapeHTML(c.role)}</span>
          <span class="cand-exp">${escapeHTML(c.experience)} exp</span>
        </div>

        <div class="candidate-resume-col">
          ${escapeHTML(c.resume)}
        </div>

        <div class="candidate-actions-col">
          <button class="action-btn action-btn-download" data-id="${c.id}">Download JSON</button>
          <button class="action-btn action-btn-delete" data-id="${c.id}">Delete</button>
        </div>
      `;

      // Add button click listeners
      card.querySelector('.action-btn-download').addEventListener('click', () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(c, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `Candidate_${c.name.replace(/\s+/g, '_')}_Profile.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
      });

      card.querySelector('.action-btn-delete').addEventListener('click', () => {
        if (confirm(`Are you sure you want to remove ${c.name}?`)) {
          deleteCandidate(c.id);
        }
      });

      container.appendChild(card);
    });
  }

  function deleteCandidate(id) {
    if (typeof firebase !== 'undefined' && firebase.apps.length > 0 && firebase.auth().currentUser) {
      firebase.firestore().collection("candidates").doc(id).delete()
        .then(() => console.log("Candidate deleted from Firestore."))
        .catch(err => console.error("Error deleting document:", err));
    } else {
      let candidates = JSON.parse(localStorage.getItem('eminence_candidates')) || [];
      candidates = candidates.filter(c => c.id !== id);
      localStorage.setItem('eminence_candidates', JSON.stringify(candidates));
      loadPipelineLocal();
    }
  }

  // Clear all handler
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm("Are you sure you want to clear the entire hiring database? This action cannot be undone.")) {
        if (typeof firebase !== 'undefined' && firebase.apps.length > 0 && firebase.auth().currentUser) {
          const db = firebase.firestore();
          db.collection("candidates").get().then((querySnapshot) => {
            const batch = db.batch();
            querySnapshot.forEach((doc) => {
              batch.delete(doc.ref);
            });
            batch.commit()
              .then(() => console.log("Hiring database successfully cleared in Firestore."))
              .catch(err => console.error("Error committing delete batch:", err));
          });
        } else {
          localStorage.removeItem('eminence_candidates');
          loadPipelineLocal();
        }
      }
    });
  }

  // Filter select handler
  if (filterSelect) {
    filterSelect.addEventListener('change', () => renderPipeline(currentCandidates));
  }

})();
