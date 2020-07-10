import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import TestPage from "./TestPage"
import Firebase, { FirebaseContext } from './Firebase/index.js';

ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={Firebase}>
      <TestPage />
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.querySelector('#root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
