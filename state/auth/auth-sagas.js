import firebase from 'firebase';
import {call, put} from 'redux-saga/effects';
import {setIsLoggedIn, setLoginError, setSignupError} from './auth-actions';
import {ChatErrors} from '../../constants/Errors';

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
