import { initializeApp } from 'firebase/app';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

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
const auth = getAuth(app);

sendPasswordResetEmail(auth, "nikul240601@gmail.com")
  .then(() => {
    console.log("SUCCESS: Password reset email sent successfully to nikul240601@gmail.com");
    process.exit(0);
  })
  .catch((error) => {
    console.error("ERROR: Failed to send password reset email:", error.code, error.message);
    process.exit(1);
  });
