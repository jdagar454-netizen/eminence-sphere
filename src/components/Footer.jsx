import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Image src="/images/logo.png" alt="Eminence Sphere" width={200} height={52} style={{ height: '52px', width: 'auto', marginBottom: '1rem' }} />
            <p>Partnering with ambitious businesses to achieve extraordinary results through strategic consulting, expert advisory, and transformative solutions.</p>
          </div>
          <div>
            <div className="footer-col-title">Navigation</div>
            <ul className="footer-links">
              <li><Link href="/" className="footer-link">Home</Link></li>
              <li><Link href="/about" className="footer-link">About Us</Link></li>
              <li><Link href="/services" className="footer-link">Services</Link></li>
              <li><Link href="/testimonials" className="footer-link">Testimonials</Link></li>
              <li><Link href="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Services</div>
            <ul className="footer-links">
              <li><Link href="/services#talent-acquisition" className="footer-link">Talent Acquisition</Link></li>
              <li><Link href="/services#hr-consulting" className="footer-link">Strategic HR Consulting</Link></li>
              <li><Link href="/services#talent-acquisition" className="footer-link">Bulk Hiring &amp; BPO</Link></li>
              <li><Link href="/services#hr-consulting" className="footer-link">Candidate Screening</Link></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Get in Touch</div>
            <div className="footer-contact-item">
              <svg className="footer-contact-icon" viewBox="0 0 16 16"><path d="M8 1C4.7 1 2 3.7 2 7c0 4.4 6 9 6 9s6-4.6 6-9c0-3.3-2.7-6-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z"/></svg>
              <div className="footer-contact-text">84, Rohta Road, Meerut,<br/>Uttar Pradesh, IN 250502</div>
            </div>
            <div className="footer-contact-item">
              <svg className="footer-contact-icon" viewBox="0 0 16 16"><path d="M2 3h12a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V4a1 1 0 011-1z"/><path d="M1 4l7 5 7-5"/></svg>
              <div className="footer-contact-text">
                <span style={{ display: 'block' }}>hr@eminencesphere.online</span>
                <span style={{ display: 'block', marginTop: '0.25rem' }}>info@eminencesphere.online</span>
              </div>
            </div>
            <div className="footer-contact-item">
              <svg className="footer-contact-icon" viewBox="0 0 16 16"><path d="M14.5 11.5l-2-2a1.4 1.4 0 00-2 0l-1 1C8 10 6 8 5.5 6.5l1-1a1.4 1.4 0 000-2l-2-2a1.4 1.4 0 00-2 0C1 3 1 7.5 6.5 13S13 15 14.5 13.5a1.4 1.4 0 000-2z"/></svg>
              <div className="footer-contact-text">+91 63965 82575</div>
            </div>
            <div className="footer-contact-item" style={{ alignItems: 'flex-start' }}>
              <svg className="footer-contact-icon" style={{ marginTop: '0.2rem' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <div className="footer-contact-text" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>GSTIN:<br/>09CKFPC6199H1ZT</div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">© 2025 Eminence Sphere Consulting &amp; Business Services. All rights reserved. | <Link href="/pipeline" style={{ color: 'var(--purple-primary)', textDecoration: 'underline' }}>Recruitment Pipeline</Link></div>
          <div className="footer-social">
            <a href="https://www.linkedin.com/in/nikul-chaudhary-b16344412" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
