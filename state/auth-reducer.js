import {call, put} from 'redux-saga/effects';
import {ChatErrors} from '../constants/Errors';
import firebase from 'firebase';

// actions
const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';
const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';

// saga actions
export const LOGIN_USER = 'LOGIN_USER';

const initError = {};
for (let key in ChatErrors.login) {
  initError[ChatErrors.login[key]] = '';
}

const initialState = {
  isLoggedIn: false,
  loginError: initError,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_LOGGED_IN:
      return {...state, isLoggedIn: action.payload.value};
    case SET_LOGIN_ERROR:
      return {
        ...state,
        loginError: {
          ...state.loginError,
          [action.payload.errorCode]: [action.payload.errorMessage],
        },
      };
    default:
      return state;
  }
};

// action creators
export const setIsLoggedIn = value => ({
  type: SET_IS_LOGGED_IN,
  payload: {
    value,
  },
});

export const setLoginError = (errorCode, errorMessage) => ({
  type: SET_LOGIN_ERROR,
  payload: {
    errorCode,
    errorMessage,
  },
});

//saga action
export const logInUser = (email, password, userName) => ({
  type: LOGIN_USER,
  payload: {
    email,
    password,
    userName,
  },
});
// saga
export function* logInUserWorkerSaga(action) {
  try {
    if (action.payload.userName.trim().length >= 3) {
      const auth = firebase.auth();
      const {user} = yield call(
        [auth, auth.createUserWithEmailAndPassword],
        action.payload.email,
        action.payload.password,
      );
      const b = yield user.updateProfile({
        displayName: action.payload.userName,
      });
      console.log(b);
      yield put(setIsLoggedIn(true));
    } else {
      yield put(
        setLoginError(
          ChatErrors.login.userNameError,
          'The user name must be at least 3 character',
        ),
      );
    }
  } catch (error) {
    yield put(setLoginError(error.code, error.message));
  }
}
