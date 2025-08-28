// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDFjFFanoTtZ14U1fweYBPXRdFvBM0VH7s",
    authDomain: "university-project-491ab.firebaseapp.com",
    databaseURL: "https://university-project-491ab-default-rtdb.firebaseio.com",
    projectId: "university-project-491ab",
    storageBucket: "university-project-491ab.appspot.com",
    messagingSenderId: "340655148663",
    appId: "1:340655148663:web:87134f28dd86e61f538072"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
