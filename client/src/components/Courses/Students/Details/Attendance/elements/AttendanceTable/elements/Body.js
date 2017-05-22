import React from 'react';
import { Table } from 'semantic-ui-react';
import moment from 'moment';

import AttendanceRow from './AttendanceRow';

const todayIsBefore = date => moment(date, 'DD/MM').isBefore(moment());

const Body = (props) => {
  const { attendanceList, dates } = props;

  return (
    <Table.Body>
      {dates.map(date => (
        <AttendanceRow
          key={date.day}
          hasAttendance={
            attendanceList.find(attendance =>
              moment(attendance.enteredFor).isSame(
                moment(date.day, 'DD/MM'),
                'day'
              )) !== undefined
          }
          isBeforeToday={todayIsBefore(date.day)}
          forDate={date.day}
        />
      ))}
    </Table.Body>
  );
};

const { arrayOf, shape, string } = React.PropTypes;
Body.propTypes = {
  dates: arrayOf(shape({ day: string.isRequired }).isRequired).isRequired,
  attendanceList: arrayOf(shape({ enteredFor: string.isRequired })).isRequired
};

export default Body;
