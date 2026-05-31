import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, orderBy, query, limit } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBmyZ6JLVJj0EjgXFTGOShK-d7uK3yo8ww",
  authDomain: "team-eminence.firebaseapp.com",
  projectId: "team-eminence",
  storageBucket: "team-eminence.firebasestorage.app",
  messagingSenderId: "1045226217031",
  appId: "1:1045226217031:web:8ab538893f0b0b19c39b62",
  measurementId: "G-SK2H0EB65Q"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const q = query(collection(db, "candidates"), orderBy("submittedAt", "desc"), limit(1));

getDocs(q)
  .then((snapshot) => {
    if (snapshot.empty) {
      console.log("No candidates found in database.");
    } else {
      const latest = snapshot.docs[0].data();
      console.log("LATEST_CANDIDATE: " + JSON.stringify(latest, null, 2));
    }
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error reading database:", err);
    process.exit(1);
  });
