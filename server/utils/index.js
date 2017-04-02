const jwt = require('jwt-simple');

function tokenForUser(user) {
	const timestamp = new Date().getTime();
	const payload = {
		sub: user._id,
		timestamp,
	};
	const secret = process.env.SECRETKEY;
	return jwt.encode(payload, secret);
}

function getCleanUser(user) {
	if (!user) return { };

	return {
		_id: user._id,
		username: user.username,
		type: user.type,
	};
}

module.exports = {
	getCleanUser,
	tokenForUser,
};
