const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs, deleteDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyBmyZ6JLVJj0EjgXFTGOShK-d7uK3yo8ww",
  authDomain: "team-eminence.firebaseapp.com",
  projectId: "team-eminence",
  storageBucket: "team-eminence.firebasestorage.app",
  messagingSenderId: "1045226217031",
  appId: "1:1045226217031:web:8ab538893f0b0b19c39b62"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const sampleJobs = [
  {
    title: "Customer Support Representative (WFH)",
    department: "Customer support & BPO",
    shortDescription: "Help customers resolve queries via phone, email, and live chat. Work from the comfort of your home with a leading global brand.",
    fullDescription: "Eminence Sphere is hiring Entry-Level Customer Support Representatives for our remote work placement pipeline. In this role, you will act as the primary point of contact for customer queries, helping them troubleshoot technical issues, manage accounts, and process request closures with high efficiency.",
    requirements: "Excellent verbal & written communication in English, comfort with basic technology tools, previous customer service experience is a plus but entry-level candidates are welcome to apply.",
    salary: "₹18,000 - ₹25,000 per month",
    type: "Full-Time / Work From Home",
    postedAt: new Date().toISOString()
  },
  {
    title: "Senior Technical Support Specialist",
    department: "IT & Tech Support Services",
    shortDescription: "Solve complex technical hurdles, escalate network issues, and guide enterprise users through configuration pipelines.",
    fullDescription: "We are seeking a seasoned Tech Support Specialist to support global BPO clients. You will manage advanced tier-2 technical queries, coordinate troubleshooting pipelines, and maintain high standards of performance and resolution closure rates.",
    requirements: "Graduate in CS/IT or equivalent certification, 1-3 years of technical helpdesk experience, deep knowledge of systems hardware, troubleshooting, and networking parameters.",
    salary: "₹30,000 - ₹45,000 per month",
    type: "Full-Time / In-Office (Meerut)",
    postedAt: new Date().toISOString()
  },
  {
    title: "Telecalling & Sales Executive",
    department: "Telesales & Telecalling",
    shortDescription: "Drive customer engagement, follow up with potential leads, and support closures for non-IT consulting pipelines.",
    fullDescription: "Join a fast-growing recruitment and sales outreach setup. You will run out-bound calling campaigns to pitch services, schedule candidate screening interviews, and coordinate recruitment workflows.",
    requirements: "High energy levels, persuasive communication, bilingual fluency (Hindi & English), basic knowledge of spreadsheet operations.",
    salary: "₹15,000 - ₹22,000 per month + incentives",
    type: "Full-Time / In-Office (Rohta Road, Meerut)",
    postedAt: new Date().toISOString()
  }
];

async function seedJobs() {
  console.log("Connecting to Firestore database...");
  const jobsColl = collection(db, "jobs");
  
  // Clean up any existing sample jobs
  console.log("Cleaning up old job postings...");
  const oldJobs = await getDocs(jobsColl);
  for (const docSnap of oldJobs.docs) {
    await deleteDoc(docSnap.ref);
    console.log(`Deleted old job ID: ${docSnap.id}`);
  }
  
  // Insert new mock openings
  console.log("Seeding fresh jobs...");
  for (const job of sampleJobs) {
    const docRef = await addDoc(jobsColl, job);
    console.log(`Created Job: "${job.title}" with ID: ${docRef.id}`);
  }
  
  console.log("Jobs Seeding Complete!");
  process.exit(0);
}

seedJobs();
