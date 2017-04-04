'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TeacherSchema = new Schema({
  CNP: String,
  username: String,
  password: String,
  email: String,
  firstname: String,
  lastname: String,
  gender: String,
  phone: Number,
  dateOfBirth: Date,
  identificationNumber: Number,
  teaching: [{
    subject: {
      type: Schema.Types.ObjectId,
      ref: 'course'
    },
    type: {
      type: String,
      required: true,
      validate: {
        validator: function validator(type) {
          return ['lecture', 'lab', 'project', 'seminar'].indexOf(type) > -1;
        },
        message: 'You can only assign a class of type lecture, lab, project or seminar'
      }
    }
  }]
});

TeacherSchema.virtual('name').get(function () {
  return this.firstname + this.lastname;
});

var Teacher = mongoose.model('teacher', TeacherSchema);
module.exports = Teacher;