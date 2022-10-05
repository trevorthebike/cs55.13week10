// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmctoNIEbMiApK4PybBCXfJ8c0JMC4LKE",
  authDomain: "cs55-week7.firebaseapp.com",
  projectId: "cs55-week7",
  storageBucket: "cs55-week7.appspot.com",
  messagingSenderId: "259656884554",
  appId: "1:259656884554:web:d8e51b5c470f50aa5ea1b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//connect for auth
const auth = getAuth(app);

//conect for firestore db
const db = getFirestore(app);
export{auth,db}; 