import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCkPfraGpMKU92mejAjvS1tGinAeOQDI5g",
  authDomain: "eksaath-shopping-test.firebaseapp.com",
  databaseURL: "https://eksaath-shopping-test-default-rtdb.firebaseio.com",
  projectId: "eksaath-shopping-test",
  storageBucket: "eksaath-shopping-test.appspot.com",
  messagingSenderId: "1035252942363",
  appId: "1:1035252942363:web:6d87489a1d7f70bf705abe",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);
const auth = getAuth();
const fireStore = getFirestore();
const storage = getStorage(firebaseApp);

export { auth, db, storage };
