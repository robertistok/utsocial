const Group = require('../models/group');
const Course = require('../models/course');

function getGroups(req, res, next) {
  Group.find({})
    .then((groups) => {
      res.send(groups);
    })
    .catch(err => next(err));
}

function getGroupById(req, res, next) {
  Group.findById(req.body.id)
    .populate({
      path: 'courses',
      select: 'name teachers teachingTypes lecturePerWeek labsPerWeek seminarsPerWeek projectsPerWeek',
      match: { semester: { $eq: 2 } },
      populate: {
        path: 'teachers.lecture teachers.seminar teachers.lab teachers.project',
        select: 'firstname lastname ',
        model: 'teacher'
      }
    })
    .then(group => res.send(group))
    .catch(err => next(err));
}

module.exports = {
  getGroups,
  getGroupById
};
