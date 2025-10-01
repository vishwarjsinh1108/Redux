// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPvEwDYyUWiD7g3oHFKYF4h7ccPzHfbg4",
  authDomain: "redux-thunk-7aace.firebaseapp.com",
  databaseURL: "https://redux-thunk-7aace-default-rtdb.firebaseio.com", // ✅ ADD THIS LINE
  projectId: "redux-thunk-7aace",
  storageBucket: "redux-thunk-7aace.appspot.com", // ✅ fix ".app" → ".appspot.com"
  messagingSenderId: "754953809843",
  appId: "1:754953809843:web:39876fbed1ec9a062e65c6",
  measurementId: "G-HFLB16QEXZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;
