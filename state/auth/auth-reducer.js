import {call, put} from 'redux-saga/effects';
import {ChatErrors} from '../../constants/Errors';
import {AUTH_ACTIONS} from './auth-actions';

const initLoginError = {};
for (let key in ChatErrors.login) {
  initLoginError[ChatErrors.login[key]] = '';
}

const initSignupError = {};
for (let key in ChatErrors.signIn) {
  initSignupError[ChatErrors.signIn[key]] = '';
}

const initialState = {
  isLoggedIn: false,
  loginError: initLoginError,
  signupError: initSignupError,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.REDUCER_ACTIONS.SET_IS_LOGGED_IN:
      return {...state, isLoggedIn: action.payload.value};
    case AUTH_ACTIONS.REDUCER_ACTIONS.SET_LOGIN_ERROR:
      return {
        ...state,
        loginError: {
          ...state.loginError,
          [action.payload.errorCode]: action.payload.errorMessage,
        },
      };
    case AUTH_ACTIONS.REDUCER_ACTIONS.SET_SIGNUP_ERROR:
      return {
        ...state,
        signupError: {
          ...state.signupError,
          [action.payload.errorCode]: action.payload.errorMessage,
        },
      };
    default:
      return state;
  }
};
