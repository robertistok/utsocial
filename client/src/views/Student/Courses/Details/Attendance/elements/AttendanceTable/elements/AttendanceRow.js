/* eslint no-nested-ternary: 0*/
import React from 'react';
import { Table } from 'semantic-ui-react';

const AttendanceRow = (props) => {
  const { hasAttendance, forDate, isBeforeToday } = props;

  return (
    <Table.Row>
      <Table.Cell>{forDate}</Table.Cell>
      <Table.Cell
        positive={isBeforeToday && hasAttendance}
        negative={isBeforeToday && !hasAttendance}
        textAlign="center"
      >
        <span>
          {isBeforeToday ? hasAttendance ? 'pres' : 'abs' : 'next'}
        </span>
      </Table.Cell>
    </Table.Row>
  );
};

const { string, bool } = React.PropTypes;
AttendanceRow.propTypes = {
  isBeforeToday: bool.isRequired,
  hasAttendance: bool.isRequired,
  forDate: string.isRequired
};

export default AttendanceRow;
