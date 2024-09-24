// src/firebase/firestoreService.js
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore();
const auth = getAuth();

export const getUserAccount = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const userDoc = doc(db, "users", user.uid);
  const userData = await getDoc(userDoc);
  return userData.exists() ? userData.data() : null;
};

export const updateUserAccount = async (accountData) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const userDoc = doc(db, "users", user.uid);
  await setDoc(userDoc, accountData, { merge: true });
};
