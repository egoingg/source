import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyAPWUnG0gJSc0EsapJ4dmHW5jQiVLF_v7w",
  authDomain: "blog-8d613.firebaseapp.com",
  projectId: "blog-8d613",
  storageBucket: "blog-8d613.appspot.com",
  messagingSenderId: "187570475616",
  appId: "1:187570475616:web:de6703ee7489b17fcea905",
  measurementId: "G-VYPCYLV092"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
export {db , storage, auth}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

