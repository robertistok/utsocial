const { tokenForUser, getCleanUser } = require('../utils/index');

function signIn(req, res) {
	getCleanUser(req.user).then((user) => {
		res.send({ token: tokenForUser(req.user), user });
	});
}

function meFromToken(req, res) {
	getCleanUser(req.user).then((user) => {
		res.send({ user });
	});
}

module.exports = {
	signIn,
	meFromToken
};
