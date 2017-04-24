import moment from 'moment';

export const formatTime = (timestamp) => {
  const current = moment();
  const toCompare = moment(timestamp);

  // year
  if (current.year() === toCompare.year()) {
    // week
    if (current.week() === toCompare.week()) {
      if (current.day() === toCompare.day()) {
        return toCompare.format('HH:mm');
      }
      return toCompare.format('ddd');
    } else if (
      current.week() - 1 === toCompare.week() &&
      current.day() - toCompare.day() !== 0
    ) {
      return toCompare.format('ddd');
    }
    return toCompare.format('DD MMMM');
  }
  return toCompare.format('DD/MM/YY');
};
