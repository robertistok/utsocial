const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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
module.exports = Group;
