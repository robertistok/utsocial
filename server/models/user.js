/* eslint consistent-return: 0*/

import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const UserSchema = new Schema({
	username: {
		type: String,
		unique: true,
		required: true,
		lovercase: true
	},
	phone: { type: Number, required: true, unique: true },
	email: {
		type: String,
		unique: true,
		required: true,
		lovercase: true
	},
	password: { type: String, required: true },
	resetPasswordToken: String,
	resetPasswordExpires: Date,
	type: String
});

UserSchema.pre('save', function encryptPassword(next) {
	const user = this;

	if (!user.isModified('password')) return next();

	bcrypt.genSalt(10, (err, salt) => {
		if (err) {
			return next(err);
		}

		bcrypt.hash(user.password, salt, null, (err, hash) => {
			if (err) {
				return next(err);
			}
			user.password = hash;

			next();
		});
	});
});

UserSchema.methods.comparePassword = function checkPassword(
	candidatePassword,
	callback
) {
	bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
		if (err) return callback(err);

		callback(null, isMatch);
	});
};

const User = mongoose.model('user', UserSchema);

export default User;
