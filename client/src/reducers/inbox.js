import { SHOW_INBOX, CLEAR_NUMBERS } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SHOW_INBOX:
      return [...state, ...payload];
    case CLEAR_NUMBERS:
      localStorage.removeItem('state');

      return null;
    default:
      return state;
  }
}
