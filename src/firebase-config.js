// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0TX195t9Ml7UMeeKSQ8Z-FlCMR4_J7hQ",
  authDomain: "kampfinal.firebaseapp.com",
  projectId: "kampfinal",
  storageBucket: "kampfinal.appspot.com",
  messagingSenderId: "847704949954",
  appId: "1:847704949954:web:caa5f30675a13df693675b",
  measurementId: "G-RLML0L3FEW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore(app);
export default app;
