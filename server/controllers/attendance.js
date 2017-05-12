import moment from 'moment';

import Attendance from '../models/attendance';

function getAttendanceOfGroupWithCourseType(req, res, next) {
	const { group, type, course } = req.body;

	Attendance.find({ course, type, group })
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
	getAttendanceOfGroupWithCourseType,
	markAsPresent,
	removeAttendance
};
