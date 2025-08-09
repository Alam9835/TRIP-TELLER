// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore" 



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgOlYHSj4ZuJDzjQz1w7u-fJCTcLgBYK0",
  authDomain: "travel-62fb2.firebaseapp.com",
  projectId: "travel-62fb2",
  storageBucket: "travel-62fb2.firebasestorage.app",
  messagingSenderId: "888232437870",
  appId: "1:888232437870:web:23aa51e04415594ed31e7f",
  measurementId: "G-N4L2XQXT58"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
// const analytics = getAnalytics(app);

