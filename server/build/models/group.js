'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

/**
 * TODO: it should have students, teachers, courses
 * TODO: no attendance, the teachers have them, we can refernce it in the future
 * TODO: it should include notificationss
 * @param id should look like:
      1st: two: faculty code(30 - AC)
      2nd: specialization code(21 - AutRo; 22 - AutEng;
      3rd: series code: two digit number, representing the last two digits from
            the start year of the group;
      4th: num of rhe group in the series;
      autEng should have 28 students/group
**/

var GroupSchema = new Schema({
  id: Number,
  startYear: Number,
  avarageBirthYear: Number,
  students: [{
    type: Schema.Types.ObjectId,
    ref: 'student'
  }],
  courses: [{
    type: Schema.Types.ObjectId,
    ref: 'course'
  }]
});

var Group = mongoose.model('group', GroupSchema);
module.exports = Group;