import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// Firebase configuration using Vite environment variables or defaults
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyApiKeyForQualityHubDefault123",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "new1-d2286.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "new1-d2286",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "new1-d2286.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "962427036602",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:962427036602:web:qualityhub123"
};

// Initialize Firebase
let app;
let db;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (error) {
  console.warn("Firebase initialization notice:", error.message);
}

/**
 * Save QA Service Request to Firebase Firestore (with LocalStorage fallback)
 */
export async function saveQARequest(requestData) {
  const payload = {
    ...requestData,
    createdAt: new Date().toISOString(),
    status: 'Pending Review'
  };

  // Always save to LocalStorage for offline resilience & immediate inspection
  try {
    const existing = JSON.parse(localStorage.getItem('qualityhub_requests') || '[]');
    existing.push(payload);
    localStorage.setItem('qualityhub_requests', JSON.stringify(existing));
  } catch (err) {
    console.error("LocalStorage save error:", err);
  }

  // Attempt Firebase Firestore insertion if database initialized
  if (db) {
    try {
      const docRef = await addDoc(collection(db, "qa_requests"), {
        ...requestData,
        timestamp: serverTimestamp(),
        status: 'Pending Review'
      });
      return { success: true, id: docRef.id };
    } catch (dbErr) {
      console.warn("Firestore save warning (fallback to local storage used):", dbErr.message);
    }
  }

  return { success: true, fallback: true };
}

export { db };
