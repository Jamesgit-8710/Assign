// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDJ4kvsec7XF8fiBgU_hxS7hkK7Vr0m2ks",
    authDomain: "shopcart-cffb6.firebaseapp.com",
    projectId: "shopcart-cffb6",
    storageBucket: "shopcart-cffb6.appspot.com",
    messagingSenderId: "106991382896",
    appId: "1:106991382896:web:f471c1882567351a56dfb5",
    measurementId: "G-GQKXJRPZ9P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
const storage = getStorage(app)
const db = getFirestore(app)
export { auth, provider, db , storage};
// const analytics = getAnalytics(app);