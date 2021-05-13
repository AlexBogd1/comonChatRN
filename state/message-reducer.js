import {call, put} from 'redux-saga/effects';
import firebase from 'firebase';
import {firestore} from '../App';

// actions
const ADD_MESSAGE = 'ADD_MESSAGE';
const DELETE_MESSAGE = 'DELETE_MESSAGE';
const SET_MESSAGES = 'SET_MESSAGES';

// saga actions
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const GET_MESSAGES_FROM_FIREBASE = 'GET_MESSAGES_FROM_FIREBASE';
export const REMOVE_MESSAGE_FROM_FIREBASE = 'REMOVE_MESSAGE_FROM_FIREBASE';

const initialState = {
  messages: [],
};

export const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGES:
      return {
        ...state,
        messages: [...action.payload.messages],
      };
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload.message],
      };
    case DELETE_MESSAGE:
      console.log('Return4', action);
      return {
        ...state,
        messages: state.messages.filter(
          message => message.id != action.payload.messageId,
        ),
      };
    default:
      return state;
  }
};

// action creators
const addMessage = message => ({
  type: ADD_MESSAGE,
  payload: {
    message,
  },
});

const deleteMessage = messageId => ({
  type: DELETE_MESSAGE,
  payload: {
    messageId,
  },
});

const setMessages = messages => ({
  type: SET_MESSAGES,
  payload: {
    messages,
  },
});

//saga action creators
export const sendNewMessage = (userId, userName, message) => ({
  type: SEND_MESSAGE,
  payload: {
    userId,
    userName,
    message,
  },
});

export const removeMessage = messageId => ({
  type: REMOVE_MESSAGE_FROM_FIREBASE,
  payload: {
    messageId,
  },
});

export const getMessagesFromFirebase = () => ({
  type: GET_MESSAGES_FROM_FIREBASE,
});

// saga
export function* sendMessageWorkerSaga(action) {
  const {userId, userName, message} = action.payload;
  const messageTimeMark = new Date().getTime().toString();
  const newMessage = {
    id: messageTimeMark,
    UID: userId,
    userName: userName,
    text: message,
    time: messageTimeMark,
  };
  const doc = firestore.collection('messages').doc(messageTimeMark);
  yield call([doc, doc.set], newMessage);
  yield put(addMessage(newMessage));
}

export function* removeMessageWorkerSaga(action) {
  const {messageId} = action.payload;
  console.log('Remove2', messageId);
  try {
    const messageRef = firestore.collection('messages').doc(messageId);
    yield call([messageRef, messageRef.delete]);
    console.log('Remove3', messageId);
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
