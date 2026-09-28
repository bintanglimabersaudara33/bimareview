// Import fungsi yang dibutuhkan dari SDK Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // <-- Ini yang kurang sebelumnya

// Konfigurasi web app Firebase Anda
const firebaseConfig = {
  apiKey: "AIzaSyCdU8BQLMRDtXBakvhUbuYxOfiyGLaBhX4",
  authDomain: "bimareview.firebaseapp.com",
  projectId: "bimareview",
  storageBucket: "bimareview.firebasestorage.app",
  messagingSenderId: "898559933856",
  appId: "1:898559933856:web:5e281612bcecafed6bf8c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inisialisasi Firestore dan EKSPOR variabel "db" agar bisa dibaca oleh halaman lain
export const db = getFirestore(app);