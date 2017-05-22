import React from 'react';
import { Table } from 'semantic-ui-react';
import styled from 'styled-components';

import Header from './elements/Header';
import Body from './elements/Body';

const AttendanceTable = (props) => {
  const { dates, attendance: { attendanceList } } = props;

  return (
    <StyledTable celled>
      <Header />
      <Body dates={dates} attendanceList={attendanceList} />
    </StyledTable>
  );
};

const { arrayOf, shape, string } = React.PropTypes;
AttendanceTable.propTypes = {
  dates: arrayOf(shape({ day: string.isRequired }).isRequired).isRequired,
  attendance: shape(
    arrayOf(shape({ enteredFor: string.isRequired })).isRequired
  ).isRequired
};

const StyledTable = styled(Table)`
	display: table;
	width: 70% !important;
`;

export default AttendanceTable;
