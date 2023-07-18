// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlyGiR6RUPGLQoSdXjKz2ey3g2Q4HJvOo",
  authDomain: "react-app-f1e7f.firebaseapp.com",
  projectId: "react-app-f1e7f",
  storageBucket: "react-app-f1e7f.appspot.com",
  messagingSenderId: "949434588661",
  appId: "1:949434588661:web:4c09dcd6c6f1d909ef54bc",
  measurementId: "G-7R90MBECWD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider =  new GoogleAuthProvider()
const db = getFirestore(app)
export { auth , provider , db };
// const analytics = getAnalytics(app);