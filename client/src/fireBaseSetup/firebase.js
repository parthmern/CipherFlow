//======================
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCkp2mizBGWq1GNXf6fEvIjt7YuNr0nuvc",
  authDomain: "cipherflow-d5398.firebaseapp.com",
  projectId: "cipherflow-d5398",
  storageBucket: "cipherflow-d5398.appspot.com",
  messagingSenderId: "564128113048",
  appId: "1:564128113048:web:2f5808458081ec26a24bed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)


