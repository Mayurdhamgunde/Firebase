// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7_-yaItdXXwgxryJ48DleKd_izoeyeL0",
  authDomain: "fir-reactjs-763f0.firebaseapp.com",
  projectId: "fir-reactjs-763f0",
  storageBucket: "fir-reactjs-763f0.appspot.com",
  messagingSenderId: "742036549294",
  appId: "1:742036549294:web:e33757b935c44b2f64c73f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);