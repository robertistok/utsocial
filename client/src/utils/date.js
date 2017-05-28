import moment from 'moment';

import { LAST_WEEK } from '../utils/constants';

export function getDatesForSchedules(scheduleDay) {
  const firstWeek = moment('2017-02-27');

  const dates = [];
  while (firstWeek.week() <= LAST_WEEK.week()) {
    dates.push({
      day: firstWeek.day(scheduleDay).format('DD/MM'),
      timestamp: firstWeek.day(scheduleDay)
    });
    firstWeek.add(1, 'weeks');
  }

  return dates;
}
