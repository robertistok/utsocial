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

const StyledTable = styled(Table)`
	display: table;
	width: 70% !important;
`;

export default AttendanceTable;
