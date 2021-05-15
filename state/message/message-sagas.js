// sagas
import {firestore} from '../../App';
import {call, put} from 'redux-saga/effects';
import {addMessage, deleteMessage, setMessages} from './message-actions';

export function* sendMessageWorkerSaga(action) {
  const {userId, userName, message} = action.payload;
  const messageTimeMark = new Date().getTime().toString();
  const newMessage = {
    id: messageTimeMark,
    UID: userId,
    userName: userName,
    text: message,
    time: +messageTimeMark,
  };
  const doc = firestore.collection('messages').doc(messageTimeMark);
  yield call([doc, doc.set], newMessage);
  yield put(addMessage(newMessage));
}

export function* removeMessageWorkerSaga(action) {
  const {messageId} = action.payload;
  try {
    const messageRef = firestore.collection('messages').doc(messageId);
    yield call([messageRef, messageRef.delete]);
    yield put(deleteMessage(messageId));
  } catch (error) {
    console.error('Error removing document: ', error);
  }
}

export function* getMessagesWorkerSaga() {
  try {
    const messageRef = firestore.collection('messages');
    const snapshot = yield call([messageRef, messageRef.get]);
    let messages = [];
    snapshot.forEach(doc => {
      messages = [...messages, doc.data()];
    });
    yield put(setMessages(messages));
  } catch (error) {
    console.log(error);
  }
}
