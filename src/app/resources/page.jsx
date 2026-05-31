"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const ARTICLES = [
  {
    id: 1,
    title: "10 Secrets to Cracking BPO Customer Support Interviews",
    category: "Interview Prep",
    summary: "Discover the top questions asked by top BPO firms and how to structure your answers using the STAR methodology.",
    readTime: "5 min read",
    date: "May 25, 2026",
    icon: "🎙️"
  },
  {
    id: 2,
    title: "How to Build an ATS-Friendly Customer Support Resume",
    category: "Resume Building",
    summary: "Step-by-step guide to formatting your resume, selecting keywords, and bypassing automated candidate screening filters.",
    readTime: "7 min read",
    date: "May 26, 2026",
    icon: "📄"
  },
  {
    id: 3,
    title: "Understanding BPO and ITES Hiring Trends in 2026",
    category: "BPO Trends",
    summary: "An in-depth analysis of the shift towards remote support, dedicated call metrics, and customer service technology suites.",
    readTime: "6 min read",
    date: "May 27, 2026",
    icon: "📈"
  },
  {
    id: 4,
    title: "The Power of Active Listening in Customer Experience",
    category: "Interview Prep",
    summary: "Learn how to express genuine empathy, handle frustrated clients, and raise your CSAT scores in any placement role.",
    readTime: "4 min read",
    date: "May 28, 2026",
    icon: "🎧"
  },
  {
    id: 5,
    title: "LinkedIn Profile Optimisation for Customer Support Professionals",
    category: "Resume Building",
    summary: "Tips on writing a killer summary, selecting skills tags, and attracting recruiters directly to your profile.",
    readTime: "5 min read",
    date: "May 29, 2026",
    icon: "🌐"
  }
];

const CATEGORIES = ["All", "Interview Prep", "Resume Building", "BPO Trends"];

export default function ResourcesHub() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = ARTICLES.filter(art => {
    const matchesCategory = selectedCategory === "All" || art.category === selectedCategory;
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .resources-container {
          padding-top: calc(var(--nav-height) + 3rem);
          padding-bottom: 6rem;
          min-height: 90vh;
        }

        .category-tab-bar {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-bottom: 3rem;
        }

        .category-tab-btn {
          padding: 0.5rem 1.5rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--color-border);
          color: var(--text-secondary);
          transition: all 0.3s;
        }

        .category-tab-btn.active {
          background: var(--purple-gradient);
          color: white;
          border-color: transparent;
        }

        .articles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .article-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 2.25rem;
          height: 100%;
          transition: transform 0.3s, border-color 0.3s;
        }

        .article-card:hover {
          transform: translateY(-4px);
          border-color: var(--purple-primary);
        }

        .article-icon-box {
          font-size: 2.5rem;
          margin-bottom: 1.25rem;
        }
      `}} />

      <section className="page-hero">
        <div className="glow-orb glow-orb-gold" style={{ width: "500px", height: "500px", top: "-150px", left: "50%", transform: "translateX(-50%)", opacity: 0.4 }}></div>
        <div className="container">
          <div className="badge badge-gold" style={{ marginBottom: "1.25rem" }}>Insights &amp; Guides</div>
          <h1 className="heading-xl page-hero-title">Career <span className="text-gold">Resources Hub</span></h1>
          <p className="page-hero-subtitle">Equip yourself with expert interview tutorials, resume-building techniques, and BPO trends updates.</p>
        </div>
      </section>

      <main className="resources-container">
        <div className="container">

          {/* Search bar */}
          <div style={{ maxWidth: '600px', margin: '0 auto 3rem', display: 'flex', gap: '1rem' }}>
            <input 
              type="text" 
              className="form-input" 
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--color-border)', color: 'var(--text-primary)', width: '100%', padding: '0.85rem 1.25rem', borderRadius: 'var(--radius-sm)' }}
              placeholder="Search resources, tips, or articles..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Tabs */}
          <div className="category-tab-bar">
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                className={`category-tab-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Articles list */}
          {filteredArticles.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-secondary)' }}>
              <h3>No articles match your query.</h3>
              <p style={{ marginTop: '0.5rem' }}>Try modifying your search or changing the selected category.</p>
            </div>
          ) : (
            <div className="articles-grid">
              {filteredArticles.map(art => (
                <div key={art.id} className="card article-card">
                  <div>
                    <div className="article-icon-box">{art.icon}</div>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span className="badge badge-gold" style={{ fontSize: '0.7rem' }}>{art.category}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{art.readTime}</span>
                    </div>
                    <h3 className="heading-sm" style={{ marginBottom: '1rem', lineHeight: 1.4 }}>{art.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem' }}>{art.summary}</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.03)', paddingTop: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <span>Published: {art.date}</span>
                    <span style={{ color: 'var(--purple-primary)', fontWeight: 600, cursor: 'pointer' }}>Read Article &rarr;</span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>
    </>
  );
}
