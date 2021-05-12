import {combineReducers, createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {takeEvery} from 'redux-saga/effects';
import {authReducer, logInUserWorkerSaga, LOGIN_USER} from './auth-reducer';

const rootReducer = combineReducers({
  auth: authReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootWatcher);

function* rootWatcher() {
  yield takeEvery(LOGIN_USER, logInUserWorkerSaga);
}
