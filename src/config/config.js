import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCZKn_rWYryjaa5b9e5GLb6YRLT7Sg4gro",
  authDomain: "skaath-app.firebaseapp.com",
  databaseURL: "https://skaath-app-default-rtdb.firebaseio.com/",
  projectId: "skaath-app",
  storageBucket: "skaath-app.appspot.com",
  messagingSenderId: "768906889888",
  appId: "1:768906889888:web:0a14ac36caf315f876d7c5",
  measurementId: "G-M6NQ6W6XQZ",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);
const auth = getAuth();
const fireStore = getFirestore();
const storage = getStorage(firebaseApp);

export { auth, db, storage };
