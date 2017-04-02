const Schedule = require('../models/schedule');

function addNew(req, res, next) {
  res.send(req.body);
}

module.exports = {
  addNew
};
