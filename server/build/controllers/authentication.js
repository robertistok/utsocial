'use strict';

var _require = require('../utils/index'),
    tokenForUser = _require.tokenForUser,
    getCleanUser = _require.getCleanUser;

function signIn(req, res) {
  res.send({ token: tokenForUser(req.user), user: getCleanUser(req.user) });
}

function meFromToken(req, res) {
  res.send({ user: getCleanUser(req.user) });
}

module.exports = {
  signIn: signIn,
  meFromToken: meFromToken
};