import jwt from 'jwt-simple';

import Student from '../models/student';
import Teacher from '../models/teacher';

export function tokenForUser(user) {
	const timestamp = new Date().getTime();
	const payload = {
		sub: user._id,
		timestamp
	};
	const secret = process.env.SECRETKEY;
	return jwt.encode(payload, secret);
}

export function getCleanUser(user) {
	if (!user) return {};

	return Promise.all([
		Student.findOne({ _id: user._id }).populate({
			path: 'group',
			populate: {
				path: 'courses',
				match: { semester: { $eq: 2 } }
			}
		}),
		Teacher.findOne({ _id: user._id })
	]).then((values) => {
		const [student, teacher] = values;

		if (student !== null) {
			return {
				profile: student,
				_id: user._id,
				username: user.username,
				email: user.email,
				phone: user.phone,
				type: user.type
			};
		} else if (teacher !== null) {
			return {
				profile: teacher,
				_id: user._id,
				username: user.username,
				email: user.email,
				phone: user.phone,
				type: user.type
			};
		}
		return {
			_id: user._id,
			username: user.username,
			type: user.type
		};
	});
}
