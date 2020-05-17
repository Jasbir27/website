import {authConstants} from '../constants';

import * as firebase from 'firebase';

import { history } from '../helper';

export const LOGIN_SUCCESS='LOGIN_SUCCESS';
export const LOGIN_ERROR='LOGIN_ERROR';

export const LOGIN='LOGIN';



export const authActions = {
    login
};

 function login(username,password){

    return dispatch => {
        dispatch(request({ username }));

        
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(function() {
            // Existing and future Auth states are now persisted in the current
            // session only. Closing the window would clear any existing state even
            // if a user forgets to sign out.
            // ...
            // New sign-in will be persisted with session persistence.
    

            firebase.auth().signInWithEmailAndPassword(username,password)
            .catch(e => 
                   dispatch( error(e.message)))
            .then(result => {
                var user = firebase.auth().currentUser;
                if (user)
                {
                    history.push("/home");
                    console.log("here it is "+user.email);
                    dispatch(success(user)); 
                    
                }
            });

  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("errorMessage "+errorMessage);
  });
  
  
}

function request(user) { return { type: authConstants.LOGIN_REQUEST, user } }
function success(user) { return { type: authConstants.LOGIN_SUCCESS, user } }
function error(user) { 
    console.log("in error block ") ; 
    return { type: authConstants.LOGIN_FAILURE, user } }

 }

// export const login_func = () => {
//     dispatch({
//         type:LOGIN,
//         payload:'login successfully'
//     });
// }