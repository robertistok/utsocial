const passport = require('passport');
const express = require('express');

const AuthenticationController = require('./controllers/authentication');
const SchedulesController = require('./controllers/schedules');
const GroupsController = require('./controllers/groups');
const CoursesController = require('./controllers/courses');
const TeachersController = require('./controllers/teachers');
const MessagesController = require('./controllers/messages');
const UsersController = require('./controllers/users');
//
// const passportService = require('./services/passport');

// const requireSignin = passport.authenticate('local', { session: false });
// const requireAuth = passport.authenticate('jwt', { session: false });

const requireAuth = 0;
const requireSignin = 0;

const router = express.Router();

// router.post('/api/auth/login', requireSignin, AuthenticationController.signIn);
// router.get('/api/auth/mefromtoken', AuthenticationController.meFromToken);

router.post('/api/schedules/new', SchedulesController.addNew);
router.get('/api/schedules/get/:id', SchedulesController.getOne);

router.get('/api/groups/getall', GroupsController.getGroups);
router.post('/api/groups/getbyid', GroupsController.getGroupById);

router.get('/api/teachers/getall', TeachersController.getTeachers);

router.post(
  '/api/courses/teachersforcoursetype',
  CoursesController.getCourseTeachingTeacher
);

router.get(
  '/api/messages/:username',
  MessagesController.getConversationsOfUser
);

router.get('/api/users/all', UsersController.getAll);
router.get(
  '/api/users/autocomplete/:term',
  UsersController.usersForAutocomplete
);

export default router;
