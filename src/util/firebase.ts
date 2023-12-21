import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgxKDPAok0dyHz6BrAJucEkZ2XPd7d21A",
  authDomain: "danika-website.firebaseapp.com",
  projectId: "danika-website",
  storageBucket: "danika-website.appspot.com",
  messagingSenderId: "1093617035068",
  appId: "1:1093617035068:web:bd8e176c3756ded87a2039"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
