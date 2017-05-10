const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AttendanceSchema = new Schema({
	enteredOn: {
		type: Date,
		default: Date.now
	},
	enteredFor: {
		type: Date,
		required: true
	},
	course: {
		type: Schema.Types.ObjectId,
		ref: 'course',
		required: true
	},
	student: {
		type: Schema.Types.ObjectId,
		ref: 'student',
		required: true
	},
	assignor: {
		type: Schema.Types.ObjectId,
		ref: 'teacher'
	},
	type: {
		type: String,
		required: true
	}
});

const Attendance = mongoose.model('grade', AttendanceSchema);
module.exports = Attendance;
