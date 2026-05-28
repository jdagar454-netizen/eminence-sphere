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
              <li><Link href="/careers" className="footer-link">Careers</Link></li>
              <li><Link href="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Services</div>
            <ul className="footer-links">
              <li><Link href="/services#resume-making" className="footer-link">Resume Making</Link></li>
              <li><Link href="/services#job-recruitment" className="footer-link">Job Recruitment</Link></li>
              <li><Link href="/services#career-consultation" className="footer-link">Career Consultation</Link></li>
              <li><Link href="/services#mock-interview-training" className="footer-link">Mock Interview &amp; Training</Link></li>
              <li><Link href="/services#professional-hurdles-consultation" className="footer-link">Professional Hurdles Consultation</Link></li>
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
                <span style={{ display: 'block' }}>hr@eminencesphere.online (General &amp; HR)</span>
                <span style={{ display: 'block', marginTop: '0.25rem' }}>info@eminencesphere.online (Recruitment &amp; Hiring)</span>
              </div>
            </div>
            <div className="footer-contact-item">
              <svg className="footer-contact-icon" viewBox="0 0 16 16"><path d="M14.5 11.5l-2-2a1.4 1.4 0 00-2 0l-1 1C8 10 6 8 5.5 6.5l1-1a1.4 1.4 0 000-2l-2-2a1.4 1.4 0 00-2 0C1 3 1 7.5 6.5 13S13 15 14.5 13.5a1.4 1.4 0 000-2z"/></svg>
              <div className="footer-contact-text">+91 121 315 9030</div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">© 2025 Eminence Sphere Consulting &amp; Business Services. All rights reserved. | <Link href="/pipeline" style={{ color: 'var(--purple-primary)', textDecoration: 'underline' }}>Recruitment Pipeline</Link></div>
          <div className="footer-social">
            <a href="#" className="social-link" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="#" className="social-link" aria-label="Twitter/X">
              <svg viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
            </a>
            <a href="#" className="social-link" aria-label="Facebook">
              <svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
