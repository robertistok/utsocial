const passport = require('passport');
const express = require('express');

const AuthenticationController = require('./controllers/authentication');
const SchedulesController = require('./controllers/schedules');
const GroupsController = require('./controllers/groups');
const CoursesController = require('./controllers/courses');
const TeachersController = require('./controllers/teachers');
const MessagesController = require('./controllers/messages');
const UsersController = require('./controllers/users');

const passportService = require('./services/passport');

const requireSignin = passport.authenticate('local', { session: false });
const requireAuth = passport.authenticate('jwt', { session: false });

const router = express.Router();

// router.post('/api/auth/login', requireSignin, AuthenticationController.signIn);
// router.get(
//   '/api/auth/mefromtoken',
//   requireAuth,
//   AuthenticationController.meFromToken
// );
//
// router.post('/api/schedules/new', requireAuth, SchedulesController.addNew);
// router.get('/api/schedules/get/:id', requireAuth, SchedulesController.getOne);
//
// router.get('/api/groups/getall', requireAuth, GroupsController.getGroups);
// router.post('/api/groups/getbyid', requireAuth, GroupsController.getGroupById);
//
// router.get('/api/teachers/getall', TeachersController.getTeachers);
//
// router.post(
//   '/api/courses/teachersforcoursetype',
//   requireAuth,
//   CoursesController.getCourseTeachingTeacher
// );
//
// router.get(
//   '/api/messages/:username',
//   requireAuth,
//   MessagesController.getConversationsOfUser
// );
//
// router.get('/api/users/all', requireAuth, UsersController.getAll);
// router.get(
//   '/api/users/autocomplete/:term',
//   requireAuth,
//   UsersController.usersForAutocomplete
// );

export default router;
