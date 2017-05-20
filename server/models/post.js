import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	edited: Date,
	content: {
		type: String,
		required: true
	},
	postedBy: {
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
			relatedTo: {
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
							'grades',
							'attendance'
						].indexOf(type) > -1,
					message: 'Invalid type for post item relatedTo'
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
		includeTeachers: {
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
	seenBy: {
		type: [String],
		default: []
	},
	marked: {
		type: [String],
		default: []
	}
});

const Post = mongoose.model('post', PostSchema);

export default Post;
