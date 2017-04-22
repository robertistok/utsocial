import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import morgan from 'morgan';

// import router from './router';

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({ extended: false }));

const staticFiles = express.static(path.join(__dirname, '../../client/build'));
app.use(staticFiles);

const passport = require('passport');

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

router.get('/api/teachers/getall', TeachersController.getTeachers);

router.post(
  '/api/courses/teachersforcoursetype',
  requireAuth,
  CoursesController.getCourseTeachingTeacher
);

router.get(
  '/api/messages/:username',
  requireAuth,
  MessagesController.getConversationsOfUser
);

router.get('/api/users/all', requireAuth, UsersController.getAll);
router.get(
  '/api/users/autocomplete/:term',
  requireAuth,
  UsersController.usersForAutocomplete
);

app.use(router);

app.use('/*', staticFiles);

//
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   );
//   next();
// });
//
//

// MongodDb connection
mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'production') {
  mongoose.connect('mongodb://localhost/universocial');
}

app.set('port', process.env.PORT || 3001);

app.listen(app.get('port'), () => {
  console.log(
    `Up and running!\nFind the server at http://localhost:${app.get('port')}/`
  );
});

// module.exports = app;
