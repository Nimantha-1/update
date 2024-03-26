import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBsV1Y00IILFXeoecMLzHNlnIvfUCbYym8",
  authDomain: "ordermanagementsystem-c2013.firebaseapp.com",
  databaseURL: "https://ordermanagementsystem-c2013-default-rtdb.firebaseio.com",
  projectId: "ordermanagementsystem-c2013",
  storageBucket: "ordermanagementsystem-c2013.appspot.com",
  messagingSenderId: "752019954157",
  appId: "1:752019954157:web:4125d93dc44782384aefe4"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get authentication instance
const auth = getAuth(app);

// Get Firestore database instance
const database = getFirestore(app);

export { app, auth, database };
