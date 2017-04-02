const passport = require('passport');

const AuthenticationController = require('./controllers/authentication');
const SchedulesController = require('./controllers/schedules');
const GroupsController = require('./controllers/groups');
const CoursesController = require('./controllers/courses');
const TeachersController = require('./controllers/teachers');
const passportService = require('./services/passport');

const requireSignin = passport.authenticate('local', { session: false });
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
  app.post('/api/auth/login', requireSignin, AuthenticationController.signIn);
  app.get(
    '/api/auth/mefromtoken',
    requireAuth,
    AuthenticationController.meFromToken
  );

  app.post('/api/schedules/new', requireAuth, SchedulesController.addNew);

  app.get('/api/groups/getall', requireAuth, GroupsController.getGroups);
  app.post('/api/groups/getbyid', requireAuth, GroupsController.getGroupById);

  app.get('/api/teachers/getall', TeachersController.getTeachers);

  app.post(
    '/api/courses/teachersforcoursetype',
    requireAuth,
    CoursesController.getCourseTeachingTeacher
  );
};
