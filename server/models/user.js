const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String,
		unique: true,
		required: true,
		lovercase: true
	},
	password: String,
	type: String
});

UserSchema.pre('save', function (next) {
	const user = this;

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

UserSchema.methods.comparePassword = function (candidatePassword, callback) {
	bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
		if (err) return callback(err);

		callback(null, isMatch);
	});
};

const User = mongoose.model('user', UserSchema);

module.exports = User;
