// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "next-blog-a2831.firebaseapp.com",
  projectId: "next-blog-a2831",
  storageBucket: "next-blog-a2831.firebasestorage.app",
  messagingSenderId: "1011967402417",
  appId: "1:1011967402417:web:71bf6cdc5096d9e7945d90"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);