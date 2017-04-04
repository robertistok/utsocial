'use strict';

var passport = require('passport');

var LocalStrategy = require('passport-local');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var User = require('../models/user');

var localLogin = new LocalStrategy(function (username, password, done) {
	User.findOne({ username: username }).then(function (user) {
		if (!user) return done(null, false, { message: 'Incorrect username' });

		user.comparePassword(password, function (err, isMatch) {
			if (err) {
				return done(err);
			}
			if (!isMatch) {
				return done(null, false);
			}

			return done(null, user);
		});
	}).catch(function (err) {
		return done(err);
	});
});

var jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: process.env.SECRETKEY
};

var jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
	User.findById(payload.sub).then(function (user) {
		if (user) {
			done(null, user);
		} else {
			done(null, false);
		}
	}).catch(function (err) {
		return done(err);
	});
});

passport.use(localLogin);
passport.use(jwtLogin);