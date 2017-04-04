'use strict';

/* eslint-disable no-param-reassign */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// TODO: expectedFinish virtual implementation
// TODO: requried fields and validation
// TODO: it should have notifications

var StudentSchema = new Schema({
  CNP: String,
  username: String,
  password: String,
  email: String,
  firstname: String,
  lastname: String,
  gender: String,
  phone: Number,
  dateOfBirth: Date,
  countyOfOrigin: String,
  militaryStatus: String,
  maritalStatus: String,
  nationality: String,
  bankAccount: String,
  identificationNumber: {
    type: Number,
    unique: true
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: 'group'
  },
  grades: [{
    type: Schema.Types.ObjectId,
    ref: 'grade'
  }],
  attendance: [{
    type: Schema.Types.ObjectId,
    ref: 'attendance'
  }]
});

StudentSchema.virtual('perf').get(function () {
  var _this = this;

  var semesters = 0;
  var totalCredits = 0; // keeps track of all the credits a student should have
  return this.grades.sort(function (a, b) {
    return a.course.code - b.course.code;
  }).reduce(function (perf, item, index) {
    var _item$course = item.course,
        credits = _item$course.credits,
        code = _item$course.code;
    var grade = item.grade;

    var yearIndex = item.course.year;
    var semesterIndex = item.course.semester;
    totalCredits += credits;

    if (!perf.year[yearIndex]) {
      perf.year[yearIndex] = { semester: {} };
    }

    if (!perf.year[yearIndex].semester[semesterIndex]) {
      semesters += 1;
      perf.year[yearIndex].semester[semesterIndex] = {
        gpa: 0,
        credits: 0,
        examsLeft: [] };
    }

    if (grade < 5) {
      perf.year[yearIndex].semester[semesterIndex].examsLeft.push(code);
    } else {
      // total earned credits
      perf.year[yearIndex].semester[semesterIndex].credits += credits;
      // weighted sum of the grades
      perf.year[yearIndex].semester[semesterIndex].gpa += grade * credits;
      perf.credits += credits;
    }

    // when change between semesters, divide the gpa
    if (totalCredits % 30 === 0) {
      var semesterGpa = parseFloat((perf.year[yearIndex].semester[semesterIndex].gpa / 30).toFixed(2));
      perf.year[yearIndex].semester[semesterIndex].gpa = semesterGpa;
      perf.gpa += semesterGpa;
    }

    // when arrived at the end of all semesters, get the total gpa
    if (index === _this.grades.length - 1) {
      perf.gpa = (perf.gpa / semesters).toFixed(2);
    }

    return perf;
  }, { year: {}, gpa: 0, credits: 0 });
});

var Student = mongoose.model('student', StudentSchema);
module.exports = Student;