import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Eminence Sphere — Consulting & Business Services',
  description: 'Eminence Sphere Consulting & Business Services — Your trusted partner for Resume Making, Job Recruitment, Career Consultation, Mock Interview & Training, and Professional Hurdles Consultation.',
  keywords: 'consulting, business services, resume making, job recruitment, career consultation, mock interview, professional hurdles, Eminence Sphere',
  themeColor: '#FFFFFF',
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
        <script src="/js/main.js" async></script>
        <script src="/js/chatbot.js" async></script>
      </body>
    </html>
  );
}
