import moment from 'moment';

export const formatTime = (timestamp) => {
  const today = moment();
  const toCompare = moment(timestamp);

  // year
  if (today.year() === toCompare.year()) {
    // week
    if (today.week() === toCompare.week()) {
      if (today.day() === toCompare.day()) {
        return toCompare.format('HH:mm');
      }
      return toCompare.format('ddd');
    } else if (
      today.week() - 1 === toCompare.week() &&
      today.day() - toCompare.day() !== 0
    ) {
      return toCompare.format('ddd');
    }
    return toCompare.format('DD MMMM');
  }
  return toCompare.format('DD/MM/YY');
};
