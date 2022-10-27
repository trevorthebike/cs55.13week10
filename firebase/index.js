// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmctoNIEbMiApK4PybBCXfJ8c0JMC4LKE",
  //apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "cs55-week7.firebaseapp.com",
  projectId: "cs55-week7",
  storageBucket: "cs55-week7.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

//let apiKey = "AIzaSyCmctoNIEbMiApK4PybBCXfJ8c0JMC4LKE";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//connect for auth
const auth = getAuth(app);

//conect for firestore db
const db = getFirestore(app);
export{auth,db}; 