// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEV1G7tbyOLb7u9qpdQMxbEZ7MNqx_fkY",
  authDomain: "veggie-1.firebaseapp.com",
  projectId: "veggie-1",
  storageBucket: "veggie-1.firebasestorage.app",
  messagingSenderId: "533795562411",
  appId: "1:533795562411:web:1422a12f7c47477cdee8ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;