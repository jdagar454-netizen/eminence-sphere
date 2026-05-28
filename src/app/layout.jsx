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

import Chatbot from '../components/Chatbot';
import PageTransition from '../components/PageTransition';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Eminence Sphere',
  image: 'https://eminencesphere.online/images/logo.png',
  description: 'Eminence Sphere Consulting & Business Services — Your trusted partner for Resume Making, Job Recruitment, Career Consultation, Mock Interview & Training.',
  url: 'https://eminencesphere.online',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Navbar />
        <PageTransition>{children}</PageTransition>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
