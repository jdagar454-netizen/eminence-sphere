import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Script from 'next/script';

export const viewport = {
  themeColor: '#FFFFFF',
};

export const metadata = {
  title: 'Eminence Sphere — Consulting & Business Services',
  description: 'Eminence Sphere Consulting & Business Services — Your trusted partner for Resume Making, Job Recruitment, Career Consultation, Mock Interview & Training, and Professional Hurdles Consultation.',
  keywords: 'consulting, business services, resume making, job recruitment, career consultation, mock interview, professional hurdles, Eminence Sphere',
  openGraph: {
    type: 'website',
    title: 'Eminence Sphere Consulting & Business Services',
    description: 'Transforming businesses through strategic excellence and innovative solutions. 50+ clients served across 5+ industries.',
    url: 'https://eminencesphere.online',
    siteName: 'Eminence Sphere',
    images: [{ url: '/images/logo.png' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eminence Sphere Consulting & Business Services',
    description: 'Transforming businesses through strategic excellence and innovative solutions.',
    images: ['/images/logo.png']
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
        
        {/* Legacy Scripts - these will be refactored into React components later */}
        <Script src="/js/chatbot.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
