import moment from 'moment';

import { connectedUsers, io } from '../server';
import Attendance from '../models/attendance';
import Notification from '../models/notification';

function getAttendanceOfCourseType(req, res, next) {
	const { group, type, course, studentID: student } = req.body;

	Attendance.find({ course, type, $and: [{ $or: [{ group }, { student }] }] })
		.then(attendances => res.send(attendances))
		.catch(err => next(err));
}

function markAsPresent(req, res, next) {
	const { student, date, course, type, assignor, group } = req.body;

	const newAttendance = new Attendance({
		enteredFor: moment(date, 'DD/MM').valueOf(),
		course,
		student,
		assignor,
		type,
		group
	});

	const newAttendanceNotification = new Notification({
		type: 'attendanceAdd',
		triggeredBy: assignor,
		target: {
			course: {
				id: course
			},
			students: [student]
		},
		info: {
			enteredFor: Date.now()
		}
	});

	Promise.all([newAttendance.save(), newAttendanceNotification.save()])
		.then((values) => {
			const [attendance, notification] = values;

			io.to(connectedUsers[student]).emit('new:attendance', notification);
			return res.send(attendance);
		})
		.catch(err => next(err));
}

function removeAttendance(req, res, next) {
	const { id } = req.params;

	Attendance.findByIdAndRemove(id)
		.then((attendance) => {
			const { assignor, student, course, enteredFor } = attendance;
			const removeAttendanceNotification = new Notification({
				type: 'attendanceRemove',
				triggeredBy: assignor,
				target: {
					course: {
						id: course
					},
					students: [student]
				},
				enteredFor
			});

			removeAttendanceNotification
				.save()
				.then((removeAttendanceNotification) => {
					io
						.to(connectedUsers[student])
						.emit('remove:attendance', removeAttendanceNotification);
					return res.send({ message: 'succes' });
				})
				.catch(err => next(err));
		})
		.catch(err => next(err));
}

module.exports = {
	getAttendanceOfCourseType,
	markAsPresent,
	removeAttendance
};
