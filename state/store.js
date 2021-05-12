import {combineReducers, createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {takeEvery} from 'redux-saga/effects';
import {
  authReducer,
  logInUserWorkerSaga,
  signUpUserWorkerSaga,
  LOGIN_USER,
  SIGNUP_USER,
} from './auth-reducer';

const rootReducer = combineReducers({
  auth: authReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootWatcher);

function* rootWatcher() {
  yield takeEvery(LOGIN_USER, logInUserWorkerSaga);
  yield takeEvery(SIGNUP_USER, signUpUserWorkerSaga);
}
