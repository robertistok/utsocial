const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Meta = new Schema({
	lang: {
		type: String,
		reguried: true,
		unique: true
	},
	materials: [
		{
			_id: {
				type: mongoose.Schema.Types.ObjectId,
				index: true,
				required: true,
				auto: true
			},
			enteredOn: {
				type: Date,
				default: Date.now
			},
			type: {
				type: String
			},
			link: String,
			description: String
		}
	],
	description: {
		text: {
			type: String,
			default: ''
		},
		lastUpdatedBy: {
			type: Schema.Types.ObjectId,
			ref: 'teacher'
		},
		updatedOn: {
			type: Date,
			default: Date.now
		}
	}
});

const CourseSchema = new Schema(
	{
		code: {
			type: Number,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		year: {
			type: Number,
			min: [1, 'Too low. Enter a value between 1 and 4'],
			max: [4, 'Too high. Enter a value between 1 and 4'],
			required: true
		},
		semester: {
			type: Number,
			min: [1, 'There exist only semester 1 and 2, you entered a lover value'],
			max: [2, 'There exist only semester 1 and 2, you entered a higher value'],
			required: true
		},
		lecturePerWeek: {
			type: Number,
			default: 2,
			required: true
		},
		labsPerWeek: {
			type: Number,
			default: 2,
			required: true
		},
		seminarsPerWeek: {
			type: Number,
			default: 0,
			required: true
		},
		projectsPerWeek: {
			type: Number,
			default: 0,
			required: true
		},
		credits: Number,
		teachers: {
			lecture: [
				{
					type: Schema.Types.ObjectId,
					ref: 'teacher'
				}
			],
			seminar: [
				{
					type: Schema.Types.ObjectId,
					ref: 'teacher'
				}
			],
			lab: [
				{
					type: Schema.Types.ObjectId,
					ref: 'teacher'
				}
			],
			project: [
				{
					type: Schema.Types.ObjectId,
					ref: 'teacher'
				}
			]
		},
		meta: [Meta]
	},
	{
		toObject: { virtuals: true },
		toJSON: { virtuals: true }
	}
);

CourseSchema.virtual('teachingTypes').get(function getTeachingTypes() {
	const lecture = this.lecturePerWeek > 0;
	const lab = this.labsPerWeek > 0;
	const seminar = this.seminarsPerWeek > 0;
	const project = this.projectsPerWeek > 0;

	return {
		lecture,
		lab,
		seminar,
		project
	};
});

const Course = mongoose.model('course', CourseSchema);
module.exports = Course;
