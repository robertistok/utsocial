import mongoose, { Schema } from 'mongoose';

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
	},
	group: {
		type: Schema.Types.ObjectId,
		ref: 'group',
		required: true
	}
});

const Attendance = mongoose.model('attendance', AttendanceSchema);

export default Attendance;
