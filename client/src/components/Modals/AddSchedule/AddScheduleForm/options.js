import { FREQUENCY } from '../../../../utils/constants';

export const courseOptions = course => ({
  key: course._id,
  text: course.name,
  value: course._id
});

export const teacherOptions = teacher => ({
  key: teacher._id,
  text: `${teacher.firstname} ${teacher.lastname}`,
  value: teacher._id
});

export const frequencyOptions = () =>
  Object.keys(FREQUENCY).map(freq => ({
    key: freq,
    text: freq.toLowerCase(),
    value: FREQUENCY[freq]
  }));
