'use strict';

var jwt = require('jwt-simple');

function tokenForUser(user) {
	var timestamp = new Date().getTime();
	var payload = {
		sub: user._id,
		timestamp: timestamp
	};
	var secret = process.env.SECRETKEY;
	return jwt.encode(payload, secret);
}

function getCleanUser(user) {
	if (!user) return {};

	return {
		_id: user._id,
		username: user.username,
		type: user.type
	};
}

module.exports = {
	getCleanUser: getCleanUser,
	tokenForUser: tokenForUser
};