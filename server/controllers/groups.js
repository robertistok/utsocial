const Group = require('../models/group');
const Course = require('../models/course');

function getGroups(req, res, next) {
	Group.find({})
		.then((groups) => {
			res.send(groups);
		})
		.catch(err => next(err));
}

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
	getGroups,
	getGroupById,
	getStudents
};
