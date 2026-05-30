"use client";
import React, { useState, useEffect, useRef } from 'react';
import { db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import '../css/chatbot.css'; // Make sure the component explicitly imports its styles

const AVAILABLE_ROLES = [
  'Customer Support Representative',
  'Senior Customer Support Representative',
  'Virtual Support Representative',
  'Tech Support Specialist',
  'Operations Team Lead',
  'Other'
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState(0);
  const [candidateData, setCandidateData] = useState({
    name: '', email: '', phone: '', role: '', experience: '', resume: ''
  });

  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initial greeting
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerGreeting();
    }, 600);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const triggerGreeting = () => {
    botReply("Hello! I am Eminence AI, your virtual career assistant. I can guide you through creating and submitting your candidate profile for our current recruitment pipeline. To begin, what is your full name?", () => {
      setStep(1);
    });
  };

  const botReply = (text, callback, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages(prev => [...prev, { id: Date.now(), text, sender: 'bot', time: timeString }]);
      if (callback) callback();
    }, delay);
  };

  const handleUserSubmit = (e, forceText = null) => {
    if (e) e.preventDefault();
    const text = forceText || inputValue.trim();
    if (!text && step !== 4) return; // Allow empty input only if overriding

    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { id: Date.now(), text, sender: 'user', time: timeString }]);
    setInputValue('');

    processConversation(text);
  };

  const processConversation = (userInput) => {
    switch (step) {
      case 1:
        setCandidateData(prev => ({ ...prev, name: userInput }));
        botReply(`Pleasure to meet you, ${userInput}! Could you please provide your email address so our recruitment team can contact you?`, () => setStep(2));
        break;
      case 2:
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInput)) {
          setCandidateData(prev => ({ ...prev, email: userInput }));
          botReply("Thank you. What is the best phone number to reach you at?", () => setStep(3));
        } else {
          botReply("That email format doesn't look quite right. Please enter a valid email address (e.g., name@domain.com) to continue.", () => setStep(2));
        }
        break;
      case 3:
        setCandidateData(prev => ({ ...prev, phone: userInput }));
        botReply("Got it. Which position at Eminence Sphere are you interested in? You can select one from the options below or type your desired role.", () => setStep(4));
        break;
      case 4:
        setCandidateData(prev => ({ ...prev, role: userInput }));
        botReply(`Excellent choice. How many years of relevant professional experience do you have in ${userInput}?`, () => setStep(5));
        break;
      case 5:
        setCandidateData(prev => ({ ...prev, experience: userInput }));
        botReply("Almost finished! Please paste a link to your resume or portfolio, or provide a brief summary of your key skills and achievements.", () => setStep(6));
        break;
      case 6:
        setCandidateData(prev => ({ ...prev, resume: userInput }));
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          const finalData = { ...candidateData, resume: userInput };
          saveCandidate(finalData);
          setMessages(prev => [...prev, { id: Date.now(), isSummary: true, data: finalData, sender: 'system' }]);
          setStep(7); // Done
        }, 1200);
        break;
      default:
        break;
    }
  };

  const saveCandidate = async (candidate) => {
    const id = 'ES-' + Date.now();
    const payload = { ...candidate, id, submittedAt: new Date().toISOString() };
    
    try {
      await setDoc(doc(db, "candidates", id), payload);
      console.log("Candidate saved to Firestore:", payload);

      // Trigger serverless notification alert (Email)
      fetch('/api/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      .then(res => res.json())
      .then(data => console.log("Notification status:", data))
      .catch(err => console.error("Notification trigger failed:", err));

    } catch (e) {
      console.error("Firestore error, saving locally:", e);
      let localCands = JSON.parse(localStorage.getItem('eminence_candidates') || '[]');
      localCands.push(payload);
      localStorage.setItem('eminence_candidates', JSON.stringify(localCands));
    }
  };

  const downloadData = (data) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `Candidate_${data.name.replace(/\s+/g, '_')}_Profile.json`;
    a.click();
  };

  const restartChat = () => {
    setStep(0);
    setCandidateData({ name: '', email: '', phone: '', role: '', experience: '', resume: '' });
    setMessages([]);
    triggerGreeting();
  };

  return (
    <div className="es-chatbot-container">
      {/* Launcher */}
      <button 
        className={`es-chatbot-launcher ${isOpen ? 'open' : ''}`}
        aria-label="Open AI Assistant"
        onClick={() => {
          setIsOpen(!isOpen);
          setHasUnread(false);
        }}
      >
        <svg viewBox="0 0 24 24">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        {hasUnread && !isOpen && <span className="es-chatbot-badge"></span>}
      </button>

      {/* Drawer */}
      <div className={`es-chatbot-window ${isOpen ? 'open' : ''}`}>
        <div className="es-chatbot-header">
          <div className="es-chatbot-brand">
            <div className="es-chatbot-avatar">ES</div>
            <div className="es-chatbot-info">
              <span className="es-chatbot-title">Eminence Assistant</span>
              <span className="es-chatbot-status">Online</span>
            </div>
          </div>
          <button className="es-chatbot-close" onClick={() => setIsOpen(false)} aria-label="Close Chat">
            <svg viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="es-chatbot-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`es-message es-message-${msg.sender}`}>
              {msg.isSummary ? (
                <div className="es-message-text" style={{ width: '100%' }}>
                  <div className="es-summary-title">Profile Compiled successfully</div>
                  {Object.entries(msg.data).map(([key, value]) => (
                    <div className="es-summary-row" key={key}>
                      <span className="es-summary-label" style={{textTransform: 'capitalize'}}>{key}:</span>
                      <span className="es-summary-value" title={value}>{value}</span>
                    </div>
                  ))}
                  <div className="es-summary-actions">
                    <button className="es-summary-btn es-summary-btn-download" onClick={() => downloadData(msg.data)}>
                      Download PDF/JSON
                    </button>
                    <button className="es-summary-btn es-summary-btn-restart" onClick={restartChat}>
                      New Application
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="es-message-text">{msg.text}</div>
                  {msg.time && <span className="es-message-time">{msg.time}</span>}
                </>
              )}
            </div>
          ))}

          {step === 4 && !isTyping && (
            <div className="es-chatbot-chips">
              {AVAILABLE_ROLES.map(role => (
                <button key={role} className="es-chip" onClick={() => handleUserSubmit(null, role)}>
                  {role}
                </button>
              ))}
            </div>
          )}

          {isTyping && (
            <div className="es-message es-message-bot">
              <div className="es-typing-indicator">
                <span className="es-typing-dot"></span>
                <span className="es-typing-dot"></span>
                <span className="es-typing-dot"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="es-chatbot-input-panel" onSubmit={handleUserSubmit}>
          <input 
            type="text" 
            className="es-chatbot-input" 
            placeholder={step >= 7 ? "Application complete" : "Type your response..."}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={step >= 7}
          />
          <button type="submit" className="es-chatbot-send" disabled={!inputValue.trim() || step >= 7}>
            <svg viewBox="0 0 24 24">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
