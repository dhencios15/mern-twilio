import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_NUMBER,
  GET_NUMBER_ERROR,
  ADD_CONTACT,
  SHOW_INBOX,
  SEND_MESSAGE,
  SEND_MESSAGE_FAILED,
} from './types';

// GET USERS CONTACT NUMBERS
export const getContactNumber = () => async (dispatch) => {
  try {
    const resNumber = await axios.get('/api/number/me');
    const resInbox = await axios.get('/api/inbox');
    dispatch({
      type: GET_NUMBER,
      payload: {
        number: resNumber.data,
        inbox: resInbox.data,
      },
    });
  } catch (err) {
    dispatch({
      type: GET_NUMBER_ERROR,
      payload: err.response.status,
    });
  }
};

export const addContactNumber = (newContact) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('/api/number', newContact, config);
    dispatch({
      type: ADD_CONTACT,
      payload: res.data,
    });
    dispatch(setAlert('New Contact Added', 'success'));
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: GET_NUMBER_ERROR,
      payload: {
        // msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const showInbox = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/inbox');
    dispatch({
      type: SHOW_INBOX,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_NUMBER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const sendMessage = (message) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/inbox', message, config);
    dispatch({
      type: SEND_MESSAGE,
      payload: res.data,
    });
    dispatch(setAlert('Message sent success', 'success'));
  } catch (err) {
    dispatch(setAlert('Message sent failed!', 'danger'));
    dispatch({
      type: SEND_MESSAGE_FAILED,
      payload: {
        msg: err.response.data,
      },
    });
  }
};
