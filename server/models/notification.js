import mongoose, { Schema } from 'mongoose';

const NotificationSchema = new Schema({
	type: {
		type: String,
		required: true,
		validate: {
			validator: type =>
				[
					'attendanceAdd',
					'attendanceRemove',
					'gradeAdd',
					'gradeDelete',
					'post'
				].indexOf(type) > -1,
			message: 'Invalid type for notification item'
		}
	},
	timestamp: {
		type: Date,
		default: Date.now
	},
	triggeredBy: {
		type: Schema.Types.ObjectId,
		ref: 'teacher',
		required: true
	},
	target: {
		course: {
			id: {
				type: Schema.Types.ObjectId,
				ref: 'course',
				required: true
			},
			type: {
				type: String
			},
			lang: String
		},
		groups: [
			{
				type: Schema.Types.ObjectId,
				ref: 'group',
				default: []
			}
		],
		students: [
			{
				type: Schema.Types.ObjectId,
				ref: 'student',
				default: []
			}
		],
		teachers: [
			{
				type: Schema.Types.ObjectId,
				ref: 'teacher',
				default: []
			}
		]
	},
	seenBy: [String],
	info: {
		enteredFor: Date,
		gradeNumber: Number
	}
});

const Notification = mongoose.model('notification', NotificationSchema);

export default Notification;
