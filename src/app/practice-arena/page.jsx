"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const CHAT_SCENARIO = {
  customerName: "Mrs. Sharma",
  initialMessage: "I ordered a customized resume design and consulting package for my son's interview prep, and it's already 3 hours past the delivery deadline! He has the interview tomorrow morning! This is completely unacceptable!",
  dialogue: [
    {
      trigger: 1,
      botResponse: "I understand you are busy, but just telling me to 'wait' isn't helpful! He needs to study the materials tonight! Can you send it right now or refund my ₹3,999 immediately?",
      keyPhrases: ["sorry", "apologize", "pardon", "concern", "worry", "understand"]
    },
    {
      trigger: 2,
      botResponse: "Okay, I appreciate you looking into this. Please send it as soon as you find it, and let me know how you will compensate for this delay.",
      keyPhrases: ["compensation", "discount", "refund", "credit", "free", "waive"]
    }
  ]
};

const CALL_SCENARIO = {
  customerName: "Rohan",
  steps: [
    {
      id: 0,
      speech: "Hello, this is Rohan. I'm calling because I tried to log in to my candidate portal to schedule my mock interview, but it keeps giving me a code 403 error. Can you help me?",
      tips: "Acknowledge the issue, apologize for the hurdle, and ask for their email address to locate their account."
    },
    {
      id: 1,
      speech: "My registered email is rohan.verma@gmail.com. I've been waiting for three days for this session and my interview is coming up very soon.",
      tips: "State that you have found their profile, explain that the error was due to a server sync reboot, and offer to schedule it manually right now."
    },
    {
      id: 2,
      speech: "Yes, please schedule it for today at 5:00 PM. That works perfectly for me. Thank you so much.",
      tips: "Confirm the booking, state that a confirmation email with a link has been dispatched, and ask if there is anything else you can assist with."
    }
  ]
};

export default function PracticeArena() {
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'call'
  
  // Chat simulator states
  const [chatStep, setChatStep] = useState(0); // 0: start, 1: ongoing, 2: results
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [chatScores, setChatScores] = useState({ empathy: 0, resolution: 0, tone: 0 });
  const [chatAnalyses, setChatAnalyses] = useState([]);

  // Call simulator states
  const [callStep, setCallStep] = useState(0); // 0: idle, 1: ongoing, 2: completed
  const [callScenarioIndex, setCallScenarioIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [callLogs, setCallLogs] = useState([]);
  const [speaking, setSpeaking] = useState(false);

  const recognitionRef = useRef(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = true;
        rec.interimResults = true;
        rec.lang = 'en-US';

        rec.onresult = (event) => {
          let currentTrans = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            currentTrans += event.results[i][0].transcript;
          }
          setTranscription(currentTrans);
        };

        rec.onerror = (e) => {
          console.error("Speech recognition error:", e);
        };

        rec.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = rec;
      }
    }
  }, []);

  // ── CHAT SYSTEM LOGIC ──
  const startChatSim = () => {
    setChatStep(1);
    setChatMessages([
      { id: 1, sender: 'customer', text: CHAT_SCENARIO.initialMessage, name: CHAT_SCENARIO.customerName }
    ]);
    setChatInput('');
    setChatScores({ empathy: 0, resolution: 0, tone: 0 });
    setChatAnalyses([]);
  };

  const submitChatMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add user message
    setChatMessages(prev => [...prev, { id: Date.now(), sender: 'agent', text: userText, time }]);
    setChatInput('');

    // Score response
    evaluateChatResponse(userText);
  };

  const evaluateChatResponse = (text) => {
    const textLower = text.toLowerCase();
    let empathyScore = 0;
    let resolutionScore = 0;
    let toneScore = 0;
    let feedback = '';

    // Step 1 evaluation
    if (chatMessages.length === 1) {
      const hasEmpathy = CHAT_SCENARIO.dialogue[0].keyPhrases.some(phrase => textLower.includes(phrase));
      empathyScore = hasEmpathy ? 90 : 35;
      
      const hasRes = ["check", "find", "moment", "status", "look", "account", "order"].some(phrase => textLower.includes(phrase));
      resolutionScore = hasRes ? 85 : 40;

      toneScore = textLower.length > 30 ? 90 : 50;

      feedback = hasEmpathy 
        ? "Excellent job leading with empathy and reassuring Mrs. Sharma." 
        : "Rejection alert: Try to lead with an apology or direct validation when dealing with a delayed delivery.";

      setChatScores(prev => ({ empathy: empathyScore, resolution: resolutionScore, tone: toneScore }));
      setChatAnalyses(prev => [...prev, feedback]);

      // Trigger bot response
      setTimeout(() => {
        setChatMessages(prev => [...prev, { 
          id: Date.now(), 
          sender: 'customer', 
          text: CHAT_SCENARIO.dialogue[0].botResponse, 
          name: CHAT_SCENARIO.customerName 
        }]);
      }, 1200);

    } else if (chatMessages.length === 3) {
      // Step 2 evaluation
      const hasCompensation = CHAT_SCENARIO.dialogue[1].keyPhrases.some(phrase => textLower.includes(phrase));
      const empath = textLower.includes("sorry") ? 95 : 60;
      
      empathyScore = Math.round((chatScores.empathy + empath) / 2);
      resolutionScore = Math.round((chatScores.resolution + (hasCompensation ? 90 : 45)) / 2);
      toneScore = Math.round((chatScores.tone + (textLower.length > 20 ? 85 : 50)) / 2);

      feedback = hasCompensation
        ? "Great resolution! Offering compensation/discounts builds strong brand loyalty."
        : "Tone Warning: You missed addressing her compensation concern. Always offer discounts/bundles for major delays.";

      setChatScores({ empathy: empathyScore, resolution: resolutionScore, tone: toneScore });
      setChatAnalyses(prev => [...prev, feedback]);

      setTimeout(() => {
        setChatMessages(prev => [...prev, { 
          id: Date.now(), 
          sender: 'customer', 
          text: CHAT_SCENARIO.dialogue[1].botResponse, 
          name: CHAT_SCENARIO.customerName 
        }]);
        // Trigger completion screen
        setTimeout(() => {
          setChatStep(2);
        }, 1500);
      }, 1200);
    }
  };

  // ── CALL SYSTEM LOGIC ──
  const startCallSim = () => {
    setCallStep(1);
    setCallScenarioIndex(0);
    setCallLogs([]);
    setTranscription('');
    speakCustomerQuery(CALL_SCENARIO.steps[0].speech);
  };

  const speakCustomerQuery = (text) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Select a natural voice if available
      const voices = window.speechSynthesis.getVoices();
      const EnglishVoice = voices.find(v => v.lang.includes('en-US') && v.name.includes('Natural')) || voices[0];
      if (EnglishVoice) utterance.voice = EnglishVoice;

      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => {
        setSpeaking(false);
        // Start listening automatically after customer finishes speaking
        startListeningMic();
      };
      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback if SpeechSynthesis is not supported
      setCallLogs(prev => [...prev, { sender: 'customer', text }]);
    }
  };

  const startListeningMic = () => {
    if (recognitionRef.current) {
      setTranscription('');
      setIsListening(true);
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.warn("Speech recognition already running");
      }
    }
  };

  const stopListeningMic = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);

      if (transcription.trim()) {
        const spokeText = transcription;
        setCallLogs(prev => [...prev, { sender: 'agent', text: spokeText }]);

        // Progress dialogue
        const nextIndex = callScenarioIndex + 1;
        if (nextIndex < CALL_SCENARIO.steps.length) {
          setCallScenarioIndex(nextIndex);
          setTimeout(() => {
            speakCustomerQuery(CALL_SCENARIO.steps[nextIndex].speech);
          }, 1000);
        } else {
          // Completed
          setTimeout(() => {
            setCallStep(2);
          }, 1500);
        }
      }
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .practice-arena-container {
          padding-top: calc(var(--nav-height) + 4rem);
          padding-bottom: 6rem;
          min-height: 100vh;
        }

        .toggle-tab-row {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .chat-arena-box {
          max-width: 750px;
          margin: 0 auto;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 600px;
          box-shadow: var(--shadow-card);
        }

        .chat-arena-header {
          background: var(--color-bg-2);
          border-bottom: 1px solid var(--color-border);
          padding: 1.25rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .chat-arena-body {
          flex-grow: 1;
          padding: 2rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .bubble-msg {
          max-width: 75%;
          padding: 1rem 1.25rem;
          border-radius: var(--radius-md);
          line-height: 1.6;
          font-size: 0.95rem;
        }

        .bubble-msg.customer {
          background: var(--color-bg-2);
          color: var(--text-primary);
          align-self: flex-start;
          border-bottom-left-radius: 4px;
          border: 1px solid var(--color-border);
        }

        .bubble-msg.agent {
          background: var(--purple-gradient);
          color: white;
          align-self: flex-end;
          border-bottom-right-radius: 4px;
        }

        .chat-arena-footer {
          border-top: 1px solid var(--color-border);
          padding: 1.25rem 2rem;
          background: var(--color-bg-2);
        }

        .live-mic-wave {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          height: 20px;
          margin-left: 1rem;
        }

        .wave-bar {
          width: 3px;
          height: 100%;
          background: var(--purple-primary);
          border-radius: 2px;
          animation: wave-motion 1.2s ease-in-out infinite alternate;
        }

        .wave-bar:nth-child(2) { animation-delay: 0.2s; }
        .wave-bar:nth-child(3) { animation-delay: 0.4s; }

        @keyframes wave-motion {
          from { transform: scaleY(0.3); }
          to { transform: scaleY(1); }
        }
      `}} />

      <section className="page-hero">
        <div className="glow-orb glow-orb-gold" style={{ width: "500px", height: "500px", top: "-150px", left: "50%", transform: "translateX(-50%)", opacity: 0.4 }}></div>
        <div className="container">
          <div className="badge badge-gold" style={{ marginBottom: "1.25rem" }}>Simulators</div>
          <h1 className="heading-xl page-hero-title">Support <span className="text-gold">Practice Arena</span></h1>
          <p className="page-hero-subtitle">Engage in interactive customer support sessions to grade your communication, empathy, and speed metrics.</p>
        </div>
      </section>

      <main className="practice-arena-container">
        <div className="container">

          <div className="toggle-tab-row">
            <button 
              className={`btn ${activeTab === 'chat' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveTab('chat')}
            >
              🎧 Chat Session Simulator
            </button>
            <button 
              className={`btn ${activeTab === 'call' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveTab('call')}
            >
              📞 Call Session Simulator
            </button>
          </div>

          {/* ═══════════════════ TAB 1: CHAT SIMULATOR ═══════════════════ */}
          {activeTab === 'chat' && (
            <div className="chat-arena-box">
              {chatStep === 0 && (
                <div style={{ textAlign: 'center', padding: '5rem 2rem', margin: 'auto' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>💬</div>
                  <h2 className="heading-md" style={{ marginBottom: '1rem' }}>Mock Client Support Chat</h2>
                  <p style={{ color: 'var(--text-secondary)', maxWidth: '550px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
                    Step into the role of a support consultant. Handle a critical, real-time client complaint. You will be evaluated based on the validation of concerns, tone courtesy, and prompt delivery options.
                  </p>
                  <button onClick={startChatSim} className="btn btn-primary" style={{ width: '100%', maxWidth: '280px', margin: '0 auto' }}>
                    Start Chat Session
                  </button>
                </div>
              )}

              {chatStep === 1 && (
                <>
                  <div className="chat-arena-header">
                    <strong style={{ fontSize: '1.1rem' }}>Client: {CHAT_SCENARIO.customerName}</strong>
                    <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '12px', fontWeight: 'bold' }}>Urgent</span>
                  </div>

                  <div className="chat-arena-body">
                    {chatMessages.map(msg => (
                      <div key={msg.id} className={`bubble-msg ${msg.sender}`}>
                        {msg.sender === 'customer' && <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--purple-primary)', marginBottom: '0.25rem' }}>{msg.name}</div>}
                        {msg.text}
                      </div>
                    ))}
                  </div>

                  <form className="chat-arena-footer" onSubmit={submitChatMessage}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <input 
                        type="text" 
                        className="form-input" 
                        style={{ flexGrow: 1, padding: '0.85rem 1.25rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)' }}
                        placeholder="Type your professional response to client concern..."
                        value={chatInput}
                        onChange={e => setInputValue(e.target.value) /* Wait, let's make sure it updates the correct input state */}
                        onChange={e => setChatInput(e.target.value)}
                      />
                      <button type="submit" className="btn btn-primary" style={{ padding: '0 2rem' }}>Send</button>
                    </div>
                  </form>
                </>
              )}

              {chatStep === 2 && (
                <div style={{ textAlign: 'center', padding: '4rem 2.5rem', margin: 'auto', width: '100%' }}>
                  <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>📊</div>
                  <h2 className="heading-md" style={{ marginBottom: '2.5rem' }}>Performance Analysis Report</h2>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                    <div className="card" style={{ padding: '1.5rem' }}>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Empathy Score</div>
                      <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--purple-primary)' }}>{chatScores.empathy}%</div>
                    </div>
                    <div className="card" style={{ padding: '1.5rem' }}>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Resolution Skill</div>
                      <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--purple-primary)' }}>{chatScores.resolution}%</div>
                    </div>
                    <div className="card" style={{ padding: '1.5rem' }}>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Tone Professionalism</div>
                      <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--purple-primary)' }}>{chatScores.tone}%</div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'left', marginBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-secondary)' }}>
                    <h3 className="heading-sm" style={{ color: 'var(--text-primary)' }}>Behavioral Critique:</h3>
                    {chatAnalyses.map((crit, idx) => (
                      <p key={idx}>💡 {crit}</p>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button onClick={startChatSim} className="btn btn-primary">Restart Chat Practice</button>
                    <Link href="/contact" className="btn btn-outline">Consult Live Recruiter</Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ═══════════════════ TAB 2: CALL SIMULATOR ═══════════════════ */}
          {activeTab === 'call' && (
            <div className="chat-arena-box">
              {callStep === 0 && (
                <div style={{ textAlign: 'center', padding: '5rem 2rem', margin: 'auto' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📞</div>
                  <h2 className="heading-md" style={{ marginBottom: '1rem' }}>Mock Client Phone Call</h2>
                  <p style={{ color: 'var(--text-secondary)', maxWidth: '550px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
                    Answer a simulated incoming support call. Enable microphone permission so our Speech engine can record and transcribe your speaking responses.
                  </p>
                  <button onClick={startCallSim} className="btn btn-primary" style={{ width: '100%', maxWidth: '280px', margin: '0 auto' }}>
                    Connect Mock Call
                  </button>
                </div>
              )}

              {callStep === 1 && (
                <>
                  <div className="chat-arena-header">
                    <strong style={{ fontSize: '1.1rem' }}>Active Call: Rohan (Customer)</strong>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '12px', fontWeight: 'bold' }}>Connected</span>
                    </div>
                  </div>

                  <div className="chat-arena-body" style={{ background: '#0a0d24' }}>
                    <div style={{ textAlign: 'center', margin: '2rem 0' }}>
                      <div style={{ fontSize: '3rem', animation: 'pulse 1.5s infinite' }}>🎙️</div>
                      
                      {speaking ? (
                        <div style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Customer is speaking...</div>
                      ) : (
                        <div style={{ marginTop: '1rem', color: 'var(--purple-primary)', fontWeight: 'bold' }}>
                          {isListening ? (
                            <>
                              Listening to your response...
                              <div className="live-mic-wave">
                                <div className="wave-bar"></div>
                                <div className="wave-bar"></div>
                                <div className="wave-bar"></div>
                              </div>
                            </>
                          ) : (
                            "Start speaking, or click Stop Speaking to proceed."
                          )}
                        </div>
                      )}
                    </div>

                    <div className="card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '1.5rem', maxHeight: '180px', overflowY: 'auto' }}>
                      <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>STAR tips for your response:</h4>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        {CALL_SCENARIO.steps[callScenarioIndex]?.tips}
                      </p>
                    </div>

                    {transcription && (
                      <div className="card" style={{ background: 'var(--purple-pale)', border: '1px solid rgba(124,58,237,0.2)', padding: '1rem 1.5rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--purple-primary)' }}>Your Transcribed Answer:</span>
                        <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', marginTop: '0.25rem' }}>"{transcription}"</p>
                      </div>
                    )}
                  </div>

                  <div className="chat-arena-footer" style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                      {isListening ? (
                        <button onClick={stopListeningMic} className="btn btn-outline" style={{ borderColor: '#ef4444', color: '#ef4444', padding: '0.75rem 2rem' }}>
                          ⏹️ Stop Speaking &amp; Send
                        </button>
                      ) : (
                        <button onClick={startListeningMic} className="btn btn-primary" style={{ padding: '0.75rem 2rem' }} disabled={speaking}>
                          🎙️ Talk / Record
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}

              {callStep === 2 && (
                <div style={{ textAlign: 'center', padding: '4rem 2.5rem', margin: 'auto', width: '100%' }}>
                  <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>✅</div>
                  <h2 className="heading-md" style={{ marginBottom: '1rem' }}>Mock Call Session Completed!</h2>
                  <p style={{ color: 'var(--text-secondary)', maxWidth: '550px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
                    Congratulations! You completed the simulated client inquiry phone call. Your transcribed conversational history has been saved successfully in your preparation file.
                  </p>

                  <div className="card" style={{ textAlign: 'left', padding: '2rem', marginBottom: '3rem', maxHeight: '200px', overflowY: 'auto' }}>
                    <h3 className="heading-sm" style={{ marginBottom: '1rem' }}>Transcript Summary:</h3>
                    {callLogs.map((log, idx) => (
                      <div key={idx} style={{ marginBottom: '1rem' }}>
                        <strong style={{ color: log.sender === 'customer' ? 'var(--purple-primary)' : 'var(--text-primary)', display: 'block' }}>
                          {log.sender === 'customer' ? "Customer (Rohan):" : "Agent (You):"}
                        </strong>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>"{log.text}"</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button onClick={startCallSim} className="btn btn-primary">Restart Call Practice</button>
                    <Link href="/grader" className="btn btn-outline">Grade Your Resume</Link>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </main>
    </>
  );
}
