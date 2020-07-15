import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import Login from "./Login"
import FirebaseContext, {Firebase} from './Firebase/index.js';
import {AuthProvider} from './Firebase/AuthContext';

ReactDOM.render(
  <React.StrictMode>
      <FirebaseContext.Provider value={Firebase}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </FirebaseContext.Provider>
  </React.StrictMode>,
  document.querySelector('#root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
