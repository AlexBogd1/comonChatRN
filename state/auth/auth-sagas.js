import firebase from 'firebase';
import {call, put} from 'redux-saga/effects';
import {setIsLoggedIn, setLoginError, setSignupError} from './auth-actions';
import {ChatErrors} from '../../constants/Errors';

export function* signupUserWorkerSaga(action) {
  const {userName, email, password, confirmPassword} = action.payload;
  if (password === confirmPassword) {
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
        console.log(ChatErrors.signIn.userNameError);
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
  } else {
    console.log(ChatErrors.signIn.wrongConfirmation);
    yield put(
      setSignupError(
        ChatErrors.signIn.wrongConfirmation,
        'Confirmation password not match',
      ),
    );
  }
}

export function* loginUserWorkerSaga(action) {
  const {email, password} = action.payload;
  try {
    const auth = firebase.auth();
    yield call([auth, auth.signInWithEmailAndPassword], email, password);
    yield put(setIsLoggedIn(true));
  } catch (error) {
    yield put(setLoginError(error.code, error.message));
  }
}
