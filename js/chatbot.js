// ================================================================
// EMINENCE SPHERE — AI Recruitment Chatbot JS
// ================================================================

(function () {
  'use strict';

  // ── Conversational Flow State ──
  let chatState = {
    step: 0,
    data: {
      name: '',
      email: '',
      phone: '',
      role: '',
      experience: '',
      resume: ''
    }
  };

  // ── Predefined Roles for Choice Chips ──
  const AVAILABLE_ROLES = [
    'Customer Support Representative',
    'Senior Customer Support Representative',
    'Virtual Support Representative',
    'Tech Support Specialist',
    'Operations Team Lead',
    'Other'
  ];

  // ── DOM References ──
  let chatbotContainer;
  let launcherBtn;
  let chatWindow;
  let messagesContainer;
  let chatInput;
  let sendBtn;
  let notificationBadge;

  // ── Initialize Chatbot UI ──
  function initChatbot() {
    // 1. Create container
    chatbotContainer = document.createElement('div');
    chatbotContainer.className = 'es-chatbot-container';
    chatbotContainer.id = 'es-chatbot-container';

    // 2. HTML Markup for Launcher and Chat Drawer
    chatbotContainer.innerHTML = `
      <!-- Launcher Button -->
      <button class="es-chatbot-launcher" id="es-chatbot-launcher" aria-label="Open AI Assistant">
        <svg viewBox="0 0 24 24">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <span class="es-chatbot-badge" id="es-chatbot-badge"></span>
      </button>

      <!-- Chat Window Drawer -->
      <div class="es-chatbot-window" id="es-chatbot-window">
        <!-- Header -->
        <div class="es-chatbot-header">
          <div class="es-chatbot-brand">
            <div class="es-chatbot-avatar">ES</div>
            <div class="es-chatbot-info">
              <span class="es-chatbot-title">Eminence Assistant</span>
              <span class="es-chatbot-status">Online</span>
            </div>
          </div>
          <button class="es-chatbot-close" id="es-chatbot-close" aria-label="Close Chat">
            <svg viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Messages Area -->
        <div class="es-chatbot-messages" id="es-chatbot-messages"></div>

        <!-- Input Panel -->
        <div class="es-chatbot-input-panel">
          <input type="text" class="es-chatbot-input" id="es-chatbot-input" placeholder="Type your response..." autocomplete="off" />
          <button class="es-chatbot-send" id="es-chatbot-send" disabled aria-label="Send Message">
            <svg viewBox="0 0 24 24">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(chatbotContainer);

    // 3. Cache DOM Elements
    launcherBtn = document.getElementById('es-chatbot-launcher');
    chatWindow = document.getElementById('es-chatbot-window');
    messagesContainer = document.getElementById('es-chatbot-messages');
    chatInput = document.getElementById('es-chatbot-input');
    sendBtn = document.getElementById('es-chatbot-send');
    notificationBadge = document.getElementById('es-chatbot-badge');

    // 4. Attach Event Listeners
    launcherBtn.addEventListener('click', toggleChat);
    document.getElementById('es-chatbot-close').addEventListener('click', closeChat);
    chatInput.addEventListener('input', handleInputChange);
    chatInput.addEventListener('keypress', handleKeyPress);
    sendBtn.addEventListener('click', handleUserSubmit);

    // 5. Trigger Initial Greeting
    setTimeout(triggerGreeting, 600);

    // 6. Pre-populate Antigravity candidate in localStorage for demo
    prepopulateAntigravity();

    // 7. Load Firebase SDKs dynamically in background
    loadFirebaseSDKs();
  }

  // ── Open / Close Handlers ──
  function toggleChat() {
    const isOpen = chatWindow.classList.toggle('open');
    launcherBtn.classList.toggle('open', isOpen);
    
    if (isOpen) {
      // Clear notification badge
      if (notificationBadge) {
        notificationBadge.style.display = 'none';
      }
      chatInput.focus();
    }
  }

  function closeChat() {
    chatWindow.classList.remove('open');
    launcherBtn.classList.remove('open');
  }

  // ── Input Handling ──
  function handleInputChange() {
    sendBtn.disabled = chatInput.value.trim() === '';
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter' && chatInput.value.trim() !== '') {
      handleUserSubmit();
    }
  }

  // ── Render Message Bubbles ──
  function addMessage(text, sender = 'bot') {
    const msgDiv = document.createElement('div');
    msgDiv.className = `es-message es-message-${sender}`;
    
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (sender === 'system') {
      msgDiv.innerHTML = `
        <div class="es-message-text">${text}</div>
      `;
    } else {
      msgDiv.innerHTML = `
        <div class="es-message-text">${escapeHTML(text)}</div>
        <span class="es-message-time">${timeString}</span>
      `;
    }

    messagesContainer.appendChild(msgDiv);
    scrollToBottom();
    return msgDiv;
  }

  // Helper to escape HTML tags
  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  // Scroll to bottom of message container
  function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // ── Typing Indicator ──
  let typingIndicatorDiv = null;

  function showTypingIndicator() {
    if (typingIndicatorDiv) return;

    typingIndicatorDiv = document.createElement('div');
    typingIndicatorDiv.className = 'es-message es-message-bot';
    typingIndicatorDiv.innerHTML = `
      <div class="es-typing-indicator">
        <span class="es-typing-dot"></span>
        <span class="es-typing-dot"></span>
        <span class="es-typing-dot"></span>
      </div>
    `;
    messagesContainer.appendChild(typingIndicatorDiv);
    scrollToBottom();
  }

  function hideTypingIndicator() {
    if (typingIndicatorDiv) {
      typingIndicatorDiv.remove();
      typingIndicatorDiv = null;
    }
  }

  // Simulate Bot Thinking/Typing Response
  function botReply(text, callback, delay = 1000) {
    showTypingIndicator();
    setTimeout(() => {
      hideTypingIndicator();
      addMessage(text, 'bot');
      if (callback) callback();
    }, delay);
  }

  // ── Conversational Flow Steps ──

  function triggerGreeting() {
    botReply(
      "Hello! I am Eminence AI, your virtual career assistant. I can guide you through creating and submitting your candidate profile for our current recruitment pipeline. To begin, what is your full name?",
      () => { chatState.step = 1; }
    );
  }

  function handleUserSubmit() {
    const inputVal = chatInput.value.trim();
    if (!inputVal) return;

    // Clear input
    chatInput.value = '';
    sendBtn.disabled = true;

    // Render User Message
    addMessage(inputVal, 'user');

    // Proceed in State Machine
    processConversation(inputVal);
  }

  function processConversation(userInput) {
    switch (chatState.step) {
      case 1: // Name entered -> Ask for Email
        chatState.data.name = userInput;
        botReply(
          `Pleasure to meet you, ${userInput}! Could you please provide your email address so our recruitment team can contact you?`,
          () => { chatState.step = 2; }
        );
        break;

      case 2: // Email entered -> Validate -> Ask for Phone
        if (validateEmail(userInput)) {
          chatState.data.email = userInput;
          botReply(
            "Thank you. What is the best phone number to reach you at?",
            () => { chatState.step = 3; }
          );
        } else {
          botReply(
            "That email format doesn't look quite right. Please enter a valid email address (e.g., name@domain.com) to continue.",
            () => { chatState.step = 2; }
          );
        }
        break;

      case 3: // Phone entered -> Ask for Role (render chips)
        chatState.data.phone = userInput;
        botReply(
          "Got it. Which position at Eminence Sphere are you interested in? You can select one from the options below or type your desired role.",
          () => {
            renderRoleChips();
            chatState.step = 4;
          }
        );
        break;

      case 4: // Role entered -> Ask for Experience
        chatState.data.role = userInput;
        // Clean up chips if user typed custom input
        removeRoleChips();
        botReply(
          `Excellent choice. How many years of relevant professional experience do you have in ${userInput}?`,
          () => { chatState.step = 5; }
        );
        break;

      case 5: // Experience entered -> Ask for Resume/Skills
        chatState.data.experience = userInput;
        botReply(
          "Almost finished! Please paste a link to your resume or portfolio, or provide a brief summary of your key skills and achievements.",
          () => { chatState.step = 6; }
        );
        break;

      case 6: // Resume/Skills entered -> Save -> Show Summary card
        chatState.data.resume = userInput;
        showTypingIndicator();
        setTimeout(() => {
          hideTypingIndicator();
          saveCandidate(chatState.data);
          renderSummaryCard(chatState.data);
        }, 1200);
        break;
    }
  }

  // Email validation regex helper
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // ── Render Choice Chips ──
  function renderRoleChips() {
    removeRoleChips(); // Ensure no duplicates

    const chipsContainer = document.createElement('div');
    chipsContainer.className = 'es-chatbot-chips';
    chipsContainer.id = 'es-chatbot-chips';

    AVAILABLE_ROLES.forEach(role => {
      const chip = document.createElement('button');
      chip.className = 'es-chip';
      chip.textContent = role;
      chip.addEventListener('click', () => {
        // Send role directly as user message
        addMessage(role, 'user');
        removeRoleChips();
        processConversation(role);
      });
      chipsContainer.appendChild(chip);
    });

    messagesContainer.appendChild(chipsContainer);
    scrollToBottom();
  }

  function removeRoleChips() {
    const existingChips = document.getElementById('es-chatbot-chips');
    if (existingChips) {
      existingChips.remove();
    }
  }

  // ── Firebase Firestore & LocalStorage Candidate Saving ──
  function saveCandidate(candidate) {
    candidate.id = 'ES-' + Date.now();
    candidate.submittedAt = new Date().toISOString();

    console.log("Saving candidate details:", candidate);

    if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
      const db = firebase.firestore();
      db.collection("candidates").doc(candidate.id).set(candidate)
        .then(() => {
          console.log("Candidate application successfully stored in Firestore!");
        })
        .catch((error) => {
          console.error("Error writing application to Firestore:", error);
          fallbackSaveLocal(candidate);
        });
    } else {
      console.warn("Firebase SDK not initialized. Falling back to local storage.");
      fallbackSaveLocal(candidate);
    }
  }

  function fallbackSaveLocal(candidate) {
    try {
      let candidates = JSON.parse(localStorage.getItem('eminence_candidates')) || [];
      candidates.push(candidate);
      localStorage.setItem('eminence_candidates', JSON.stringify(candidates));
    } catch (e) {
      console.error("Failed to save candidate to localStorage:", e);
    }
  }

  // ── Summary Card and Download Actions ──
  function renderSummaryCard(data) {
    // Disable text input since application is complete
    chatInput.disabled = true;
    chatInput.placeholder = "Application complete";

    const summaryHTML = `
      <div class="es-summary-title">Profile Compiled successfully</div>
      <div class="es-summary-row">
        <span class="es-summary-label">Name:</span>
        <span class="es-summary-value" title="${escapeHTML(data.name)}">${escapeHTML(data.name)}</span>
      </div>
      <div class="es-summary-row">
        <span class="es-summary-label">Email:</span>
        <span class="es-summary-value" title="${escapeHTML(data.email)}">${escapeHTML(data.email)}</span>
      </div>
      <div class="es-summary-row">
        <span class="es-summary-label">Phone:</span>
        <span class="es-summary-value" title="${escapeHTML(data.phone)}">${escapeHTML(data.phone)}</span>
      </div>
      <div class="es-summary-row">
        <span class="es-summary-label">Role:</span>
        <span class="es-summary-value" title="${escapeHTML(data.role)}">${escapeHTML(data.role)}</span>
      </div>
      <div class="es-summary-row">
        <span class="es-summary-label">Experience:</span>
        <span class="es-summary-value" title="${escapeHTML(data.experience)}">${escapeHTML(data.experience)}</span>
      </div>
      <div class="es-summary-row">
        <span class="es-summary-label">Resume/Skills:</span>
        <span class="es-summary-value" title="${escapeHTML(data.resume)}">${escapeHTML(data.resume)}</span>
      </div>
      <div class="es-summary-actions">
        <button class="es-summary-btn es-summary-btn-download" id="es-btn-download">
          Download PDF/JSON
        </button>
        <button class="es-summary-btn es-summary-btn-restart" id="es-btn-restart">
          New Application
        </button>
      </div>
    `;

    addMessage(summaryHTML, 'system');

    // Add event listeners to the dynamically created buttons
    document.getElementById('es-btn-download').addEventListener('click', () => {
      downloadCandidateData(data);
    });

    document.getElementById('es-btn-restart').addEventListener('click', restartChat);
  }

  // Download Profile Helper
  function downloadCandidateData(data) {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Candidate_${data.name.replace(/\s+/g, '_')}_Profile.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  // Restart Conversational Flow
  function restartChat() {
    // Reset state
    chatState = {
      step: 0,
      data: { name: '', email: '', phone: '', role: '', experience: '', resume: '' }
    };
    
    // Clear message container
    messagesContainer.innerHTML = '';
    
    // Enable input field
    chatInput.disabled = false;
    chatInput.placeholder = "Type your response...";
    handleInputChange();

    // Greet again
    triggerGreeting();
  }

  // ── Pre-populate Antigravity candidate ──
  function prepopulateAntigravity() {
    try {
      let candidates = JSON.parse(localStorage.getItem('eminence_candidates')) || [];
      const hasAntigravity = candidates.some(c => c.email === 'antigravity@eminencesphere.online');
      if (!hasAntigravity) {
        const dummy = {
          id: 'ES-ANTIGRAVITY',
          name: 'Antigravity AI',
          email: 'antigravity@eminencesphere.online',
          phone: '+1 (555) 019-2831',
          role: 'Virtual Support Representative',
          experience: '5 years (cognitive agent capabilities)',
          resume: 'Advanced Agentic Coding AI developed by the Google DeepMind team. Specialized in customer support automation, voice process optimization, and system orchestration.',
          submittedAt: new Date().toISOString()
        };
        candidates.push(dummy);
        localStorage.setItem('eminence_candidates', JSON.stringify(candidates));
        console.log("Registered Antigravity AI locally.");

        // Also write to firestore if ready
        if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
          firebase.firestore().collection("candidates").doc(dummy.id).set(dummy)
            .then(() => console.log("Registered Antigravity AI in Firestore."))
            .catch(err => console.error("Firestore pre-populate error:", err));
        }
      }
    } catch (e) {
      console.error("Failed to pre-populate Antigravity candidate:", e);
    }
  }

  // ── Dynamic Firebase Loader ──
  function loadFirebaseSDKs() {
    if (typeof firebase !== 'undefined') {
      return;
    }
    const appScript = document.createElement('script');
    appScript.src = "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js";
    appScript.onload = () => {
      const configScript = document.createElement('script');
      configScript.src = "js/firebase-config.js?v=2";
      configScript.onload = () => {
        const dbScript = document.createElement('script');
        dbScript.src = "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore-compat.js";
        dbScript.onload = () => {
          console.log("Firebase Chatbot SDKs successfully loaded.");
          // Attempt Firestore sync for Antigravity demo after load
          if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
            firebase.firestore().collection("candidates").doc('ES-ANTIGRAVITY').set({
              id: 'ES-ANTIGRAVITY',
              name: 'Antigravity AI',
              email: 'antigravity@eminencesphere.online',
              phone: '+1 (555) 019-2831',
              role: 'Virtual Support Representative',
              experience: '5 years (cognitive agent capabilities)',
              resume: 'Advanced Agentic Coding AI developed by the Google DeepMind team. Specialized in customer support automation, voice process optimization, and system orchestration.',
              submittedAt: new Date().toISOString()
            }).catch(() => {});
          }
        };
        document.head.appendChild(dbScript);
      };
      document.head.appendChild(configScript);
    };
    document.head.appendChild(appScript);
  }

  // ── Auto-Initialize on DOM Load ──
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
  } else {
    initChatbot();
  }

})();
