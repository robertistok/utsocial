import Grade from '../models/grade';

function getGradesListOfGroup(req, res, next) {
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
							gradesList: { ...newAcc.gradesList, [student]: [item] }
						};
					} else {
						newAcc = {
							...newAcc,
							gradesList: {
								...newAcc.gradesList,
								[student]: [...newAcc.gradesList[student], item]
							}
						};
					}

					return newAcc;
				},
				{ gradesList: {}, numberOfGrades: {} }
			);

			// const studentWithTheMostGrades = Object.keys(orderedStudents).sort(
			// 	(a, b) => orderedStudents[a].length < orderedStudents[b].length
			// )[0];
			//
			// const numberOfGrades = orderedStudents[
			// 	studentWithTheMostGrades
			// ].reduce((acc, grade) => {
			// 	const { type } = grade;
			//
			// 	if (acc[type] === undefined) {
			// 		return { ...acc, [type]: 1 };
			// 	}
			// 	return { ...acc, [type]: acc[type] + 1 };
			// }, {});

			const { gradesList, numberOfGrades } = orderedStudents;

			return res.send({ gradesList, numberOfGrades });
		})
		.catch(err => next(err));
}

function insertGrade(req, res, next) {
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

	newGrade.save().then(grade => res.send({ grade })).catch(err => next(err));
}

function deleteGrade(req, res, next) {
	const { id } = req.params;

	Grade.findOneAndRemove({ _id: id })
		.then(() => res.send({ message: 'success' }))
		.catch(err => next(err));
}

function updateGrade(req, res, next) {
	const { id, assignor, grade } = req.body;

	Grade.findOneAndUpdate(
		{ _id: id },
		{ $set: { assignor, grade } },
		{ new: true }
	)
		.then(grade => res.send({ grade }))
		.catch(err => next(err));
}

module.exports = {
	getGradesListOfGroup,
	insertGrade,
	deleteGrade,
	updateGrade
};
