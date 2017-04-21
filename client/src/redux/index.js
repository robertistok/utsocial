import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './auth';
import scheduleReducer from './schedule';
import groupsReducer from './groups';
import teachersReducer from './teachers';
import modalsReducer from './modals';
import usersReducer from './users';
import messagesReducer from './messages';

const rootReducer = combineReducers({
  auth: authReducer,
  schedule: scheduleReducer,
  groups: groupsReducer,
  modals: modalsReducer,
  teachers: teachersReducer,
  form: formReducer,
  users: usersReducer,
  messages: messagesReducer
});

export default rootReducer;
