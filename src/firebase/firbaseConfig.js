// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSIojn9YztY_LkGqY0iE0WfMYmSjYTlGg",
  authDomain: "laundary-app-7d68e.firebaseapp.com",
  projectId: "laundary-app-7d68e",
  storageBucket: "laundary-app-7d68e.appspot.com",
  messagingSenderId: "818137279326",
  appId: "1:818137279326:web:3e00e4c062f5912d523dcf"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth();

const db = getFirestore();

export { auth, db };