'use strict';

var Course = require('../models/course');

function getCourseTeachingTeacher(req, res, next) {
  var _req$body = req.body,
      type = _req$body.type,
      course = _req$body.course;

  res.send({ type: type, course: course });
}

module.exports = {
  getCourseTeachingTeacher: getCourseTeachingTeacher
};