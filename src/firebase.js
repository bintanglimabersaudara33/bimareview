import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdU8BQLMRDtXBakvhUbuYxOfiyGLaBhX4",
  authDomain: "bimareview.firebaseapp.com",
  projectId: "bimareview",
  storageBucket: "bimareview.firebasestorage.app",
  messagingSenderId: "898559933856",
  appId: "1:898559933856:web:5e281612bcecafed6bf8c5"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);