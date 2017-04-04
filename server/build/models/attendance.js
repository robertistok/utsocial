'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// TODO: implementation
// TODO: similar to grades, possible side grades with message

var AttendanceSchema = new Schema({});

var Attendance = mongoose.model('attendance', AttendanceSchema);
module.exports = Attendance;