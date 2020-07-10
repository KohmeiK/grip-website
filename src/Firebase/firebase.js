// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";
// firebase.initializeApp(firebaseConfig);
// export const auth = firebase.auth();
// export const firestore = firebase.firestore();

import app from 'firebase/app';

const config = {
  apiKey: "AIzaSyBI-HC_K_CzKsv7oTV1ERDNDN3PbkRt6cM",
  authDomain: "testing2-54b27.firebaseapp.com",
  databaseURL: "https://testing2-54b27.firebaseio.com",
  projectId: "testing2-54b27",
  storageBucket: "testing2-54b27.appspot.com",
  messagingSenderId: "377009151624",
  appId: "1:377009151624:web:e35b97eebabb8285d6493d",
  measurementId: "G-6ZMC5ZN1D5"
};

class Firebase {
  constructor() {
    this.bob = app.initializeApp(config);
  }
}
export default Firebase;

// let Firebase = app.initializeApp(config);
// export default Firebase;
