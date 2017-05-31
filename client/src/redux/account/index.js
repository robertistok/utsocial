import { combineReducers } from 'redux';

import authReducer from './auth';
import preferencesReducer from './preferences';
import forgotPasswordReducer from './forgotPassword';

const accountReducer = combineReducers({
  auth: authReducer,
  preferences: preferencesReducer,
  forgotPassword: forgotPasswordReducer
});

export default accountReducer;
