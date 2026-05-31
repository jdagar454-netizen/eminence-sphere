import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

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

createUserWithEmailAndPassword(auth, "nikul240601@gmail.com", "9568@Nikita")
  .then((userCredential) => {
    console.log("SUCCESS: Created user successfully! " + userCredential.user.email);
    process.exit(0);
  })
  .catch((error) => {
    console.error("ERROR: Failed to create user: " + error.code + " - " + error.message);
    process.exit(1);
  });
