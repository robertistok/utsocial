import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './auth';
import scheduleReducer from './schedule';
import groupsReducer from './groups';
import teachersReducer from './teachers';
import modalsReducer from './modals';
import usersReducer from './users';
import messagesReducer from './messages';
import coursesReducer from './courses';
import attendanceReducer from './attendance';
import gradesReducer from './grades';
import materialsReducer from './materials';

const rootReducer = combineReducers({
  auth: authReducer,
  schedule: scheduleReducer,
  groups: groupsReducer,
  modals: modalsReducer,
  teachers: teachersReducer,
  form: formReducer,
  users: usersReducer,
  messages: messagesReducer,
  courses: coursesReducer,
  attendance: attendanceReducer,
  grades: gradesReducer,
  materials: materialsReducer
});

export default rootReducer;
