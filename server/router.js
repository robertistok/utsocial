// Disable this rule in the favor of passportservice
/* eslint no-unused-vars: 0*/
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
const GradesController = require('./controllers/grades');
const PostsController = require('./controllers/posts');

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
router.get(
	'/api/schedules/get/teacher/:id',
	requireAuth,
	SchedulesController.getForTeacher
);

router.get(
	'/api/groups/groupsFromYear/:year',
	requireAuth,
	GroupsController.getGroupsFromYear
);
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
router.post(
	'/api/teachers/getColleagues',
	requireAuth,
	TeachersController.getColleagues
);

router.get(
	'/api/courses/getCourseGroups/:courseID/:lang',
	requireAuth,
	CoursesController.getCourseGroups
);
router.get('/api/courses/getAll', requireAuth, CoursesController.getAll);
router.get(
	'/api/courses/meta/get/:courseID/:lang',
	requireAuth,
	CoursesController.getMetaData
);
router.post(
	'/api/courses/meta/addMaterial',
	requireAuth,
	CoursesController.addMaterial
);
router.post(
	'/api/courses/meta/deleteMaterial',
	requireAuth,
	CoursesController.deleteMaterial
);
router.post(
	'/api/courses/meta/updateMaterial',
	requireAuth,
	CoursesController.updateMaterial
);
router.post(
	'/api/courses/meta/updateDescription',
	requireAuth,
	CoursesController.updateDescription
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
	'/api/users/changePassword',
	requireAuth,
	UsersController.changePassword
);
router.post(
	'/api/users/validateUsername',
	requireAuth,
	UsersController.validateUsername
);
router.post(
	'/api/users/validateEmail',
	requireAuth,
	UsersController.validateEmail
);
router.post(
	'/api/users/validatePhone',
	requireAuth,
	UsersController.validatePhone
);

router.post(
	'/api/attendance/getAttendanceOfCourseType',
	requireAuth,
	AttendanceController.getAttendanceOfCourseType
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

router.post(
	'/api/grades/getGradesListOfGroup',
	requireAuth,
	GradesController.getGradesListOfGroup
);
router.post(
	'/api/grades/getGradesListOfStudent',
	requireAuth,
	GradesController.getGradesListOfStudent
);
router.post('/api/grades/insert', requireAuth, GradesController.insertGrade);
router.post('/api/grades/update', requireAuth, GradesController.updateGrade);
router.get('/api/grades/delete/:id', requireAuth, GradesController.deleteGrade);

router.get(
	'/api/posts/getFeedForStudent/:groupID',
	requireAuth,
	PostsController.getFeedForStudent
);
router.post(
	'/api/posts/getFeedForCourse',
	requireAuth,
	PostsController.getFeedForCourse
);
router.post('/api/posts/addPost', requireAuth, PostsController.addPost);
router.delete(
	'/api/posts/delete/:postID',
	requireAuth,
	PostsController.deletePost
);
router.put('/api/posts/mark', requireAuth, PostsController.mark);
router.put('/api/posts/unMark', requireAuth, PostsController.unMark);
router.put('/api/posts/update', requireAuth, PostsController.updatePost);

export default router;
