'use strict';

var Group = require('../models/group');
var Course = require('../models/course');

function getGroups(req, res, next) {
  Group.find({}).then(function (groups) {
    res.send(groups);
  }).catch(function (err) {
    return next(err);
  });
}

function getGroupById(req, res, next) {
  Group.findById(req.body.id).populate({
    path: 'courses',
    select: 'name teachers teachingTypes lecturePerWeek labsPerWeek seminarsPerWeek projectsPerWeek',
    match: { semester: { $eq: 2 } },
    populate: {
      path: 'teachers.lecture teachers.seminar teachers.lab teachers.project',
      select: 'firstname lastname ',
      model: 'teacher'
    }
  }).then(function (group) {
    return res.send(group);
  }).catch(function (err) {
    return next(err);
  });
}

module.exports = {
  getGroups: getGroups,
  getGroupById: getGroupById
};