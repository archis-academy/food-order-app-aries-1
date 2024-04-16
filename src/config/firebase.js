// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzrEUh8fv55j_Y1CZ92qk4CvAutpmgaEE",
  authDomain: "food-order-aries.firebaseapp.com",
  projectId: "food-order-aries",
  storageBucket: "food-order-aries.appspot.com",
  messagingSenderId: "1030253546502",
  appId: "1:1030253546502:web:41f05974f075c08ed90787",
  measurementId: "G-ENY7M8DE7E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
