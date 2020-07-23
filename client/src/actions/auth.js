import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_NUMBERS,
} from './types';
import setAuthToken from '../utils/setAuthToken';
import { getContactNumber } from './number';

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// REGISTER USER
export const registers = (newUser) => async (dispatch) => {
  const config = {
    header: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/users', newUser, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(setAlert('Register Success', 'success'));
    dispatch(loadUser());
    dispatch(getContactNumber());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// LOGIN USER
export const login = (loginUser) => async (dispatch) => {
  const config = {
    header: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/auth', loginUser, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(setAlert('Login Success', 'success'));
    dispatch(loadUser());
    dispatch(getContactNumber());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// LOGOUT USER
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_NUMBERS });
  dispatch({ type: LOGOUT });
};
