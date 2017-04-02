const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
  whom: {
    group: {
      type: Schema.Types.ObjectId,
      ref: 'group'
    },
    semiGroup: String
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
    type: String
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
    freq: {
      type: Number,
      validate: {
        validator: type => [0, 1, 2].indexOf(type) > -1,
        message: '0 for each, 1 for even and 2 for odd'
      }
    }
  },
  where: String
});

const Schedule = mongoose.model('schedule', ScheduleSchema);
module.exports = Schedule;
