/* eslint no-use-before-define: 0*/

import mongoose, { Schema } from 'mongoose';

const ScheduleSchema = new Schema({
	whom: {
		group: {
			type: Schema.Types.ObjectId,
			ref: 'group'
		},
		semigroup: String
	},
	who: {
		type: Schema.Types.ObjectId,
		ref: 'teacher'
	},
	what: {
		course: {
			type: Schema.Types.ObjectId,
			ref: 'course'
		},
		type: {
			type: String
		}
	},
	when: {
		day: {
			type: String,
			validate: {
				validator: t =>
					['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].includes(t),
				message: 'Stay real with those days'
			}
		},
		from: {
			type: Number,
			validate: {
				validator: type => type >= 8 && type <= 22,
				message: 'Students have life outside of the unviersity too..'
			}
		},
		duration: {
			type: Number,
			validate: {
				validator: type => type >= 1 && type <= 4,
				message: 'Minimum 1 and maximum 4'
			}
		},
		frequency: {
			type: Number,
			validate: {
				validator: type => [0, 1, 2].indexOf(type) > -1,
				message: '0 for each, 1 for even and 2 for odd'
			}
		}
	},
	where: String
});

ScheduleSchema.pre('save', function customValidation(next) {
	const semigroupOperator = this.whom.semigroup === '0'
		? ['0', '1', '2']
		: ['0', this.whom.semigroup];
	const frequencyOperator = this.when.frequency === '0'
		? ['0', '1', '2']
		: ['0', this.when.frequency];

	const queryForType = {
		'whom.group': this.whom.group,
		'whom.semigroup': { $in: semigroupOperator },
		'what.course': this.what.course,
		'what.type': this.what.type
	};
	const verifyIfTypeExists = Schedule.find(queryForType);

	const queryForAvailibility = {
		'whom.group': this.whom.group,
		'whom.semigroup': { $in: semigroupOperator },
		'when.day': this.when.day,
		'when.from': {
			$gte: this.when.from,
			$lt: this.when.from + this.when.duration
		},
		'when.frequency': { $in: frequencyOperator }
	};
	const verifyIfAvailable = Schedule.find(queryForAvailibility);

	Promise.all([verifyIfTypeExists, verifyIfAvailable])
		.then((results) => {
			const [isType, isAvailable] = results;
			if (isType.length !== 0 && isAvailable.length !== 0) {
				next(new Error('Everything went wrong, better try from scratch'));
			} else if (isType.length !== 0) {
				next(
					new Error('A schedule already exists for this type of combination')
				);
			} else if (isAvailable.length !== 0) {
				next(new Error('The group is busy for the selected period'));
			} else {
				next();
			}
		})
		.catch(err => next(err));
});

const Schedule = mongoose.model('schedule', ScheduleSchema);

export default Schedule;
