"use client";
import { useScrollReveal } from "../hooks/useScrollReveal";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  useScrollReveal();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .error-page {
          min-height: calc(100vh - 80px - 200px);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 4rem 2rem;
          position: relative;
          overflow: hidden;
        }
        .error-page::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 50% at 50% 40%, rgba(201,168,76,0.06) 0%, transparent 70%);
        }
        .error-content { position: relative; z-index: 1; max-width: 560px; margin: 0 auto; }
        .error-code {
          font-family: var(--font-heading);
          font-size: clamp(6rem, 20vw, 12rem);
          font-weight: 800;
          line-height: 1;
          background: var(--gold-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
          opacity: 0.5;
        }
        .error-title {
          font-family: var(--font-heading);
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          font-weight: 700;
          margin-bottom: 1rem;
        }
        .error-desc {
          color: var(--text-secondary);
          font-size: 1rem;
          line-height: 1.75;
          margin-bottom: 2.5rem;
        }
        .error-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
        .error-logo { margin: 0 auto 2.5rem; }
      ` }} />
      <main className="error-page">
        <div className="glow-orb glow-orb-gold" style={{ width: "500px", height: "500px", top: "-100px", left: "50%", transform: "translateX(-50%)", opacity: 0.3 }}></div>
        <div className="error-content">
          <Image src="/images/logo.png" alt="Eminence Sphere" className="error-logo" width={300} height={72} style={{ height: "72px", width: "auto" }} />
          <div className="error-code">404</div>
          <h1 className="error-title">Page Not Found</h1>
          <p className="error-desc">The page you're looking for doesn't exist or may have been moved. Let us help you find what you need.</p>
          <div className="error-actions">
            <Link href="/" className="btn btn-primary" id="error-home">
              Back to Home
              <svg className="btn-icon" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3.75 9h10.5M9.75 4.5L14.25 9l-4.5 4.5" />
              </svg>
            </Link>
            <Link href="/contact" className="btn btn-outline" id="error-contact">Contact Us</Link>
          </div>
        </div>
      </main>
    </>
  );
}
