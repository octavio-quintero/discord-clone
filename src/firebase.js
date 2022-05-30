// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyBxufqryEBnPVx7Oakuvx7_zJXOGwWixIo",

  authDomain: "discord-clone-677bb.firebaseapp.com",

  projectId: "discord-clone-677bb",

  storageBucket: "discord-clone-677bb.appspot.com",

  messagingSenderId: "802780971497",

  appId: "1:802780971497:web:d924d67e56d53f67ef0b78"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export {auth, provider, signInWithPopup, db}