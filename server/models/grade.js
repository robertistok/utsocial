import mongoose, { Schema } from 'mongoose';

const GradeSchema = new Schema({
	enteredOn: {
		type: Date,
		default: Date.now
	},
	grade: {
		type: Number,
		min: [1, '1 is the minimum grade you can assign'],
		max: [10, '10 is the maximum grade you can assign'],
		required: true
	},
	number: Number,
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
		ref: 'teacher',
		required: true
	},
	type: {
		type: String,
		required: true,
		validate: {
			validator: type =>
				['lecture', 'lab', 'project', 'seminar', 'final'].indexOf(type) > -1,
			message: 'You can only assign a grade of type lecture, lab, project or seminar'
		}
	},
	group: {
		type: Schema.Types.ObjectId,
		ref: 'group',
		required: true
	}
});

const Grade = mongoose.model('grade', GradeSchema);

export default Grade;
