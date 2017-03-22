const passport = require('passport');

const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../api/models/user');

const localLogin = new LocalStrategy((username, password, done) => {
  User.findOne({ username })
		.then((user) => {
  		if (!user) return done(null, false, { message: 'Incorrect username' });

  		user.comparePassword(password, (err, isMatch) => {
				if (err) { return done(err); }
				if (!isMatch) { return done(null, false); }

				return done(null, user);
			});
		})
		.catch(err => done(err));
});

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: process.env.SECRETKEY,
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
	User.findById(payload.sub)
		.then((user) => {
			if (user) {
				done(null, user);
			 } else {
				 done(null, false);
			 }
		}).catch(err => done(err));
});

passport.use(localLogin);
passport.use(jwtLogin);
