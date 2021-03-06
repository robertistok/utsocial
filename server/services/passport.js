/* eslint consistent-return: 0*/

import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import User from '../models/user';

const localLogin = new LocalStrategy((user, password, done) => {
	User.findOne({
		$or: [
			{ username: user },
			{ email: user },
			{ phone: !isNaN(user) ? parseInt(user, 10) : undefined }
		]
	})
		.then((user) => {
			if (!user) return done(null, false, { message: 'Incorrect username' });

			user.comparePassword(password, (err, isMatch) => {
				if (err) {
					return done(err);
				}
				if (!isMatch) {
					return done(null, false);
				}

				return done(null, user);
			});
		})
		.catch(err => done(err));
});

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: process.env.SECRETKEY
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
	User.findById(payload.sub)
		.then((user) => {
			if (user) {
				done(null, user);
			} else {
				done(null, false);
			}
		})
		.catch(err => done(err));
});

passport.use(localLogin);
passport.use(jwtLogin);
