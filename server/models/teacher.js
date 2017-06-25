import mongoose, { Schema } from 'mongoose';

const TeacherSchema = new Schema(
	{
		CNP: String,
		firstname: String,
		lastname: String,
		gender: String,
		dateOfBirth: Date,
		identificationNumber: Number,
		teaching: [
			{
				subject: {
					type: Schema.Types.ObjectId,
					ref: 'course'
				},
				type: {
					type: String,
					required: true,
					validate: {
						validator: type =>
							['lecture', 'lab', 'project', 'seminar'].indexOf(type) > -1,
						message: 'You can only assign a class of type lecture, lab, project or seminar'
					}
				}
			}
		]
	},
	{
		toObject: { virtuals: true },
		toJSON: { virtuals: true }
	}
);

TeacherSchema.virtual('name').get(function getName() {
	return `${this.firstname} ${this.lastname}`;
});

const Teacher = mongoose.model('teacher', TeacherSchema);

export default Teacher;
