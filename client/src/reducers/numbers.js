import {
  GET_NUMBER,
  CLEAR_NUMBERS,
  ADD_CONTACT,
  GET_NUMBER_ERROR,
  SEND_MESSAGE_FAILED,
} from '../actions/types';

const initialState = {
  numbers: [],
  inbox: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_NUMBER:
      return {
        ...state,
        numbers: payload.number,
        inbox: payload.inbox,
        loading: false,
      };
    case GET_NUMBER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case ADD_CONTACT:
      return {
        ...state,
        numbers: [...state.numbers, payload],
      };
    case SEND_MESSAGE_FAILED:
      return {
        ...state,
        error: payload,
      };
    case CLEAR_NUMBERS:
      localStorage.removeItem('state');
      return {
        ...state,
        numbers: [],
        inbox: [],
        loading: true,
        error: {},
      };
    default:
      return state;
  }
}
