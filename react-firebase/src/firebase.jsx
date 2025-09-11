// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOwPGv8h_K1pfvMnS2pUc1e1IS4JQ1rnI",
  authDomain: "react-projects-9a6a7.firebaseapp.com",
  projectId: "react-projects-9a6a7",
  storageBucket: "react-projects-9a6a7.firebasestorage.app",
  messagingSenderId: "577086453028",
  appId: "1:577086453028:web:f1daa201040a3e42e22fb1",
  measurementId: "G-ZRTE9VENSZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db= getDatabase(app);

export default db;