"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  const isActive = (path) => pathname === path ? 'active' : '';

  return (
    <>
      <nav className={`navbar${isScrolled ? ' scrolled' : ''}`} id="navbar">
        <div className="nav-inner">
          <Link href="/" className="nav-logo" id="nav-logo" onClick={closeMenu}>
            <img src="/images/logo.png" alt="Eminence Sphere Logo" style={{ height: '48px', width: 'auto' }} />
          </Link>
          <ul className="nav-links">
            <li><Link href="/" className={`nav-link ${isActive('/')}`}>Home</Link></li>
            <li><Link href="/about" className={`nav-link ${isActive('/about')}`}>About</Link></li>
            <li><Link href="/services" className={`nav-link ${isActive('/services')}`}>Services</Link></li>
            <li><Link href="/testimonials" className={`nav-link ${isActive('/testimonials')}`}>Testimonials</Link></li>
            <li><Link href="/careers" className={`nav-link ${isActive('/careers')}`}>Careers</Link></li>
            <li><Link href="/contact" className={`nav-link nav-cta ${isActive('/contact')}`}>Get in Touch</Link></li>
          </ul>
          <button 
            className={`nav-hamburger ${isMobileMenuOpen ? 'open' : ''}`} 
            id="hamburger" 
            aria-label="Toggle menu"
            onClick={toggleMenu}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      <nav className={`nav-mobile ${isMobileMenuOpen ? 'open' : ''}`} id="nav-mobile">
        <Link href="/" className={`nav-link ${isActive('/')}`} onClick={closeMenu}>Home</Link>
        <Link href="/about" className={`nav-link ${isActive('/about')}`} onClick={closeMenu}>About</Link>
        <Link href="/services" className={`nav-link ${isActive('/services')}`} onClick={closeMenu}>Services</Link>
        <Link href="/testimonials" className={`nav-link ${isActive('/testimonials')}`} onClick={closeMenu}>Testimonials</Link>
        <Link href="/careers" className={`nav-link ${isActive('/careers')}`} onClick={closeMenu}>Careers</Link>
        <Link href="/contact" className={`nav-link nav-cta ${isActive('/contact')}`} onClick={closeMenu}>Get in Touch</Link>
      </nav>
    </>
  );
}
