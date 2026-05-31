"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const ASSESSMENTS = {
  grammar: {
    title: "Customer Support Grammar & Tone",
    description: "Evaluates your written English, de-escalation vocabulary, and politeness standards.",
    questions: [
      {
        question: "Which of the following responses is the most professional when a customer asks for a refund that is against policy?",
        options: [
          "No, we don't do refunds after 30 days. Read our policy document online.",
          "I understand your perspective, and I wish I could process a refund. However, our standard policy limits refunds to 30 days. Can I offer you a discount code instead?",
          "Sure, I will ask my boss if we can break the rules for you just this once.",
          "Please do not blame me, I only follow the refund policy set by the company."
        ],
        answer: 1
      },
      {
        question: "Identify the sentence that represents a courteous tone:",
        options: [
          "You must send us your order receipt or we can't solve this.",
          "Send the order receipt immediately.",
          "Could you please share your order receipt? This will help me look up your details right away.",
          "If you don't have the receipt, I cannot help you."
        ],
        answer: 2
      },
      {
        question: "Choose the correct spelling for professional communication:",
        options: [
          "Acomodation",
          "Accomodation",
          "Accommodation",
          "Acomodation"
        ],
        answer: 2
      },
      {
        question: "Complete the sentence: 'We look forward to ______ your concerns resolved.'",
        options: [
          "get",
          "getting",
          "got",
          "gets"
        ],
        answer: 1
      },
      {
        question: "Which word represents the most sincere apology?",
        options: [
          "Regretfully",
          "Sorry (if you feel that way)",
          "Unfortunately",
          "Apologise (but it's not our fault)"
        ],
        answer: 0
      }
    ]
  },
  aptitude: {
    title: "BPO Scenario Handling & Logic",
    description: "Evaluates your priority management, service level speeds, and logical reasoning.",
    questions: [
      {
        question: "An angry customer demands to speak to a manager immediately. The manager is currently in a meeting. What should you do?",
        options: [
          "Interrupt the manager's meeting to transfer the call.",
          "Acknowledge the customer's frustration, explain that the manager is in a meeting, and offer to schedule a call-back within 2 hours or help them directly.",
          "Tell the customer they have to wait on hold until the manager is free.",
          "Hang up the call because the customer is being unreasonable."
        ],
        answer: 1
      },
      {
        question: "If a tier-1 customer support queue has 40 pending tickets and a 15-minute SLA limit, what is your immediate priority?",
        options: [
          "Take a break to let the queue clear up naturally.",
          "Sort tickets by submission time and prioritize critical client accounts or standard queue guidelines.",
          "Reply to all tickets with a copy-paste 'We are looking into this' response.",
          "Escalate all 40 tickets to tier-2 engineers directly."
        ],
        answer: 1
      },
      {
        question: "A client reports that they cannot access their online dashboard. What is the first troubleshooting step?",
        options: [
          "Tell them to purchase a new laptop.",
          "Reset the enterprise server hosting the site.",
          "Ask the customer if they are getting a specific error message, and check if they can access other websites.",
          "Tell them it is an ISP issue and close the ticket."
        ],
        answer: 2
      },
      {
        question: "If 'All agents are trained' and 'Rohan is an agent', which of the following must be true?",
        options: [
          "Rohan is not trained.",
          "Rohan is trained.",
          "Rohan is the trainer.",
          "Rohan is the support lead."
        ],
        answer: 1
      },
      {
        question: "What does CSAT stand for in BPO customer metrics?",
        options: [
          "Customer Sales and Telesales",
          "Client Support Action Tracker",
          "Customer Satisfaction Score",
          "Critical Service Agreement Target"
        ],
        answer: 2
      }
    ]
  }
};

export default function Assessments() {
  const [selectedQuizKey, setSelectedQuizKey] = useState(null);
  const [step, setStep] = useState(0); // 0: select, 1: quiz, 2: score
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);

  // Timer logic
  useEffect(() => {
    if (step !== 1 || timeLeft <= 0) {
      if (timeLeft === 0 && step === 1) {
        calculateScore();
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [step, timeLeft]);

  const startQuiz = (key) => {
    setSelectedQuizKey(key);
    setStep(1);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setTimeLeft(60);
  };

  const handleSelectOption = (optionIdx) => {
    setAnswers(prev => ({ ...prev, [currentQuestionIndex]: optionIdx }));
  };

  const handleNext = () => {
    const questions = ASSESSMENTS[selectedQuizKey].questions;
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateScore();
    }
  };

  const calculateScore = () => {
    const quiz = ASSESSMENTS[selectedQuizKey];
    let correct = 0;
    quiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.answer) {
        correct++;
      }
    });

    const calculatedScore = Math.round((correct / quiz.questions.length) * 100);
    setScore(calculatedScore);
    setStep(2);

    // Save assessment score locally for Candidate Portal
    if (typeof window !== 'undefined') {
      const history = JSON.parse(localStorage.getItem('eminence_assessment_history') || '[]');
      history.push({
        title: quiz.title,
        score: calculatedScore,
        date: new Date().toLocaleDateString()
      });
      localStorage.setItem('eminence_assessment_history', JSON.stringify(history));
    }
  };

  const quiz = selectedQuizKey ? ASSESSMENTS[selectedQuizKey] : null;
  const currentQuestion = quiz ? quiz.questions[currentQuestionIndex] : null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .assessments-container {
          padding-top: calc(var(--nav-height) + 4rem);
          padding-bottom: 6rem;
          min-height: 90vh;
        }

        .assessment-card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .option-button {
          width: 100%;
          text-align: left;
          padding: 1rem 1.5rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 0.95rem;
        }

        .option-button.selected {
          border-color: var(--purple-primary);
          background: rgba(124, 58, 237, 0.05);
        }

        .option-circle {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .option-button.selected .option-circle {
          border-color: var(--purple-primary);
          background: var(--purple-primary);
        }

        .option-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: white;
          display: none;
        }

        .option-button.selected .option-dot {
          display: block;
        }

        .progress-bar-bg {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 2rem;
        }

        .progress-bar-fill {
          height: 100%;
          background: var(--purple-gradient);
          transition: width 0.3s;
        }
      `}} />

      <section className="page-hero">
        <div className="glow-orb glow-orb-gold" style={{ width: "500px", height: "500px", top: "-150px", left: "50%", transform: "translateX(-50%)", opacity: 0.4 }}></div>
        <div className="container">
          <div className="badge badge-gold" style={{ marginBottom: "1.25rem" }}>Evaluate Skills</div>
          <h1 className="heading-xl page-hero-title">Skill <span className="text-gold">Assessments Hub</span></h1>
          <p className="page-hero-subtitle">Take diagnostic assessments designed to gauge your customer support, grammar, logic, and operational readiness.</p>
        </div>
      </section>

      <main className="assessments-container">
        <div className="container" style={{ maxWidth: '800px' }}>

          {/* ── STEP 0: SELECTION ── */}
          {step === 0 && (
            <div>
              <h2 className="heading-md text-center">Select Your Diagnostic Quiz</h2>
              <div className="assessment-card-grid">
                {Object.entries(ASSESSMENTS).map(([key, data]) => (
                  <div key={key} className="card" style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 className="heading-sm" style={{ marginBottom: '0.75rem' }}>{data.title}</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem' }}>{data.description}</p>
                    </div>
                    <button onClick={() => startQuiz(key)} className="btn btn-primary" style={{ width: '100%' }}>
                      Start Assessment
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── STEP 1: QUIZ TIMED ── */}
          {step === 1 && quiz && currentQuestion && (
            <div className="card" style={{ padding: '3rem 2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                  Question {currentQuestionIndex + 1} of {quiz.questions.length}
                </span>
                <span style={{ fontSize: '1.25rem', fontFamily: 'monospace', fontWeight: 'bold', color: timeLeft <= 15 ? '#ef4444' : 'var(--purple-primary)' }}>
                  ⏱️ {timeLeft}s
                </span>
              </div>

              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}></div>
              </div>

              <h2 className="heading-sm" style={{ marginBottom: '2rem', lineHeight: 1.5 }}>
                {currentQuestion.question}
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                {currentQuestion.options.map((opt, idx) => (
                  <button 
                    key={idx}
                    className={`option-button ${answers[currentQuestionIndex] === idx ? 'selected' : ''}`}
                    onClick={() => handleSelectOption(idx)}
                  >
                    <div className="option-circle">
                      <div className="option-dot"></div>
                    </div>
                    {opt}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button 
                  className="btn btn-outline" 
                  disabled={currentQuestionIndex === 0} 
                  onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                >
                  Previous
                </button>
                <button 
                  className="btn btn-primary" 
                  disabled={answers[currentQuestionIndex] === undefined}
                  onClick={handleNext}
                >
                  {currentQuestionIndex === quiz.questions.length - 1 ? 'Submit Answers' : 'Next Question'}
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 2: SCORE REPORT ── */}
          {step === 2 && quiz && (
            <div className="card" style={{ padding: '4rem 3rem', textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🏆</div>
              <h2 className="heading-md" style={{ marginBottom: '1rem' }}>Assessment Completed!</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>You completed the {quiz.title} assessment.</p>

              <div style={{ maxWidth: '280px', margin: '0 auto 3rem', background: 'rgba(124, 58, 237, 0.05)', border: '1px solid rgba(124, 58, 237, 0.15)', padding: '2rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Your Score</div>
                <div style={{ fontSize: '3.5rem', fontWeight: '800', color: 'var(--purple-primary)' }}>{score}%</div>
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '3rem', maxWidth: '550px', margin: '0 auto 3rem', lineHeight: 1.6 }}>
                {score >= 80 
                  ? "Outstanding! You possess excellent communication and professional skills. Our recruiters will prioritise your resume in selection pipelines."
                  : "Good effort! Review the questions and consider practicing again to raise your benchmark. Practice makes perfect."
                }
              </p>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button onClick={() => setStep(0)} className="btn btn-primary">Take Another Assessment</button>
                <Link href="/dashboard" className="btn btn-outline">Go to Candidate Dashboard</Link>
              </div>
            </div>
          )}

        </div>
      </main>
    </>
  );
}
