// ================================================================
// EMINENCE SPHERE — Firebase Configuration
// ================================================================

// Replace the values below with your official Firebase Project credentials.
// You can get this configuration in your Firebase Console:
// Settings icon (gear) -> Project settings -> Web Apps section.
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase if the SDK has loaded
if (typeof firebase !== 'undefined') {
  firebase.initializeApp(firebaseConfig);
  console.log("Firebase has been successfully initialized.");
} else {
  console.error("Firebase SDK not found. Please ensure script imports are correct.");
}
