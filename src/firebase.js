import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBQoPY-BIqOnEcI_h1WM1bcuGXCWyIowKs",
  authDomain: "instagram-clone-ff481.firebaseapp.com",
  projectId: "instagram-clone-ff481",
  storageBucket: "instagram-clone-ff481.appspot.com",
  messagingSenderId: "333893176602",
  appId: "1:333893176602:web:b21ab1c09413773f4d30a3",
  measurementId: "G-WCV905NF3B",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
