const Schedule = require('../models/schedule');

function addNew(req, res, next) {
  const {
    group,
    semigroup,
    teacher,
    course,
    type,
    day,
    from,
    duration,
    frequency,
    where
  } = req.body;
  const schedule = new Schedule({
    whom: {
      group,
      semigroup
    },
    who: teacher,
    what: {
      course,
      type
    },
    when: {
      day,
      from,
      duration: parseInt(duration, 10),
      frequency
    },
    where
  });

  schedule
    .save()
    .then(() => res.send(schedule))
    .catch(err => res.status(500).json({ message: err.message }));
}

function getOne(req, res, next) {
  const { id } = req.params;

  Schedule.find({ whom: id }).then(schedules => res.send(schedules));
}

module.exports = {
  addNew,
  getOne
};
