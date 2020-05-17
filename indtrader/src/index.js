import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import * as serviceWorker from './serviceWorker';


import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import Popper from 'popper.js';

import './assets/styles/custom.css';
// import './assets/styles/font-awesome.min.css';
// import './assets/styles/all.css';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers';
import firebase from 'firebase';
import {FirebaseAuth} from 'firebase';



require('dotenv').config()

const store = createStore(rootReducer, {}, applyMiddleware(reduxThunk));

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var userDetails={
      email:user.email,
      displayName:user.displayName,
      photoURL:user.photoURL,
      userId:user.uid,
      phoneNumber:user.phoneNumber,
      email:user.email
    }
    
    console.log("user is logged in "+JSON.stringify(userDetails));
    console.log('phone - '+user.phoneNumber);
    console.log('cred '+firebase.auth().AuthCredential );

    let temp=localStorage.getItem('userDetails');
    console.log('prev it was '+temp);
    localStorage.setItem('userDetails',JSON.stringify(userDetails));
  } else {
    // No user is signed in.
    console.log("user is not logged in");
    localStorage.removeItem('userDetails');
  }
});


ReactDOM.render(

  <Provider store={store}>
  <React.StrictMode>
<App />

    
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
