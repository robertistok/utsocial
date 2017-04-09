import React from 'react';

const ScheduleItem = ({ hour, week, semigroup, schedule, onClick }) => (
  <div
    className={`class ${schedule.what.type}`}
    onClick={onClick}
    data-schedule={JSON.stringify(schedule)}
  >
    {schedule.what.course.name.match(/\b([A-Z0-9])/g).join('')}
  </div>
);

export default ScheduleItem;
