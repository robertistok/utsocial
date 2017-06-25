import Grade from '../models/grade';
import Notification from '../models/notification';

import { connectedUsers, io } from '../server';

export function getGradesListOfGroup(req, res, next) {
	const { group, course } = req.body;

	Grade.find({ group, course })
		.then((grades) => {
			if (grades.length === 0) {
				return res.send({
					gradesList: {},
					numberOfGrades: {}
				});
			}

			const orderedStudents = grades.reduce(
				(acc, item) => {
					const { student, type, number } = item;
					let newAcc = { ...acc };

					if (newAcc.numberOfGrades[type] === undefined) {
						newAcc = {
							...newAcc,
							numberOfGrades: { ...newAcc.numberOfGrades, [type]: number }
						};
					} else if (newAcc.numberOfGrades[type] < number) {
						newAcc = {
							...newAcc,
							numberOfGrades: { ...newAcc.numberOfGrades, [type]: number }
						};
					}

					if (newAcc.gradesList[student] === undefined) {
						newAcc = {
							...newAcc,
							gradesList: {
								...newAcc.gradesList,
								[student]: { [type]: [item] }
							}
						};
					} else if (newAcc.gradesList[student][type] === undefined) {
						newAcc = {
							...newAcc,
							gradesList: {
								...newAcc.gradesList,
								[student]: {
									...newAcc.gradesList[student],
									[type]: [item]
								}
							}
						};
					} else {
						newAcc = {
							...newAcc,
							gradesList: {
								...newAcc.gradesList,
								[student]: {
									...newAcc.gradesList[student],
									[type]: [...newAcc.gradesList[student][type], item]
								}
							}
						};
					}

					return newAcc;
				},
				{ gradesList: {}, numberOfGrades: {} }
			);

			const { gradesList, numberOfGrades } = orderedStudents;

			return res.send({ gradesList, numberOfGrades });
		})
		.catch(err => next(err));
}

export function getGradesListOfStudent(req, res, next) {
	const { studentID, courses } = req.body;

	Grade.find({ student: studentID, course: { $in: courses } })
		.then((grades) => {
			if (grades.length === 0) {
				return res.send({ gradesList: { numberOfGrades: {}, list: {} } });
			}

			const gradesList = grades.reduce((acc, item) => {
				const { course, type, number } = item;
				if (acc[course] === undefined) {
					return {
						...acc,
						[course]: {
							numberOfGrades: { [type]: number },
							list: { [type]: [item] }
						}
					};
				}

				if (acc[course].numberOfGrades[type] === undefined) {
					return {
						...acc,
						[course]: {
							numberOfGrades: {
								...acc[course].numberOfGrades,
								[type]: number
							},
							list: { ...acc[course].list, [type]: [item] }
						}
					};
				}

				return {
					...acc,
					[course]: {
						numberOfGrades: {
							...acc[course].numberOfGrades,
							[type]: acc[course].numberOfGrades[type] < number
								? number
								: acc[course].numberOfGrades[type]
						},
						list: {
							...acc[course].list,
							[type]: [...acc[course].list[type], item]
						}
					}
				};
			}, {});

			return res.send({ gradesList });
		})
		.catch(err => next(err));
}

export function insertGrade(req, res, next) {
	const { grade, course, student, assignor, type, group, number } = req.body;

	const newGrade = new Grade({
		grade,
		course,
		student,
		assignor,
		type,
		group,
		number
	});

	const newGradeNotification = new Notification({
		type: 'gradeAdd',
		triggeredBy: assignor,
		target: {
			course: {
				id: course,
				type
			},
			students: [student]
		},
		info: {
			grade,
			gradeNumber: number
		}
	});

	Promise.all([newGrade.save(), newGradeNotification.save()])
		.then((values) => {
			const notification = values[1];

			return Notification.populate(notification, [
				{ path: 'triggeredBy', select: 'firstname lastname name' },
				{ path: 'target.course.id', select: 'name' }
			]);
		})
		.then((notificationPopulated) => {
			io.to(connectedUsers[student]).emit('add:grade', notificationPopulated);
			return res.send({ grade: newGrade });
		})
		.catch(err => next(err));
}

export function deleteGrade(req, res, next) {
	const { id, deletedBy, student: studentID } = req.body;

	Grade.findOneAndRemove({ _id: id })
		.then((gradeToDelete) => {
			const { student, course, type, number } = gradeToDelete;
			const deleteGradeNotification = new Notification({
				type: 'gradeDelete',
				triggeredBy: deletedBy,
				target: {
					course: {
						id: course,
						type
					},
					students: [student]
				},
				info: {
					gradeNumber: number
				}
			});

			return deleteGradeNotification.save();
		})
		.then(notification =>
			Notification.populate(notification, [
				{ path: 'triggeredBy', select: 'firstname lastname name' },
				{ path: 'target.course.id', select: 'name' }
			])
		)
		.then((notificationPopulated) => {
			io
				.to(connectedUsers[studentID])
				.emit('delete:grade', notificationPopulated);
			return res.send({ message: 'Grade deleted successfully' });
		})
		.catch(err => next(err));
}

export function updateGrade(req, res, next) {
	const { id, assignor, grade } = req.body;

	Grade.findOneAndUpdate(
		{ _id: id },
		{ $set: { assignor, grade } },
		{ new: true }
	)
		.then(grade => res.send({ grade }))
		.catch(err => next(err));
}
