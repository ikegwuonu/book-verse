// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnLWR0-9pty_RsexT6VSc117KirX3pO_A",
  authDomain: "book-verse-a8fc1.firebaseapp.com",
  projectId: "book-verse-a8fc1",
  storageBucket: "book-verse-a8fc1.firebasestorage.app",
  messagingSenderId: "434240705091",
  appId: "1:434240705091:web:d1c73531c8eb16d37abaf6",
  measurementId: "G-4YSZC9M8SE",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
