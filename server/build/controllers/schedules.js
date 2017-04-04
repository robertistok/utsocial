'use strict';

var Schedule = require('../models/schedule');

function addNew(req, res, next) {
  var _req$body = req.body,
      group = _req$body.group,
      semigroup = _req$body.semigroup,
      teacher = _req$body.teacher,
      course = _req$body.course,
      type = _req$body.type,
      day = _req$body.day,
      from = _req$body.from,
      duration = _req$body.duration,
      frequency = _req$body.frequency,
      where = _req$body.where;

  var schedule = new Schedule({
    whom: {
      group: group,
      semigroup: semigroup
    },
    who: teacher,
    what: {
      course: course,
      type: type
    },
    when: {
      day: day,
      from: from,
      duration: parseInt(duration, 10),
      frequency: frequency
    },
    where: where
  });

  schedule.save().then(function () {
    return res.send(schedule);
  }).catch(function (err) {
    return res.status(500).json({ message: err.message });
  });
}

function getOne(req, res, next) {
  var id = req.params.id;


  Schedule.find({ whom: id }).then(function (schedules) {
    return res.send(schedules);
  });
}

module.exports = {
  addNew: addNew,
  getOne: getOne
};