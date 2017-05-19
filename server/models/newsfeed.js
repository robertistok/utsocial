import mongoose, { Schema } from 'mongoose';

const NewsfeedSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	posted: {
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
				type: String,
				required: true,
				validate: {
					validator: type =>
						[
							'lecture',
							'lab',
							'project',
							'seminar',
							'general',
							'grade',
							'attendance'
						].indexOf(type) > -1,
					message: 'Invalid type for nesfeed item type'
				}
			},
			lang: {
				type: String,
				required: true,
				validate: {
					validator: type => ['eng', 'ro'].indexOf(type) > -1,
					message: 'There is only english or romanian sections at the faculty'
				}
			}
		},
		teachers: {
			type: Boolean,
			default: true
		},
		groups: [
			{
				type: Schema.Types.ObjectId,
				ref: 'student'
			}
		]
	},
	edited: Date,
	seenBy: {
		students: [
			{
				type: Schema.Types.ObjectId,
				ref: 'student'
			}
		],
		teachers: [
			{
				type: Schema.Types.ObjectId,
				ref: 'teacher'
			}
		]
	}
});

const Newsfeed = mongoose.model('newsfeed', NewsfeedSchema);

export default Newsfeed;
