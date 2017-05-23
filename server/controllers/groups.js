const Group = require('../models/group');

function getGroupsFromYear(req, res, next) {
	const { year } = req.params;

	const query = {};
	query.year = year === 'all' ? [1, 2, 3, 4] : year;

	Group.find(query)
		.then((groups) => {
			res.send(groups);
		})
		.catch(err => next(err));
}

function getGroupsForCourse(req, res, next) {}

function getGroupById(req, res, next) {
	Group.findById(req.body.id)
		.populate({
			path: 'courses',
			match: { semester: { $eq: 2 } },
			populate: {
				path: 'teachers.lecture teachers.seminar teachers.lab teachers.project',
				model: 'teacher'
			}
		})
		.then(group => res.send(group))
		.catch(err => next(err));
}

function getStudents(req, res, next) {
	const { id } = req.params;
	Group.findOne({ _id: id }, ['students'])
		.populate('students')
		.then(students => res.send(students))
		.catch(err => next(err));
}

module.exports = {
	getGroupsFromYear,
	getGroupById,
	getStudents
};
