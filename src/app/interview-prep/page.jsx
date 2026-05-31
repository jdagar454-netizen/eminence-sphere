"use client";

import React, { useState, useEffect, useRef } from 'react';

const QUESTIONS_DATA = {
  "customer-support": [
    {
      id: 1,
      question: "Describe a time when you had to deal with an extremely angry customer. How did you handle the situation and what was the outcome?",
      starTips: {
        situation: "Set the context: explain why the customer was angry and what product/service they were using.",
        task: "Explain your objective: e.g. de-escalate the tension, solve their issue, and maintain customer satisfaction.",
        action: "Focus on empathy: explain how you actively listened, apologized, validated their concern, and found a concrete solution.",
        result: "Outcome: state how the customer calmed down, CSAT score achieved, or if they renewed their service."
      }
    },
    {
      id: 2,
      question: "How do you prioritize your support requests when you are dealing with multiple high-priority tickets simultaneously?",
      starTips: {
        situation: "Mention a specific day when ticket queues surged.",
        task: "Goal: respond within SLA guidelines without sacrificing response resolution quality.",
        action: "Describe your sorting methods: severity metrics, impact scale, or automated rules.",
        result: "Outcomes: SLAs met, resolution rates, and client satisfaction."
      }
    },
    {
      id: 3,
      question: "Can you give an example of a time you went above and beyond to solve a customer query?",
      starTips: {
        situation: "Outline the customer's unique issue or urgent timeline.",
        task: "Objective: solve a block that fell outside standard policy guidelines.",
        action: "Explain your actions: internal escalations, manual research, or personal follow-ups.",
        result: "Result: customer feedback, repeat business, or recognition received."
      }
    }
  ],
  "technical-support": [
    {
      id: 1,
      question: "Explain a complex technical issue you solved recently. How did you explain the solution to a non-technical user?",
      starTips: {
        situation: "Describe the technical system fault (e.g. DNS failure, database lockout).",
        task: "Objective: troubleshoot the problem while keeping the frustrated user informed.",
        action: "How you simplified the language: metaphors, screen-shares, step-by-step guides.",
        result: "Outcomes: system restored, ticket closed, user understood the system."
      }
    },
    {
      id: 2,
      question: "What is your step-by-step methodology when a customer reports that their service/app is completely offline?",
      starTips: {
        situation: "Present a generic server blackout scenario.",
        task: "Goal: diagnose root cause immediately (local vs global, ISP vs server).",
        action: "Explain checks: ping tests, console logs, network routes, checking AWS/Azure console status.",
        result: "Result: downtime minimized, resolution logged in Knowledge Base."
      }
    }
  ],
  "telesales": [
    {
      id: 1,
      question: "Tell us about a time you faced continuous rejection during an outbound campaign. How did you maintain your motivation and close a sale?",
      starTips: {
        situation: "Describe a cold-calling run with 30+ successive rejections.",
        task: "Goal: keep high conversational energy and close target pipelines.",
        action: "Steps taken: refining pitches, analyzing client objections, active listening.",
        result: "Outcomes: closed deal, team motivation, quarterly quota met."
      }
    }
  ]
};

export default function InterviewPrep() {
  const [role, setRole] = useState(null); // 'customer-support' | 'technical-support' | 'telesales'
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(60);
  const [timerActive, setTimerActive] = useState(false);
  const [showTips, setShowTips] = useState(false);

  // Speech evaluation states
  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [evaluationResult, setEvaluationResult] = useState(null);

  const recognitionRef = useRef(null);

  // Speech Recognition setup
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

  // Timer logic
  useEffect(() => {
    let interval = null;
    if (timerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setTimerActive(false);
      if (isListening) stopRecording();
    }
    return () => clearInterval(interval);
  }, [timerActive, timer]);

  const handleSelectRole = (selectedRole) => {
    setRole(selectedRole);
    setQuestionIndex(0);
    setTimer(60);
    setTimerActive(false);
    setShowTips(false);
    setTranscription('');
    setEvaluationResult(null);
  };

  const startRecording = () => {
    if (recognitionRef.current) {
      setTranscription('');
      setEvaluationResult(null);
      setIsListening(true);
      setTimerActive(true);
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.warn("Speech already started");
      }
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      setTimerActive(false);
      
      // Trigger transcription analysis
      setTimeout(() => {
        analyzeAnswer();
      }, 500);
    }
  };

  const analyzeAnswer = () => {
    if (!transcription.trim()) return;

    const lower = transcription.toLowerCase();
    
    // Check keywords for STAR methodology
    const hasSituation = ["situation", "when", "customer", "working", "using", "client", "problem", "issue"].some(w => lower.includes(w));
    const hasTask = ["task", "goal", "objective", "expect", "target", "wanted to", "had to"].some(w => lower.includes(w));
    const hasAction = ["action", "resolved", "apologized", "listening", "explained", "stepped in", "called", "sent"].some(w => lower.includes(w));
    const hasResult = ["result", "outcome", "consequently", "solved", "satisfied", "csat", "renewed", "closed"].some(w => lower.includes(w));

    const sScore = hasSituation ? 95 : 30;
    const tScore = hasTask ? 90 : 35;
    const aScore = hasAction ? 95 : 40;
    const rScore = hasResult ? 90 : 30;

    const total = Math.round((sScore + tScore + aScore + rScore) / 4);

    const critique = {
      score: total,
      situation: hasSituation ? "Valid context provided successfully." : "Missing core details: Describe the specific background or context of the hurdle.",
      task: hasTask ? "Direct objectives defined." : "Define your role and what needed to be accomplished.",
      action: hasAction ? "Clear, practical steps described." : "Be detailed: Explain the exact actions you took to solve the customer concern.",
      result: hasResult ? "Strong outcome focus." : "Focus on closure: State what the resolution or CSAT result was."
    };

    setEvaluationResult(critique);

    // Save history for Dashboard
    if (typeof window !== 'undefined') {
      const history = JSON.parse(localStorage.getItem('eminence_assessment_history') || '[]');
      history.push({
        title: `Mock STAR Prep: ${role.replace('-', ' ')}`,
        score: total,
        date: new Date().toLocaleDateString()
      });
      localStorage.setItem('eminence_assessment_history', JSON.stringify(history));
    }
  };

  const questionsList = role ? QUESTIONS_DATA[role] : [];
  const currentQuestion = role ? questionsList[questionIndex] : null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .prep-container {
          padding-top: calc(var(--nav-height) + 4rem);
          padding-bottom: 6rem;
          min-height: 100vh;
        }

        .prep-card-layout {
          max-width: 800px;
          margin: 0 auto;
        }

        .timer-badge {
          font-family: monospace;
          font-size: 2.5rem;
          font-weight: bold;
          color: var(--purple-primary);
          background: var(--color-bg-2);
          border: 1px solid var(--color-border);
          padding: 0.5rem 1.5rem;
          border-radius: var(--radius-sm);
          display: inline-block;
          margin: 1.5rem 0;
        }

        .star-tip-box {
          background: rgba(124, 58, 237, 0.04);
          border: 1px solid rgba(124, 58, 237, 0.15);
          border-radius: var(--radius-sm);
          padding: 2rem;
          margin-top: 2rem;
        }

        .star-step {
          margin-bottom: 1.25rem;
        }

        .star-step:last-child {
          margin-bottom: 0;
        }

        .star-badge {
          background: var(--purple-gradient);
          color: white;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          margin-right: 0.5rem;
          text-transform: uppercase;
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
          <div className="badge badge-gold" style={{ marginBottom: "1.25rem" }}>Practice Arena</div>
          <h1 className="heading-xl page-hero-title">Mock Interview <span className="text-gold">Preparation Hub</span></h1>
          <p className="page-hero-subtitle">Practice answering real, role-based interview questions under realistic timers using the STAR methodology.</p>
        </div>
      </section>

      <main className="prep-container">
        <div className="container">
          <div className="prep-card-layout">

            {/* ── ROLE SELECTION ── */}
            {!role ? (
              <div className="card" style={{ padding: '3.5rem 2.5rem' }}>
                <h2 className="heading-md" style={{ textAlign: 'center', marginBottom: '2rem' }}>Select Your Target Job Role</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                  
                  <div className="card text-center" style={{ padding: '2.5rem 1.5rem', cursor: 'pointer', border: '1px solid var(--color-border)' }} onClick={() => handleSelectRole('customer-support')}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎧</div>
                    <h3 className="heading-sm" style={{ marginBottom: '0.5rem' }}>Customer Support</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Behavioral queries, empathy handling, de-escalation strategies.</p>
                  </div>

                  <div className="card text-center" style={{ padding: '2.5rem 1.5rem', cursor: 'pointer', border: '1px solid var(--color-border)' }} onClick={() => handleSelectRole('technical-support')}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔧</div>
                    <h3 className="heading-sm" style={{ marginBottom: '0.5rem' }}>Technical Support</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Analytical troubleshooting, network blocks, non-technical explanations.</p>
                  </div>

                  <div className="card text-center" style={{ padding: '2.5rem 1.5rem', cursor: 'pointer', border: '1px solid var(--color-border)' }} onClick={() => handleSelectRole('telesales')}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📞</div>
                    <h3 className="heading-sm" style={{ marginBottom: '0.5rem' }}>Telesales Executive</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Outbound lead pipeline calls, handling objections, quotas.</p>
                  </div>

                </div>
              </div>
            ) : (
              /* ── QUESTIONS CARD ── */
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <button onClick={() => setRole(null)} className="btn btn-outline" style={{ padding: '0.5rem 1.25rem' }}>&larr; Change Role</button>
                  <div style={{ fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--purple-primary)', letterSpacing: '0.05em' }}>
                    {role.replace('-', ' ')} (Question {questionIndex + 1} of {questionsList.length})
                  </div>
                </div>

                <div className="card" style={{ padding: '3.5rem 2.5rem', textAlign: 'center' }}>
                  <h2 className="heading-sm" style={{ lineHeight: 1.5 }}>
                    "{currentQuestion.question}"
                  </h2>

                  <div className="timer-badge">
                    {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2.5rem' }}>
                    {isListening ? (
                      <button onClick={stopRecording} className="btn btn-outline" style={{ borderColor: '#ef4444', color: '#ef4444', padding: '0.5rem 1.5rem' }}>
                        ⏹️ Stop Recording
                      </button>
                    ) : (
                      <button onClick={startRecording} className="btn btn-primary" style={{ padding: '0.5rem 1.5rem' }}>
                        🎙️ Speak / Record Answer
                      </button>
                    )}
                  </div>

                  {isListening && (
                    <div style={{ margin: '1rem 0', color: 'var(--purple-primary)' }}>
                      Listening... Speak your answer now.
                      <div className="live-mic-wave">
                        <div className="wave-bar"></div>
                        <div className="wave-bar"></div>
                        <div className="wave-bar"></div>
                      </div>
                    </div>
                  )}

                  {transcription && (
                    <div className="card text-left" style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--color-border)', padding: '1rem 1.5rem', margin: '2rem 0' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>Live Transcription:</span>
                      <p style={{ marginTop: '0.25rem', fontSize: '0.95rem' }}>"{transcription}"</p>
                    </div>
                  )}

                  {/* ── STAR SCORING EVALUATION DISPLAY ── */}
                  {evaluationResult && (
                    <div className="card text-left" style={{ border: '1px solid rgba(16, 185, 129, 0.2)', background: 'rgba(16,185,129,0.01)', padding: '2rem', margin: '2rem 0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 className="heading-sm" style={{ color: '#10b981' }}>STAR Evaluation Report</h3>
                        <span style={{ fontSize: '1.75rem', fontWeight: '800', color: '#10b981' }}>{evaluationResult.score}%</span>
                      </div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        <p><strong>Situation:</strong> {evaluationResult.situation}</p>
                        <p><strong>Task:</strong> {evaluationResult.task}</p>
                        <p><strong>Action:</strong> {evaluationResult.action}</p>
                        <p><strong>Result:</strong> {evaluationResult.result}</p>
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', borderTop: '1px solid var(--color-border)', paddingTop: '2rem' }}>
                    <button 
                      onClick={() => setShowTips(!showTips)} 
                      className="btn btn-outline" 
                      style={{ padding: '0.5rem 1.5rem' }}
                    >
                      {showTips ? "Hide STAR Advice" : "Show STAR Advice"}
                    </button>
                    <button 
                      onClick={() => {
                        if (questionIndex > 0) {
                          setQuestionIndex(prev => prev - 1);
                          setTimer(60);
                          setTranscription('');
                          setEvaluationResult(null);
                        }
                      }} 
                      className="btn btn-outline" 
                      style={{ padding: '0.5rem 1.5rem' }} 
                      disabled={questionIndex === 0}
                    >
                      Previous
                    </button>
                    <button 
                      onClick={() => {
                        if (questionIndex < questionsList.length - 1) {
                          setQuestionIndex(prev => prev + 1);
                          setTimer(60);
                          setTranscription('');
                          setEvaluationResult(null);
                        }
                      }} 
                      className="btn btn-outline" 
                      style={{ padding: '0.5rem 1.5rem' }} 
                      disabled={questionIndex === questionsList.length - 1}
                    >
                      Next Question
                    </button>
                  </div>
                </div>

                {/* ── STAR METHOD TIPS ── */}
                {showTips && (
                  <div className="star-tip-box">
                    <h3 className="heading-sm" style={{ marginBottom: '1.25rem' }}>STAR Framework Structure Guide</h3>
                    
                    <div className="star-step">
                      <span className="star-badge">Situation</span>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'inline' }}>{currentQuestion.starTips.situation}</p>
                    </div>

                    <div className="star-step">
                      <span className="star-badge">Task</span>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'inline' }}>{currentQuestion.starTips.task}</p>
                    </div>

                    <div className="star-step">
                      <span className="star-badge">Action</span>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'inline' }}>{currentQuestion.starTips.action}</p>
                    </div>

                    <div className="star-step">
                      <span className="star-badge">Result</span>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'inline' }}>{currentQuestion.starTips.result}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </main>
    </>
  );
}
