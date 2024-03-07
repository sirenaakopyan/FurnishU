import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEtk9vQlzGhlkrFEu40Ta2X4FkfPdCoEk",
  authDomain: "info-442-e7337.firebaseapp.com",
  projectId: "info-442-e7337",
  storageBucket: "info-442-e7337.appspot.com",
  messagingSenderId: "473881955858",
  appId: "1:473881955858:web:002a6822c0d7b2824ed2cb"
};

// initialize firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

/*
// Function to fetch listings from Firebase
const fetchListingsFromFirebase = async () => {
  const listingsRef = ref(database, 'listings');
  const snapshot = await get(listingsRef);
  const listings = [];

  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      listings.push(childSnapshot.val());
    });
  }

  return listings;
};
export { fetchListingsFromFirebase, database }; */
export { database };
export default app;