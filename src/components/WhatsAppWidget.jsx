"use client";

import React from 'react';

export default function WhatsAppWidget({ customMessage }) {
  const phoneNumber = "916396582575";
  const defaultText = customMessage || "Hi Eminence Sphere! I would like to inquire about job opportunities and consulting services.";
  const encodedText = encodeURIComponent(defaultText);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .whatsapp-widget {
          position: fixed;
          bottom: 8.5rem;
          right: 2rem;
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          font-family: var(--font-body);
        }

        .whatsapp-btn {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background-color: #25D366;
          box-shadow: 0 4px 24px rgba(37, 211, 102, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease;
          border: none;
          outline: none;
          animation: wa-launcher-pulse 2s infinite;
        }

        .whatsapp-btn:hover {
          transform: scale(1.08) rotate(-5deg);
          box-shadow: 0 8px 32px rgba(37, 211, 102, 0.45);
        }

        .whatsapp-btn svg {
          width: 28px;
          height: 28px;
          fill: #FFFFFF;
        }

        .whatsapp-tooltip {
          background: #FFFFFF;
          border: 1px solid var(--color-border);
          padding: 0.5rem 1rem;
          border-radius: 30px;
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-primary);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          opacity: 0;
          transform: translateX(10px);
          pointer-events: none;
          transition: opacity 0.3s ease, transform 0.3s ease;
          white-space: nowrap;
          order: -1;
        }

        .whatsapp-widget:hover .whatsapp-tooltip {
          opacity: 1;
          transform: translateX(0);
        }

        @keyframes wa-launcher-pulse {
          0% {
            box-shadow: 0 4px 24px rgba(37, 211, 102, 0.35), 0 0 0 0 rgba(37, 211, 102, 0.3);
          }
          70% {
            box-shadow: 0 4px 24px rgba(37, 211, 102, 0.35), 0 0 0 10px rgba(37, 211, 102, 0);
          }
          100% {
            box-shadow: 0 4px 24px rgba(37, 211, 102, 0.35), 0 0 0 0 rgba(37, 211, 102, 0);
          }
        }

        @media (max-width: 480px) {
          .whatsapp-widget {
            bottom: 7rem;
            right: 1rem;
          }
          .whatsapp-tooltip {
            display: none;
          }
        }
      `}} />

      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="whatsapp-widget" aria-label="Chat on WhatsApp">
        <button className="whatsapp-btn">
          <svg viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.115-2.908-6.995-1.878-1.88-4.357-2.912-6.997-2.914-5.443 0-9.865 4.42-9.869 9.866-.001 1.748.498 3.31 1.45 4.87L1.888 22.038l6.759-1.77zM17.7 14.88c-.31-.155-1.83-.9-2.112-1.004-.282-.102-.489-.153-.692.155-.205.307-.795.998-.97 1.205-.175.205-.35.23-.66.077-.309-.155-1.305-.48-2.486-1.534-.919-.818-1.54-1.83-1.72-2.139-.18-.309-.02-.477.135-.63.14-.139.31-.36.465-.54.156-.18.205-.307.31-.513.102-.205.05-.384-.025-.538-.077-.154-.692-1.67-.95-2.288-.25-.608-.503-.526-.692-.536-.18-.01-.384-.01-.59-.01-.205 0-.538.077-.82.384-.282.308-1.077 1.05-1.077 2.56 0 1.51 1.1 2.97 1.25 3.18.15.205 2.16 3.3 5.23 4.625.73.315 1.3.504 1.743.644.734.234 1.4.2 1.93.12.585-.087 1.83-.747 2.085-1.47.256-.72.256-1.337.18-1.47-.076-.134-.282-.206-.59-.36z" />
          </svg>
        </button>
        <div className="whatsapp-tooltip">Chat on WhatsApp (+91 63965 82575)</div>
      </a>
    </>
  );
}
