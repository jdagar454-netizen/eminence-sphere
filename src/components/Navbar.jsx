"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  const isActive = (path) => pathname === path ? 'active' : '';

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .theme-toggle-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(124, 58, 237, 0.08);
          color: var(--purple-primary);
          cursor: pointer;
          transition: transform 0.5s ease, background 0.3s;
          border: 1px solid rgba(124, 58, 237, 0.15);
        }

        .theme-toggle-btn:hover {
          background: rgba(124, 58, 237, 0.15);
          transform: rotate(30deg) scale(1.05);
        }

        .theme-toggle-btn svg {
          width: 20px;
          height: 20px;
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
      `}} />

      <nav className={`navbar${isScrolled ? ' scrolled' : ''}`} id="navbar">
        <div className="nav-inner">
          <Link href="/" className="nav-logo" id="nav-logo" onClick={closeMenu}>
            <Image src="/images/logo.png" alt="Eminence Sphere Logo" width={200} height={48} style={{ height: '48px', width: 'auto' }} />
          </Link>
          <ul className="nav-links">
            <li><Link href="/" className={`nav-link ${isActive('/')}`}>Home</Link></li>
            <li><Link href="/about" className={`nav-link ${isActive('/about')}`}>About</Link></li>
            <li><Link href="/services" className={`nav-link ${isActive('/services')}`}>Services</Link></li>
            <li><Link href="/testimonials" className={`nav-link ${isActive('/testimonials')}`}>Testimonials</Link></li>
            <li><Link href="/careers" className={`nav-link ${isActive('/careers')}`}>Careers</Link></li>
            <li><Link href="/pricing" className={`nav-link ${isActive('/pricing')}`}>Pricing</Link></li>
            <li><Link href="/grader" className={`nav-link ${isActive('/grader')}`}>Resume Grader</Link></li>
            <li><Link href="/interview-prep" className={`nav-link ${isActive('/interview-prep')}`}>Interview Prep</Link></li>
            <li><Link href="/practice-arena" className={`nav-link ${isActive('/practice-arena')}`}>Practice Arena</Link></li>
            <li><Link href="/assessments" className={`nav-link ${isActive('/assessments')}`}>Assessments</Link></li>
            <li><Link href="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>Portal</Link></li>
            <li><Link href="/resources" className={`nav-link ${isActive('/resources')}`}>Resources</Link></li>
          </ul>

          <div className="nav-actions">
            <button 
              className="theme-toggle-btn" 
              onClick={toggleTheme} 
              aria-label="Toggle light/dark theme"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            >
              {theme === 'light' ? (
                // Moon Icon
                <svg viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              ) : (
                // Sun Icon
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              )}
            </button>

            <Link href="/contact" className={`nav-link nav-cta ${isActive('/contact')}`} onClick={closeMenu}>Get in Touch</Link>

            <button 
              className={`nav-hamburger ${isMobileMenuOpen ? 'open' : ''}`} 
              id="hamburger" 
              aria-label="Toggle menu"
              onClick={toggleMenu}
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      <nav className={`nav-mobile ${isMobileMenuOpen ? 'open' : ''}`} id="nav-mobile">
        <Link href="/" className={`nav-link ${isActive('/')}`} onClick={closeMenu}>Home</Link>
        <Link href="/about" className={`nav-link ${isActive('/about')}`} onClick={closeMenu}>About</Link>
        <Link href="/services" className={`nav-link ${isActive('/services')}`} onClick={closeMenu}>Services</Link>
        <Link href="/testimonials" className={`nav-link ${isActive('/testimonials')}`} onClick={closeMenu}>Testimonials</Link>
        <Link href="/careers" className={`nav-link ${isActive('/careers')}`} onClick={closeMenu}>Careers</Link>
        <Link href="/pricing" className={`nav-link ${isActive('/pricing')}`} onClick={closeMenu}>Pricing</Link>
        <Link href="/grader" className={`nav-link ${isActive('/grader')}`} onClick={closeMenu}>Resume Grader</Link>
        <Link href="/interview-prep" className={`nav-link ${isActive('/interview-prep')}`} onClick={closeMenu}>Interview Prep</Link>
        <Link href="/practice-arena" className={`nav-link ${isActive('/practice-arena')}`} onClick={closeMenu}>Practice Arena</Link>
        <Link href="/assessments" className={`nav-link ${isActive('/assessments')}`} onClick={closeMenu}>Assessments</Link>
        <Link href="/dashboard" className={`nav-link ${isActive('/dashboard')}`} onClick={closeMenu}>Portal</Link>
        <Link href="/resources" className={`nav-link ${isActive('/resources')}`} onClick={closeMenu}>Resources</Link>
        <Link href="/contact" className={`nav-link nav-cta ${isActive('/contact')}`} onClick={closeMenu}>Get in Touch</Link>
      </nav>
    </>
  );
}
