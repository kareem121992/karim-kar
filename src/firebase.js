import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBlqoenjBwViZ0AcMkF_3G3SzUr3j-l28I",
  authDomain: "security-3a07e.firebaseapp.com",
  projectId: "security-3a07e",
  storageBucket: "security-3a07e.firebasestorage.app",
  messagingSenderId: "350554807786",
  appId: "1:350554807786:web:5e420a5e077018b3c16693",
  measurementId: "G-93FE3X4PJD",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// ---- Auth helpers ----
export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function logIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logOut() {
  return signOut(auth);
}

export function watchAuth(callback) {
  return onAuthStateChanged(auth, callback);
}

// ---- Firestore helpers: one document per user, all progress combined ----
export async function loadProfile(uid) {
  const ref = doc(db, "profiles", uid);
  const snap = await getDoc(ref);
  if (snap.exists()) return snap.data();
  return null;
}

export async function saveProfile(uid, data) {
  const ref = doc(db, "profiles", uid);
  await setDoc(ref, data, { merge: true });
}
