'use strict';

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ScheduleSchema = new Schema({
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
        validator: function validator(t) {
          return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].includes(t);
        },
        message: 'Stay real with those days'
      }
    },
    from: {
      type: Number,
      validate: {
        validator: function validator(type) {
          return type >= 8 && type <= 22;
        },
        message: 'Students have life outside of the unviersity too..'
      }
    },
    duration: {
      type: Number,
      validate: {
        validator: function validator(type) {
          return type >= 1 && type <= 4;
        },
        message: 'Minimum 1 and maximum 4'
      }
    },
    frequency: {
      type: Number,
      validate: {
        validator: function validator(type) {
          return [0, 1, 2].indexOf(type) > -1;
        },
        message: '0 for each, 1 for even and 2 for odd'
      }
    }
  },
  where: String
});

ScheduleSchema.pre('save', function (next) {
  var semigroupOperator = this.whom.semigroup === '0' ? ['0', '1', '2'] : ['0', this.whom.semigroup];
  var frequencyOperator = this.whom.semigroup === '0' ? ['0', '1', '2'] : ['0', this.whom.semigroup];

  var queryForType = {
    'whom.group': this.whom.group,
    'whom.semigroup': { $in: semigroupOperator },
    'what.course': this.what.course,
    'what.type': this.what.type
  };
  var verifyIfTypeExists = Schedule.find(queryForType);

  var queryForAvailibility = {
    'whom.group': this.whom.group,
    'whom.semigroup': { $in: semigroupOperator },
    'when.day': this.when.day,
    'when.from': {
      $gte: this.when.from,
      $lte: this.when.from + this.when.duration
    },
    'when.frequency': { $in: frequencyOperator }
  };
  var verifyIfAvailable = Schedule.find(queryForAvailibility);

  _promise2.default.all([verifyIfTypeExists, verifyIfAvailable]).then(function (results) {
    var _results = (0, _slicedToArray3.default)(results, 2),
        isType = _results[0],
        isAvailable = _results[1];

    if (isType.length !== 0 && isAvailable.length !== 0) {
      next(new Error('Everything went wrong, better try from scratch'));
    } else if (isType.length !== 0) {
      next(new Error('A schedule already exists for this type of combination'));
    } else if (isAvailable.length !== 0) {
      next(new Error('The group is busy for the selected period'));
    } else {
      next();
    }
  }).catch(function (err) {
    return next(err);
  });
});

var Schedule = mongoose.model('schedule', ScheduleSchema);

module.exports = Schedule;