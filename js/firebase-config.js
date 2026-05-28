// ================================================================
// EMINENCE SPHERE — Firebase Configuration
// ================================================================

// Replace the values below with your official Firebase Project credentials.
// You can get this configuration in your Firebase Console:
// Settings icon (gear) -> Project settings -> Web Apps section.
const firebaseConfig = {
  apiKey: "AIzaSyBmyZ6JLVJj0EjgXFTGOSHK-d7uK3yo8ww",
  authDomain: "team-eminence.firebaseapp.com",
  projectId: "team-eminence",
  storageBucket: "team-eminence.firebasestorage.app",
  messagingSenderId: "1045226217031",
  appId: "1:1045226217031:web:8ab538893f0b0b19c39b62",
  measurementId: "G-SK2H0EB65Q"
};

// Initialize Firebase if the SDK has loaded
if (typeof firebase !== 'undefined') {
  firebase.initializeApp(firebaseConfig);
  console.log("Firebase has been successfully initialized.");
} else {
  console.error("Firebase SDK not found. Please ensure script imports are correct.");
}
