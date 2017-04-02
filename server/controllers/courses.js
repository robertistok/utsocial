const Course = require('../models/course');

function getCourseTeachingTeacher(req, res, next) {
  const { type, course } = req.body;
  res.send({ type, course });
}

module.exports = {
  getCourseTeachingTeacher
};
