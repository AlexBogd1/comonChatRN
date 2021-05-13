import {combineReducers, createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {takeEvery} from 'redux-saga/effects';
import {
  messageReducer,
  SEND_MESSAGE,
  GET_MESSAGES_FROM_FIREBASE,
  REMOVE_MESSAGE_FROM_FIREBASE,
  getMessagesWorkerSaga,
  removeMessageWorkerSaga,
  sendMessageWorkerSaga,
} from './message-reducer';
import {
  authReducer,
  signupUserWorkerSaga,
  loginUserWorkerSaga,
  LOGIN_USER,
  SIGNUP_USER,
} from './auth-reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  messages: messageReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootWatcher);

function* rootWatcher() {
  yield takeEvery(SIGNUP_USER, signupUserWorkerSaga);
  yield takeEvery(LOGIN_USER, loginUserWorkerSaga);
  yield takeEvery(SEND_MESSAGE, sendMessageWorkerSaga);
  yield takeEvery(GET_MESSAGES_FROM_FIREBASE, getMessagesWorkerSaga);
  yield takeEvery(REMOVE_MESSAGE_FROM_FIREBASE, removeMessageWorkerSaga);
}
