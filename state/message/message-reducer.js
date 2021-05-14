import {MESSAGE_ACTIONS} from './message-actions';

const initialState = {
  messages: [],
};

export const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE_ACTIONS.REDUCER_ACTIONS.SET_MESSAGES:
      return {
        ...state,
        messages: [...action.payload.messages],
      };
    case MESSAGE_ACTIONS.REDUCER_ACTIONS.ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload.message],
      };
    case MESSAGE_ACTIONS.REDUCER_ACTIONS.DELETE_MESSAGE:
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
