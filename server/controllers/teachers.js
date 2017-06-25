import Teacher from '../models/teacher';
import Schedule from '../models/schedule';

export function getTeachers(req, res, next) {
	Teacher.find({}).then(teachers => res.send(teachers)).catch(err => next(err));
}

export function getTeaching(req, res, next) {
	const id = req.params.id;
	Schedule.find({ who: id })
		.populate([{ path: 'what.course' }, { path: 'whom.group', select: 'lang' }])
		.then((schedules) => {
			const courses = schedules.reduce((acc, schedule) => {
				if (
					acc.length === 0 ||
					acc.find(
						item =>
							JSON.stringify(item._id) ===
								JSON.stringify(schedule.what.course._id) &&
							item.lang === schedule.whom.group.lang
					) === undefined
				) {
					return [
						...acc,
						{ ...schedule.what.course.toJSON(), lang: schedule.whom.group.lang }
					];
				}
				return acc;
			}, []);
			res.send({ courses, schedules });
		})
		.catch(err => next(err));
}

export function getColleagues(req, res, next) {
	const { courses, teacherID } = req.body;

	Schedule.find({
		'what.course': { $in: courses },
		who: { $ne: teacherID }
	})
		.populate([{ path: 'who', select: 'firstname lastname name' }])
		.then((schedules) => {
			if (schedules === []) {
				return res.send({ teachers: [] });
			}
			const uniqueTeachers = schedules.reduce((acc, schedule) => {
				if (
					acc.length === 0 ||
					acc.find(
						item =>
							JSON.stringify(item._id) === JSON.stringify(schedule.who._id)
					) === undefined
				) {
					return [...acc, { ...schedule.who.toJSON() }];
				}
				return acc;
			}, []);

			return res.send({ teachers: uniqueTeachers, schedules });
		})
		.catch(err => next(err));
}
