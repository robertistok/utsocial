import Schedule from '../models/schedule';

export function addNew(req, res) {
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
		.then(savedSchedule => Schedule.populate(savedSchedule, 'what.course'))
		.then(schedulePop => res.send(schedulePop))
		.catch(err => res.status(500).json({ message: err.message }));
}

export function getOne(req, res, next) {
	const { id } = req.params;

	Schedule.find({ $or: [{ 'whom.group': id }, { who: id }] })
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

export function getForTeacher(req, res, next) {
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
