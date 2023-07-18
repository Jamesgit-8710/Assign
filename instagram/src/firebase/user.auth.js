// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTTd7Lu3eRoI4JAY_XdMrFekde1fWo5xc",
  authDomain: "insta-e6c58.firebaseapp.com",
  projectId: "insta-e6c58",
  storageBucket: "insta-e6c58.appspot.com",
  messagingSenderId: "43458499847",
  appId: "1:43458499847:web:de4f51c8e51ae656bd21a2",
  measurementId: "G-XK9EZH1WE0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app)
const db = getFirestore(app);
export { auth, provider, db, storage };
