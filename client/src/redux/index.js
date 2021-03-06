import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as burgerMenu } from 'redux-burger-menu';

import accountReducer from './account';
import scheduleReducer from './schedule';
import groupsReducer from './groups';
import teachersReducer from './teachers';
import modalsReducer from './modals';
import usersReducer from './users';
import messagesReducer from './messages';
import coursesReducer from './courses';
import attendanceReducer from './attendance';
import gradesReducer from './grades';
import metadatacourseReducer from './metadatacourse';
import notificationsReducer from './notifications';

import { DEAUTH_USER } from './account/auth';

const appReducer = combineReducers({
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
  metadatacourse: metadatacourseReducer,
  account: accountReducer,
  notifications: notificationsReducer,
  burgerMenu
});

const rootReducer = (state, action) => {
  if (action.type === DEAUTH_USER) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
