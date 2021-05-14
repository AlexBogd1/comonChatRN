export const MESSAGE_ACTIONS = {
  REDUCER_ACTIONS: {
    ADD_MESSAGE: 'ADD_MESSAGE',
    DELETE_MESSAGE: 'DELETE_MESSAGE',
    SET_MESSAGES: 'SET_MESSAGES',
  },
  SAGA_ACTIONS: {
    SEND_MESSAGE: 'SEND_MESSAGE',
    GET_MESSAGES_FROM_FIREBASE: 'GET_MESSAGES_FROM_FIREBASE',
    REMOVE_MESSAGE_FROM_FIREBASE: 'REMOVE_MESSAGE_FROM_FIREBASE',
  },
};

// action creators
export const addMessage = message => ({
  type: MESSAGE_ACTIONS.REDUCER_ACTIONS.ADD_MESSAGE,
  payload: {
    message,
  },
});

export const deleteMessage = messageId => ({
  type: MESSAGE_ACTIONS.REDUCER_ACTIONS.DELETE_MESSAGE,
  payload: {
    messageId,
  },
});

export const setMessages = messages => ({
  type: MESSAGE_ACTIONS.REDUCER_ACTIONS.SET_MESSAGES,
  payload: {
    messages,
  },
});

//saga action creators
export const sendNewMessage = (userId, userName, message) => ({
  type: MESSAGE_ACTIONS.SAGA_ACTIONS.SEND_MESSAGE,
  payload: {
    userId,
    userName,
    message,
  },
});

export const removeMessage = messageId => ({
  type: MESSAGE_ACTIONS.SAGA_ACTIONS.REMOVE_MESSAGE_FROM_FIREBASE,
  payload: {
    messageId,
  },
});

export const getMessagesFromFirebase = () => ({
  type: MESSAGE_ACTIONS.SAGA_ACTIONS.GET_MESSAGES_FROM_FIREBASE,
});
