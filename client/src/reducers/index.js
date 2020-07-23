import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import numbers from './numbers';
import inbox from './inbox';

export default combineReducers({ alert, auth, numbers, inbox });
