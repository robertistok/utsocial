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

			const { gradesList, numberOfGrades } = orderedStudents;

			return res.send({ gradesList, numberOfGrades });
		})
		.catch(err => next(err));
}

function getGradesListOfStudent(req, res, next) {
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
							list: [item]
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
							list: [...acc[course].list, item]
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
						list: [...acc[course].list, item]
					}
				};
			}, {});

			return res.send({ gradesList });
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
	getGradesListOfStudent,
	insertGrade,
	deleteGrade,
	updateGrade
};
