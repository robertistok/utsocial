// disallow rule in favor of updating
/* eslint no-param-reassign: 0*/
/* eslint consistent-return: 0*/

import User from '../models/user';
import Teacher from '../models/teacher';
import Student from '../models/student';

import { tokenForUser, getCleanUser } from '../utils/index';

export function getAll(req, res, next) {
	User.find({}, 'username type')
		.then(users => res.send(users))
		.catch(err => next(err));
}

export function usersForAutocomplete(req, res, next) {
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

export function changePassword(req, res, next) {
	const { username, oldPassword, newPassword, verifyNewPassword } = req.body;

	if (newPassword !== verifyNewPassword) {
		return res.status(406).send('The two passwords must match..');
	}

	return User.findOne({ username })
		.then((user) => {
			if (!user) {
				return res.status(404).send('User not found..');
			}

			user.comparePassword(oldPassword, (err, isMatch) => {
				if (err) {
					return res.status(500).send('Internal server error..');
				}
				if (!isMatch) {
					return res.status(403).send('Old password does not match..');
				}

				user.password = newPassword;
			});
			return user.save();
		})
		.then(modifiedUser => getCleanUser(modifiedUser))
		.then(cleanUser =>
			res.status(200).send({
				token: tokenForUser(cleanUser),
				cleanUser,
				message: 'Password changed successfully'
			})
		)
		.catch(err => next(err));
}

export function validateUsername(req, res) {
	const { value: username } = req.body;

	if (username !== undefined) {
		return User.findOne({ username }).then((user) => {
			if (!user) {
				return res.status(200).send('All good');
			}

			return res.status(400).send('Username is already taken');
		});
	}
	return res.status(304).send('Nothing changed');
}

export function validateEmail(req, res) {
	const { value: email } = req.body;

	if (email !== undefined) {
		return User.findOne({ email }).then((user) => {
			if (!user) {
				return res.status(200).send('All good');
			}

			return res.status(400).send('Email is already taken');
		});
	}
	return res.status(304).send('Nothing changed');
}

export function validatePhone(req, res) {
	const { value: phone } = req.body;

	if (phone !== undefined) {
		return User.findOne({ phone }).then((user) => {
			if (!user) {
				return res.status(200).send('All good');
			}

			return res.status(400).send('Phone is already taken');
		});
	}
	return res.status(304).send('Nothing changed');
}

export function changeAccountDetails(req, res) {
	const { userID, query } = req.body;

	return Promise.all([
		User.findOneAndUpdate({ _id: userID }, query, { new: true }),
		Student.findOneAndUpdate({ _id: userID }, query, { new: true }),
		Teacher.findOneAndUpdate({ _id: userID }, query, { new: true })
	])
		.then((values) => {
			const [modifiedUser] = values;
			return getCleanUser(modifiedUser);
		})
		.then((cleanUser) => {
			res.status(200).send({
				token: tokenForUser(cleanUser),
				cleanUser,
				message: 'Account information updated successfully'
			});
		});
}
