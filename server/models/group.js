import mongoose, { Schema } from 'mongoose';

const GroupSchema = new Schema({
	id: Number,
	startYear: Number,
	avarageBirthYear: Number,
	year: Number,
	lang: String,
	students: [
		{
			type: Schema.Types.ObjectId,
			ref: 'student'
		}
	],
	courses: [
		{
			type: Schema.Types.ObjectId,
			ref: 'course'
		}
	]
});

const Group = mongoose.model('group', GroupSchema);

export default Group;
