import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAsY__pBVBo2bIwK9J4ljsxGrDuBREYLoQ",
  authDomain: "timeproof-a543d.firebaseapp.com",
  projectId: "timeproof-a543d",
  storageBucket: "timeproof-a543d.firebasestorage.app",
  messagingSenderId: "912446043282",
  appId: "1:912446043282:web:17783eb5ee13acce80a24b",
  measurementId: "G-K32T1N5HKD",
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, storage };
