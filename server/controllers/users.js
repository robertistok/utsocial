const User = require('../models/user');

function getAll(req, res, next) {
  User.find({}, 'username type')
    .then(users => res.send(users))
    .catch(err => next(err));
}

function usersForAutocomplete(req, res, next) {
  let searchTerm = {};
  if (req.params.term !== 'none') {
    const regex = new RegExp(req.params.term, 'i');
    searchTerm = { username: regex };
  }

  User.find(searchTerm, 'username type')
    .limit(5)
    .then(users => res.send(users))
    .catch(err => next(err));
}

module.exports = { getAll, usersForAutocomplete };
