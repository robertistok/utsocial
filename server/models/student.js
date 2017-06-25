/* eslint-disable no-param-reassign */

import mongoose, { Schema } from 'mongoose';

const StudentSchema = new Schema(
	{
		CNP: String,
		firstname: String,
		lastname: String,
		gender: String,
		dateOfBirth: Date,
		bankAccount: String,
		identificationNumber: {
			type: Number,
			unique: true
		},
		group: {
			type: Schema.Types.ObjectId,
			ref: 'group'
		},
		semigroup: Number
	},
	{
		toObject: { virtuals: true },
		toJSON: { virtuals: true }
	}
);

StudentSchema.virtual('name').get(function getName() {
	return `${this.firstname} ${this.lastname}`;
});

const Student = mongoose.model('student', StudentSchema);

export default Student;
