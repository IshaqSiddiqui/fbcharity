// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,EmailAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUdt4SughGsAz0ubmgKlPTTiAqcqQYWWg",
  authDomain: "charity-fb-app.firebaseapp.com",
  projectId: "charity-fb-app",
  storageBucket: "charity-fb-app.appspot.com",
  messagingSenderId: "320786633000",
  appId: "1:320786633000:web:ff15984d86583b4cc8c01d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new EmailAuthProvider();
const db = getFirestore()

export {auth,provider,db};