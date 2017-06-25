import moment from 'moment';

import { connectedUsers, io } from '../server';
import Attendance from '../models/attendance';
import Notification from '../models/notification';

export function getAttendanceOfCourseType(req, res, next) {
	const { group, type, course, studentID: student } = req.body;

	Attendance.find({ course, type, $and: [{ $or: [{ group }, { student }] }] })
		.then(attendances => res.send(attendances))
		.catch(err => next(err));
}

export function markAsPresent(req, res, next) {
	const { student, date, course, type, assignor, group } = req.body;
	const enteredFor = moment(date, 'DD/MM').valueOf();

	const newAttendance = new Attendance({
		enteredFor,
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
				id: course,
				type
			},
			students: [student]
		},
		info: {
			enteredFor
		}
	});

	Promise.all([newAttendance.save(), newAttendanceNotification.save()])
		.then((values) => {
			const notification = values[1];

			return Notification.populate(notification, [
				{ path: 'triggeredBy', select: 'firstname lastname name' },
				{ path: 'target.course.id', select: 'name' }
			]);
		})
		.then((notificationpopualted) => {
			io
				.to(connectedUsers[student])
				.emit('new:attendance', notificationpopualted);
			return res.send(newAttendance);
		})
		.catch(err => next(err));
}

export function removeAttendance(req, res, next) {
	const { id } = req.params;
	let targetStudent;

	Attendance.findByIdAndRemove(id)
		.then((attendance) => {
			const { assignor, student, course, enteredFor, type } = attendance;
			const removeAttendanceNotification = new Notification({
				type: 'attendanceRemove',
				triggeredBy: assignor,
				target: {
					course: {
						id: course,
						type
					},
					students: [student]
				},
				info: { enteredFor }
			});
			targetStudent = student;

			return removeAttendanceNotification.save();
		})
		.then(removeAttendanceNotification =>
			Notification.populate(removeAttendanceNotification, [
				{ path: 'triggeredBy', select: 'firstname lastname name' },
				{ path: 'target.course.id', select: 'name' }
			])
		)
		.then((notificationpopulated) => {
			io
				.to(connectedUsers[targetStudent])
				.emit('remove:attendance', notificationpopulated);
			return res.send({ message: 'succes' });
		})
		.catch(err => next(err));
}
