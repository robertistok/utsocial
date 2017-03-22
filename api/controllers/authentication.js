const jwt = require('jwt-simple');

function tokenForUser(user) {
	const timestamp = new Date().getTime();
	const payload = {
		user: user._id,
		type: user.type,
		timestamp,
	};
	const secret = process.env.SECRETKEY;
	return jwt.encode(payload, secret);
}

function signIn(req, res, next) {
	res.send({ token: tokenForUser(req.user), user: req.user });
}

module.exports = {
	signIn,
};
