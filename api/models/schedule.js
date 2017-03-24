const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
  whom: {
    group: {
      type: Schema.Types.ObjectId,
      ref: 'group',
    },
    semiGroup: Number,
  },
  who: {
    type: Schema.Types.ObjectId,
    ref: 'teacher',
  },
  what: {
    type: Schema.Types.ObjectId,
    ref: 'course',
  },
  when: {
    day: {
      type: String,
      validate: {
        validator: type =>
          ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].indexOf(
            type,
          ) > -1,
        message: 'Stay real with those days',
      },
    },
    from: {
      type: Number,
      validate: {
        validator: type => type >= 8 && type <= 22,
        message: 'Students have life outside of the unviersity too..',
      },
    },
    freq: {
      type: Number,
      validate: {
        validator: type => [0, 1, 2].indexOf(type) > -1,
        message: '0 for each, 1 for even and 2 for odd',
      },
    },
  },
  where: String,
});

const Schedule = mongoose.model('schedule', ScheduleSchema);
module.exports = Schedule;
