import React from 'react'; import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react';
import styled from 'styled-components';

import Header from './elements/Header';
import Body from './elements/Body';

const AttendanceTable = (props) => {
  const {
    attendance: { attendanceList, students },
    removeAttendance,
    addAttendance,
    dates
  } = props;

  return (
    <StyledTable celled size="small">
      <Header dates={dates} cellDescription="Student" isNumbered />
      <Body
        students={students}
        dates={dates}
        attendanceList={attendanceList}
        removeAttendance={removeAttendance}
        addAttendance={addAttendance}
      />

    </StyledTable>
  );
};

const { string, shape, arrayOf, func } = PropTypes;
AttendanceTable.propTypes = {
  attendance: shape({
    students: arrayOf(
      shape({
        name: string.isRequired
      })
    ).isRequired,
    attendanceList: arrayOf(
      shape({
        enteredFor: string.isRequired,
        _id: string.isRequired
      })
    )
  }),
  dates: arrayOf(
    shape({
      day: string.isRequired
    })
  ).isRequired,
  addAttendance: func.isRequired,
  removeAttendance: func.isRequired
};

const StyledTable = styled(Table)`
	display: table;
`;

export default AttendanceTable;
