import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration using environment variables with reliable fallbacks
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDwnUtVuWhW3y7A4tebnqrg0AikSU2F6UE",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ip-clothing-6bf01.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ip-clothing-6bf01",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ip-clothing-6bf01.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "817197342324",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:817197342324:web:45f365d67c82f53e637b21",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-V4Y1PN34JY"
};

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);

// Initialize core Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics conditionally (safeguards against SSR / unsupported browsers)
export let analytics = null;
if (typeof window !== 'undefined') {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
        console.log('✅ Firebase Analytics initialized');
      }
    })
    .catch((err) => {
      console.warn('Firebase Analytics is not supported in this environment:', err);
    });
}

export default app;
