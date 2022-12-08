// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8NCYKXC09MwrN5AEW1I_DXVV2VdK1X0k",
  authDomain: "hospitalmanagement-696e4.firebaseapp.com",
  databaseURL: "https://hospitalmanagement-696e4-default-rtdb.firebaseio.com",
  projectId: "hospitalmanagement-696e4",
  storageBucket: "hospitalmanagement-696e4.appspot.com",
  messagingSenderId: "865992225637",
  appId: "1:865992225637:web:232288ba315785fa41278c",
  measurementId: "G-ZX98B2M4Z7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
