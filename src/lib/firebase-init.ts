import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import {
  getFirestore,
  setDoc,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
  collection,
  getCountFromServer,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  updateDoc,
  where,
} from "firebase/firestore";
import { getAuth, updatePassword } from "firebase/auth";

// Firebase config
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

// Conditionally initialize analytics
export const analyticsPromise = isSupported().then((supported) =>
  supported ? getAnalytics(app) : null
);

export const auth = getAuth(app);
export const db = getFirestore(app);
export {
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  getCountFromServer,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  deleteDoc,
  updateDoc,
  updatePassword,
  where,
};
