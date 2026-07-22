import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, serverTimestamp, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBmyZ6JLVJj0EjgXFTGOShK-d7uK3yo8ww",
  authDomain: "team-eminence.firebaseapp.com",
  projectId: "team-eminence",
  storageBucket: "team-eminence.firebasestorage.app",
  messagingSenderId: "1045226217031",
  appId: "1:1045226217031:web:8ab538893f0b0b19c39b62",
  measurementId: "G-SK2H0EB65Q"
};

// Initialize Firebase only once
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Helper to fetch active job listings with default fallbacks
export async function fetchActiveJobs() {
  const defaultJobs = [
    {
      id: 'job-1',
      title: 'Customer Support Representative (WFH)',
      category: 'Customer Support & BPO',
      location: 'Remote (Work From Home)',
      type: 'Full-Time',
      salary: '₹18,000 - ₹25,000 / mo',
      description: 'Help customers resolve queries via phone, email, and live chat. Work from the comfort of your home with leading global brands.',
      skills: ['Customer Support', 'Communication', 'Empathy', 'Problem Solving', 'English Fluency'],
      urgent: true
    },
    {
      id: 'job-2',
      title: 'Senior Technical Support Specialist',
      category: 'IT & Tech Support Services',
      location: 'In-Office (Meerut)',
      type: 'Full-Time',
      salary: '₹30,000 - ₹45,000 / mo',
      description: 'Solve complex technical hurdles, escalate network issues, and guide enterprise users through configuration pipelines.',
      skills: ['Technical Support', 'Networking', 'Troubleshooting', 'CRM', 'Hardware'],
      urgent: false
    },
    {
      id: 'job-3',
      title: 'Telecalling & Sales Executive',
      category: 'Telesales & Telecalling',
      location: 'Rohta Road, Meerut',
      type: 'Full-Time',
      salary: '₹15,000 - ₹22,000 / mo + incentives',
      description: 'Drive customer engagement, follow up with potential leads, and support closures for non-IT consulting pipelines.',
      skills: ['Sales', 'Telecalling', 'Negotiation', 'Communication', 'Hindi & English'],
      urgent: true
    }
  ];

  try {
    const jobsRef = collection(db, 'jobs');
    const q = query(jobsRef, where('active', '==', true));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const firebaseJobs = [];
      snapshot.forEach((doc) => {
        firebaseJobs.push({ id: doc.id, ...doc.data() });
      });
      return firebaseJobs;
    }
  } catch (error) {
    console.warn('Using default job listings (Firebase offline or empty):', error);
  }
  return defaultJobs;
}

// Helper to submit a candidate application
export async function submitJobApplication(applicationData) {
  try {
    const docRef = await addDoc(collection(db, 'applications'), {
      ...applicationData,
      status: 'Submitted',
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting application:', error);
    return { success: false, error: error.message };
  }
}

// Helper to submit corporate client bulk hiring request
export async function submitHiringRequest(requestData) {
  try {
    const docRef = await addDoc(collection(db, 'client_hiring_requests'), {
      ...requestData,
      status: 'Pending Review',
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting hiring request:', error);
    return { success: false, error: error.message };
  }
}

export { app, db, auth };

