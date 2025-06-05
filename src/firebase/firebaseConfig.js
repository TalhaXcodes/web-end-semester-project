import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc,
  FieldValue,
  deleteField
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBWCEvbepDZtpJiik1cLnkArhfYBBBQlfg",
  authDomain: "basketries-semester-project.firebaseapp.com",
  projectId: "basketries-semester-project",
  storageBucket: "basketries-semester-project.firebasestorage.app",
  messagingSenderId: "1075776668043",
  appId: "1:1075776668043:web:603c1aac7bc6449d12ef8e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export default app;
export { auth, db };
