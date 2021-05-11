import { call } from 'redux-saga/effects';
import { ChatErrors } from '../constants/Errors';
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
            return { ...state, isLoggedIn: action.payload.value };
        case SET_LOGIN_ERROR:
            return {
                ...state,
                loginError: {
                    ...state.loginError,
                    [action.payload.errorCode]: [action.payload.errorMessage]
                }
            }
        default:
            return state;
    }
};

// action creators
const setIsLoggedIn = (value) => ({
    type: SET_IS_LOGGED_IN,
    payload: {
        value,
    },
});

const setLogginError = (errorCode, errorMessage) => ({
    type: SET_IS_LOGGED_IN,
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
    }
});
// saga 
export function* logInUserWorkerSaga(action) {
    try {
        if (action.payload.userName.trim().length >= 3) {
            const auth = firebase.auth();
            const { user } = yield call([auth, auth.createUserWithEmailAndPassword], action.payload.email, action.payload.password);
            user.displayName = action.payload.userName;
        } else {
            setLogginError(ChatErrors.login.userNameError, 'The user name must be at least 3 character');
        }
    } catch (error) {
        console.log(error.code);
        console.log(error.message);
        setLogginError(error.code, error.message);
    }
};