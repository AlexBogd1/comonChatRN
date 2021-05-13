import {call, put} from 'redux-saga/effects';
import {ChatErrors} from '../constants/Errors';
import firebase from 'firebase';

// actions
const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';
const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
const SET_SIGNUP_ERROR = 'SET_SIGNUP_ERROR';

// saga actions
export const LOGIN_USER = 'LOGIN_USER';
export const SIGNUP_USER = 'SIGNUP_USER';

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
    case SET_IS_LOGGED_IN:
      return {...state, isLoggedIn: action.payload.value};
    case SET_LOGIN_ERROR:
      return {
        ...state,
        loginError: {
          ...state.loginError,
          [action.payload.errorCode]: action.payload.errorMessage,
        },
      };
    case SET_SIGNUP_ERROR:
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

export const setSignupError = (errorCode, errorMessage) => ({
  type: SET_SIGNUP_ERROR,
  payload: {
    errorCode,
    errorMessage,
  },
});

//saga action creators
export const signUpUser = (email, password, userName) => ({
  type: SIGNUP_USER,
  payload: {
    email,
    password,
    userName,
  },
});

export const logInUser = (email, password, confirmedPassword) => ({
  type: LOGIN_USER,
  payload: {
    email,
    password,
    confirmedPassword,
  },
});

// saga logInUserWorkerSaga
export function* signupUserWorkerSaga(action) {
  const {userName, email, password} = action.payload;
  try {
    if (userName.trim().length >= 3) {
      const auth = firebase.auth();
      const {user} = yield call(
        [auth, auth.createUserWithEmailAndPassword],
        email,
        password,
      );
      yield user.updateProfile({
        displayName: userName,
      });
      yield put(setIsLoggedIn(true));
    } else {
      yield put(
        setSignupError(
          ChatErrors.signIn.userNameError,
          'The user name must be at least 3 character',
        ),
      );
    }
  } catch (error) {
    yield put(setSignupError(error.code, error.message));
  }
}

export function* loginUserWorkerSaga(action) {
  const {email, password, confirmedPassword} = action.payload;
  if (password === confirmedPassword) {
    try {
      const auth = firebase.auth();
      yield call([auth, auth.signInWithEmailAndPassword], email, password);
      yield put(setIsLoggedIn(true));
    } catch (error) {
      yield put(setLoginError(error.code, error.message));
    }
  } else {
    yield put(
      setLoginError(
        ChatErrors.login.wrongConfirmation,
        'Confirmation password not match',
      ),
    );
  }
}
