const Course = require('../models/course');
const Schedule = require('../models/schedule');

function getCourseGroups(req, res, next) {
	const { lang, courseID } = req.params;
	Schedule.find({ 'what.course': courseID }, [
		'whom.group',
		'when',
		'what.type'
	])
		.populate({
			path: 'whom.group',
			select: 'id lang',
			match: { lang }
		})
		.then((schedules) => {
			const filteredSchedules = schedules.filter(
				scheduleItem => scheduleItem.whom.group !== null
			);
			const groups = filteredSchedules.reduce((acc, scheduleItem) => {
				if (
					acc.length === 0 ||
					acc.find(item => item.id === scheduleItem.whom.group.id) === undefined
				) {
					return [
						...acc,
						{
							id: scheduleItem.whom.group.id,
							_id: scheduleItem.whom.group._id
						}
					];
				}
				return acc;
			}, []);

			res.send({
				groups,
				schedules: filteredSchedules.map(item => ({
					whom: item.whom.group._id,
					type: item.what.type,
					frequency: item.when.frequency,
					day: item.when.day
				}))
			});
		})
		.catch(err => next(err));
}

module.exports = {
	getCourseGroups
};
