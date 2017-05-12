const passport = require('passport');
const express = require('express');

const AuthenticationController = require('./controllers/authentication');
const SchedulesController = require('./controllers/schedules');
const GroupsController = require('./controllers/groups');
const CoursesController = require('./controllers/courses');
const TeachersController = require('./controllers/teachers');
const MessagesController = require('./controllers/messages');
const UsersController = require('./controllers/users');
const AttendanceController = require('./controllers/attendance');

const passportService = require('./services/passport');

const requireSignin = passport.authenticate('local', { session: false });
const requireAuth = passport.authenticate('jwt', { session: false });

const router = express.Router();

router.post('/api/auth/login', requireSignin, AuthenticationController.signIn);
router.get(
	'/api/auth/mefromtoken',
	requireAuth,
	AuthenticationController.meFromToken
);

router.post('/api/schedules/new', requireAuth, SchedulesController.addNew);
router.get('/api/schedules/get/:id', requireAuth, SchedulesController.getOne);

router.get('/api/groups/getall', requireAuth, GroupsController.getGroups);
router.post('/api/groups/getbyid', requireAuth, GroupsController.getGroupById);
router.get(
	'/api/groups/getStudents/:id',
	requireAuth,
	GroupsController.getStudents
);

router.get('/api/teachers/getall', TeachersController.getTeachers);
router.get(
	'/api/teachers/getTeaching/:id',
	requireAuth,
	TeachersController.getTeaching
);

router.get(
	'/api/courses/getCourseGroups/:courseID/:lang',
	requireAuth,
	CoursesController.getCourseGroups
);

router.get(
	'/api/messages/:username',
	requireAuth,
	MessagesController.getConversationsOfUser
);
router.get(
	'/api/messages/conversation/:id',
	requireAuth,
	MessagesController.getMessagesOfConversation
);
router.get(
	'/api/messages/read/:id/',
	requireAuth,
	MessagesController.readMessagesOfConversation
);
router.post(
	'/api/messages/star',
	requireAuth,
	MessagesController.starConversationForUser
);

router.get('/api/users/all', requireAuth, UsersController.getAll);
router.get(
	'/api/users/autocomplete/:term',
	requireAuth,
	UsersController.usersForAutocomplete
);

router.post(
	'/api/attendance/getAttendanceOfGroupWithCourseType',
	requireAuth,
	AttendanceController.getAttendanceOfGroupWithCourseType
);
router.post(
	'/api/attendance/markAsPresent',
	requireAuth,
	AttendanceController.markAsPresent
);
router.get(
	'/api/attendance/remove/:id',
	requireAuth,
	AttendanceController.removeAttendance
);

export default router;
