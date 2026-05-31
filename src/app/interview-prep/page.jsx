"use client";

import React, { useState, useEffect } from 'react';

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
        situation: "Presents a generic server blackout scenario.",
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

  useEffect(() => {
    let interval = null;
    if (timerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timer]);

  const handleSelectRole = (selectedRole) => {
    setRole(selectedRole);
    setQuestionIndex(0);
    setTimer(60);
    setTimerActive(false);
    setShowTips(false);
  };

  const handleStartTimer = () => {
    setTimerActive(true);
  };

  const handlePauseTimer = () => {
    setTimerActive(false);
  };

  const handleResetTimer = () => {
    setTimer(60);
    setTimerActive(false);
  };

  const handleNextQuestion = () => {
    const list = QUESTIONS_DATA[role];
    if (questionIndex < list.length - 1) {
      setQuestionIndex(prev => prev + 1);
      setTimer(60);
      setTimerActive(false);
      setShowTips(false);
    }
  };

  const handlePrevQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex(prev => prev - 1);
      setTimer(60);
      setTimerActive(false);
      setShowTips(false);
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
                  <h2 className="heading-md" style={{ lineHeight: 1.5 }}>
                    "{currentQuestion.question}"
                  </h2>

                  <div className="timer-badge">
                    {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2.5rem' }}>
                    {!timerActive ? (
                      <button onClick={handleStartTimer} className="btn btn-primary" style={{ padding: '0.5rem 1.5rem' }}>Start Timer</button>
                    ) : (
                      <button onClick={handlePauseTimer} className="btn btn-outline" style={{ padding: '0.5rem 1.5rem', borderColor: '#f59e0b', color: '#f59e0b' }}>Pause</button>
                    )}
                    <button onClick={handleResetTimer} className="btn btn-outline" style={{ padding: '0.5rem 1.5rem' }}>Reset</button>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', borderTop: '1px solid var(--color-border)', paddingTop: '2rem' }}>
                    <button 
                      onClick={() => setShowTips(!showTips)} 
                      className="btn btn-outline" 
                      style={{ padding: '0.5rem 1.5rem' }}
                    >
                      {showTips ? "Hide STAR Advice" : "Show STAR Advice"}
                    </button>
                    <button 
                      onClick={handlePrevQuestion} 
                      className="btn btn-outline" 
                      style={{ padding: '0.5rem 1.5rem' }} 
                      disabled={questionIndex === 0}
                    >
                      Previous
                    </button>
                    <button 
                      onClick={handleNextQuestion} 
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
