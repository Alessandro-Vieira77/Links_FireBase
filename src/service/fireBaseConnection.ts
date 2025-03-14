import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB6ZNo1H9pRMKF_yF0-bk1xxdiLM5s8-KE",
  authDomain: "reactlinks-91b21.firebaseapp.com",
  projectId: "reactlinks-91b21",
  storageBucket: "reactlinks-91b21.firebasestorage.app",
  messagingSenderId: "921302935255",
  appId: "1:921302935255:web:2446deb8b359c62cf6b292",
  measurementId: "G-KQCTGM4R6C",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
