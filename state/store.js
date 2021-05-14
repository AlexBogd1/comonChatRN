import {combineReducers, createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {takeEvery} from 'redux-saga/effects';
import {messageReducer} from './message/message-reducer';
import {authReducer} from './auth/auth-reducer';
import {AUTH_ACTIONS} from './auth/auth-actions';
import {MESSAGE_ACTIONS} from './message/message-actions';
import {
  getMessagesWorkerSaga,
  removeMessageWorkerSaga,
  sendMessageWorkerSaga,
} from './message/message-sagas';
import {loginUserWorkerSaga, signupUserWorkerSaga} from './auth/auth-sagas';

const rootReducer = combineReducers({
  auth: authReducer,
  messages: messageReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootWatcher);

function* rootWatcher() {
  yield takeEvery(AUTH_ACTIONS.SAGA_ACTIONS.SIGNUP_USER, signupUserWorkerSaga);
  yield takeEvery(AUTH_ACTIONS.SAGA_ACTIONS.LOGIN_USER, loginUserWorkerSaga);
  yield takeEvery(
    MESSAGE_ACTIONS.SAGA_ACTIONS.SEND_MESSAGE,
    sendMessageWorkerSaga,
  );
  yield takeEvery(
    MESSAGE_ACTIONS.SAGA_ACTIONS.GET_MESSAGES_FROM_FIREBASE,
    getMessagesWorkerSaga,
  );
  yield takeEvery(
    MESSAGE_ACTIONS.SAGA_ACTIONS.REMOVE_MESSAGE_FROM_FIREBASE,
    removeMessageWorkerSaga,
  );
}
