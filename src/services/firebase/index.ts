import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_8ABxU84C_bXUDwnm_uUk351w7aTrBBA",
  authDomain: "toantam-b13e2.firebaseapp.com",
  databaseURL: "https://toantam-b13e2.firebaseio.com",
  projectId: "toantam-b13e2",
  storageBucket: "toantam-b13e2.appspot.com",
  messagingSenderId: "656429057871",
  appId: "1:656429057871:web:a7d28d8150de1adb42273a",
};
let dbApp: Firestore | null = null;
// Initialize Firebase
const initApp = () => {
  const app = initializeApp(firebaseConfig);
  dbApp = getFirestore(app);
};

const getApp = () => dbApp;
const firebaseService = {
  initApp,
  getApp,
};
export default firebaseService;
