export const AUTH_ACTIONS = {
  REDUCER_ACTIONS: {
    SET_IS_LOGGED_IN: 'SET_IS_LOGGED_IN',
    SET_LOGIN_ERROR: 'SET_LOGIN_ERROR',
    SET_SIGNUP_ERROR: 'SET_SIGNUP_ERROR',
  },
  SAGA_ACTIONS: {
    LOGIN_USER: 'LOGIN_USER',
    SIGNUP_USER: 'SIGNUP_USER',
  },
};

// action creators
export const setIsLoggedIn = value => ({
  type: AUTH_ACTIONS.REDUCER_ACTIONS.SET_IS_LOGGED_IN,
  payload: {
    value,
  },
});

export const setLoginError = (errorCode, errorMessage) => ({
  type: AUTH_ACTIONS.REDUCER_ACTIONS.SET_LOGIN_ERROR,
  payload: {
    errorCode,
    errorMessage,
  },
});

export const setSignupError = (errorCode, errorMessage) => ({
  type: AUTH_ACTIONS.REDUCER_ACTIONS.SET_SIGNUP_ERROR,
  payload: {
    errorCode,
    errorMessage,
  },
});

//saga action creators
export const signUpUser = (email, password, userName) => ({
  type: AUTH_ACTIONS.SAGA_ACTIONS.SIGNUP_USER,
  payload: {
    email,
    password,
    userName,
  },
});

export const logInUser = (email, password, confirmedPassword) => ({
  type: AUTH_ACTIONS.SAGA_ACTIONS.LOGIN_USER,
  payload: {
    email,
    password,
    confirmedPassword,
  },
});
