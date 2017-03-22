const passport = require('passport');

const AuthenticationController = require('./controllers/authentication');
const passportService = require('../services/passport');

const requireSignin = passport.authenticate('local', { session: false });
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
	app.post('/api/auth/login', requireSignin, AuthenticationController.signIn);
};
