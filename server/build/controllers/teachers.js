'use strict';

var Teacher = require('../models/teacher');

function getTeachers(req, res, next) {
  Teacher.find({}).then(function (teachers) {
    return res.send(teachers);
  }).catch(function (err) {
    return next(err);
  });
}

module.exports = { getTeachers: getTeachers };