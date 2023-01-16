// Import the functions you need from the SDKs you need

import { getFirestore } from 'firebase/firestore'
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "realtor-project-3cde7.firebaseapp.com",
  projectId: "realtor-project-3cde7",
  storageBucket: "realtor-project-3cde7.appspot.com",
  messagingSenderId: "123758342161",
  appId: "1:123758342161:web:99890d9f594ed189cc41b0"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore()