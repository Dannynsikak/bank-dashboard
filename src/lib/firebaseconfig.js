// src/firestoreConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const db = getFirestore(app); // Initialize Firestore

// Firestore service functions
export const getUserAccount = async (uid) => {
  console.log("fetching user account with UID:", uid);
  const userDoc = doc(db, "user", uid);
  const userData = await getDoc(userDoc);
  console.log("User data exists:", userData.exists());
  return userData.exists() ? userData.data() : null;
};

export const updateUserAccount = async (uid, accountData) => {
  console.log("Updating user account with UID:", uid);
  const userDoc = doc(db, "user", uid);
  await setDoc(userDoc, accountData, { merge: true });
  console.log("Updated user account:", accountData);
};
