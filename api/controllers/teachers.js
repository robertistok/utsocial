const Teacher = require('../models/teacher');

function getTeachers(req, res, next) {
  Teacher.find({}).then(teachers => res.send(teachers)).catch(err => next(err));
}

module.exports = { getTeachers };
