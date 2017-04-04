'use strict';

var passport = require('passport');

var AuthenticationController = require('./controllers/authentication');
var SchedulesController = require('./controllers/schedules');
var GroupsController = require('./controllers/groups');
var CoursesController = require('./controllers/courses');
var TeachersController = require('./controllers/teachers');
var passportService = require('./services/passport');

var requireSignin = passport.authenticate('local', { session: false });
var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app) {
  app.post('/api/auth/login', requireSignin, AuthenticationController.signIn);
  app.get('/api/auth/mefromtoken', requireAuth, AuthenticationController.meFromToken);

  app.post('/api/schedules/new', requireAuth, SchedulesController.addNew);
  app.get('/api/schedules/get/:id', requireAuth, SchedulesController.getOne);

  app.get('/api/groups/getall', requireAuth, GroupsController.getGroups);
  app.post('/api/groups/getbyid', requireAuth, GroupsController.getGroupById);

  app.get('/api/teachers/getall', TeachersController.getTeachers);

  app.post('/api/courses/teachersforcoursetype', requireAuth, CoursesController.getCourseTeachingTeacher);
};