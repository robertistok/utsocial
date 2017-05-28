const User = require('../models/user');
const { tokenForUser, getCleanUser } = require('../utils/index');

function getAll(req, res, next) {
	User.find({}, 'username type')
		.then(users => res.send(users))
		.catch(err => next(err));
}

function usersForAutocomplete(req, res, next) {
	let searchTerm = {};
	if (req.params.term !== 'none') {
		const regex = new RegExp(req.params.term, 'i');
		searchTerm = { username: regex };
	}

	User.find(searchTerm, 'username type')
		.limit(5)
		.then(users => res.send(users))
		.catch(err => next(err));
}

function changePassword(req, res, next) {
	const { username, oldPassword, newPassword, verifyNewPassword } = req.body;

	if (newPassword !== verifyNewPassword) {
		return res.status(406).send('The two passwords must match..');
	}

	return User.findOne({ username })
		.then((user) => {
			if (!user) {
				return res.status(404).send('User not found..');
			}

			return user.comparePassword(oldPassword, (err, isMatch) => {
				if (err) {
					return res.status(500).send('Internal server error..');
				}
				if (!isMatch) {
					return res.status(403).send('Old password does not match..');
				}

				user.password = newPassword;
				return user.save().then((modifiedUser) => {
					getCleanUser(modifiedUser).then((cleanUser) => {
						res.status(200).send({
							token: tokenForUser(cleanUser),
							cleanUser,
							message: 'Password changed successfully'
						});
					});
				});
			});
		})
		.catch(err => next(err));
}

module.exports = { getAll, usersForAutocomplete, changePassword };
