import moment from 'moment';

export const SEMIGROUP = {
  BOTH: '0',
  FIRST: '1',
  SECOND: '2'
};

export const FREQUENCY = {
  BOTH: '0',
  ODD: '1',
  EVEN: '2'
};

export const MODALS = {
  ADD_SCHEDULE: 'modals/add-schedule',
  SHOW_SCHEDULE: 'modals/show-schedule',
  CONFIRM_ACTION: 'modals/confirm-action'
};

export const DAYS = [
  {
    key: 'Monday',
    text: 'Monday',
    value: 'Monday'
  },
  {
    key: 'Tuesday',
    text: 'Tuesday',
    value: 'Tuesday'
  },
  {
    key: 'Wednesday',
    text: 'Wednesday',
    value: 'Wednesday'
  },
  {
    key: 'Thursday',
    text: 'Thursday',
    value: 'Thursday'
  },
  {
    key: 'Friday',
    text: 'Friday',
    value: 'Friday'
  }
];

export const HOURS = [
  {
    key: 8,
    text: '08:00',
    value: 8
  },
  {
    key: 10,
    text: '10:00',
    value: 10
  },
  {
    key: 12,
    text: '12:00',
    value: 12
  },
  {
    key: 14,
    text: '14:00',
    value: 14
  },
  {
    key: 16,
    text: '16:00',
    value: 16
  },
  {
    key: 18,
    text: '18:00',
    value: 18
  },
  {
    key: 20,
    text: '20:00',
    value: 20
  }
];

export const FIRST_WEEK = moment('2017-02-27');
export const LAST_WEEK = moment('2017-02-27').add(13, 'weeks');
