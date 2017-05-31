/* eslint-disable no-param-reassign */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StudentSchema = new Schema(
	{
		CNP: String,
		username: String,
		email: String,
		firstname: String,
		lastname: String,
		gender: String,
		phone: Number,
		dateOfBirth: Date,
		countyOfOrigin: String,
		militaryStatus: String,
		maritalStatus: String,
		nationality: String,
		bankAccount: String,
		identificationNumber: {
			type: Number,
			unique: true
		},
		group: {
			type: Schema.Types.ObjectId,
			ref: 'group'
		},
		semigroup: Number,
		grades: [
			{
				type: Schema.Types.ObjectId,
				ref: 'grade'
			}
		],
		attendance: [
			{
				type: Schema.Types.ObjectId,
				ref: 'attendance'
			}
		]
	},
	{
		toObject: { virtuals: true },
		toJSON: { virtuals: true }
	}
);

StudentSchema.virtual('name').get(function getName() {
	return `${this.firstname} ${this.lastname}`;
});

StudentSchema.virtual('perf').get(function setPerformance() {
	let semesters = 0;
	let totalCredits = 0; // keeps track of all the credits a student should have
	return this.grades.sort((a, b) => a.course.code - b.course.code).reduce((
		perf,
		item,
		index
	) => {
		const { credits, code } = item.course;
		const { grade } = item;
		const yearIndex = item.course.year;
		const semesterIndex = item.course.semester;
		totalCredits += credits;

		if (!perf.year[yearIndex]) {
			perf.year[yearIndex] = { semester: {} };
		}

		if (!perf.year[yearIndex].semester[semesterIndex]) {
			semesters += 1;
			perf.year[yearIndex].semester[semesterIndex] = {
				gpa: 0,
				credits: 0,
				examsLeft: [] // here I put the code of the exam, which the student did not pass
			};
		}

		if (grade < 5) {
			perf.year[yearIndex].semester[semesterIndex].examsLeft.push(code);
		} else {
			// total earned credits
			perf.year[yearIndex].semester[semesterIndex].credits += credits;
			// weighted sum of the grades
			perf.year[yearIndex].semester[semesterIndex].gpa += grade * credits;
			perf.credits += credits;
		}

		// when change between semesters, divide the gpa
		if (totalCredits % 30 === 0) {
			const semesterGpa = parseFloat(
				(perf.year[yearIndex].semester[semesterIndex].gpa / 30).toFixed(2)
			);
			perf.year[yearIndex].semester[semesterIndex].gpa = semesterGpa;
			perf.gpa += semesterGpa;
		}

		// when arrived at the end of all semesters, get the total gpa
		if (index === this.grades.length - 1) {
			perf.gpa = (perf.gpa / semesters).toFixed(2);
		}

		return perf;
	}, { year: {}, gpa: 0, credits: 0 });
});

const Student = mongoose.model('student', StudentSchema);
module.exports = Student;
