import {createSelector} from 'reselect';

const getIsLoggedIn = state => {
  return state.auth.isLoggedIn;
};
const getLoginError = state => {
  return state.auth.loginError;
};
const getSignupError = state => {
  return state.auth.signupError;
};

const getMessages = state => {
  return state.usersMessages.messages;
};

export const getMessagesSelector = createSelector(getMessages, messages => {
  return messages.sort((firstMess, secMess) => firstMess.time - secMess.time);
});
export const loginSelector = createSelector(
  getIsLoggedIn,
  getLoginError,
  (isLoggedIn, loginError) => {
    return {isLoggedIn, loginError};
  },
);
export const signupSelector = createSelector(
  getIsLoggedIn,
  getSignupError,
  (isLoggedIn, signupError) => {
    return {isLoggedIn, signupError};
  },
);
