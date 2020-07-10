import firebase from 'firebase'
// import firebase from 'firebase/app';

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
var fire = firebase.initializeApp(config);
export default fire;
