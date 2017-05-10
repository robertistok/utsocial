const Teacher = require('../models/teacher');
const Schedule = require('../models/schedule');

function getTeachers(req, res, next) {
	Teacher.find({}).then(teachers => res.send(teachers)).catch(err => next(err));
}

function getTeaching(req, res, next) {
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

module.exports = { getTeachers, getTeaching };
