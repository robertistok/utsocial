import moment from 'moment';

import Attendance from '../models/attendance';

function getAttendanceOfCourseType(req, res, next) {
	const { group, type, course, studentID: student } = req.body;

	Attendance.find({ course, type, $and: [{ $or: [{ group }, { student }] }] })
		.then(attendances => res.send(attendances))
		.catch(err => next(err));
}

function markAsPresent(req, res, next) {
	const { student, date, course, type, teacher, group } = req.body;

	const newAttendance = new Attendance({
		enteredFor: moment(date, 'DD/MM').valueOf(),
		course,
		student,
		assignor: teacher,
		type,
		group
	});

	newAttendance
		.save()
		.then(attendance => res.send(attendance))
		.catch(err => next(err));
}

function removeAttendance(req, res, next) {
	const { id } = req.params;

	Attendance.findByIdAndRemove(id)
		.then(() => res.send({ message: 'succes' }))
		.catch(err => next(err));
}

module.exports = {
	getAttendanceOfCourseType,
	markAsPresent,
	removeAttendance
};
