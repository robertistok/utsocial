const { tokenForUser, getCleanUser } = require('../utils/index');

function signIn(req, res) {
  res.send({ token: tokenForUser(req.user), user: getCleanUser(req.user) });
}

function meFromToken(req, res) {
  res.send({ user: getCleanUser(req.user) });
}

module.exports = {
  signIn,
  meFromToken
};
