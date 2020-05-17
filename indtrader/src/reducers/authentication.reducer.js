import { authConstants } from '../constants';

let user = JSON.parse(localStorage.getItem('userDetails'));

const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
    switch (action.type) {
      case authConstants.LOGIN_REQUEST:
        return {
          currentAction: 'loggingIn',
          user: action.user
        };
      case authConstants.LOGIN_SUCCESS:
        return {
          currentAction: 'loggedIn',
          user: action.user
        };
      case authConstants.LOGIN_FAILURE:
        console.log("reducing to error");
        return {
            currentAction: 'errorOccured',
            user: action.user
          
        };
      case authConstants.LOGOUT:
        return {};
      default:
        return state
    }
  }