const Schedule = require('../models/schedule');

function addNew(req, res) {
	const {
		group,
		semigroup,
		teacher,
		course,
		type,
		day,
		from,
		duration,
		frequency,
		where
	} = req.body;
	const schedule = new Schedule({
		whom: {
			group,
			semigroup
		},
		who: teacher,
		what: {
			course,
			type
		},
		when: {
			day,
			from,
			duration: parseInt(duration, 10),
			frequency
		},
		where
	});

	schedule
		.save()
		.then(() => {
			Schedule.populate(schedule, 'what.course').then(schedulePop =>
				res.send(schedulePop)
			);
		})
		.catch(err => res.status(500).json({ message: err.message }));
}

function getOne(req, res, next) {
	const { id } = req.params;

	Schedule.find({ 'whom.group': id })
		.populate([
			{
				path: 'what.course',
				select: 'name'
			},
			{
				path: 'who',
				select: 'firstname lastname email'
			},
			{
				path: 'whom.group',
				select: 'id'
			}
		])
		.then(schedules => res.send(schedules))
		.catch(err => next(err));
}

function getForTeacher(req, res, next) {
	const { id: teacherID } = req.params;

	Schedule.find({ who: teacherID })
		.populate([
			{
				path: 'what.course',
				select: 'name'
			},
			{
				path: 'who',
				select: 'firstname lastname email'
			},
			{
				path: 'whom.group',
				select: 'id'
			}
		])
		.then(schedules => res.send(schedules))
		.catch(err => next(err));
}

module.exports = {
	addNew,
	getOne,
	getForTeacher
};
