import React from 'react';
import { Table } from 'semantic-ui-react';
import styled from 'styled-components';

import Header from './elements/Header';
import Body from './elements/Body';

const GradesTable = (props) => {
  const {
    students,
    gradesList,
    selectedCourse: { course }
  } = props;

  const types = Object.keys(course.teachingTypes)
    .filter(type => course.teachingTypes[type] === true)
    .map(type => type);

  return (
    <StyledTable celled size="small">
      <Header types={types} cellDescription="Student" isNumbered />
      <Body students={students} gradesList={gradesList} />
    </StyledTable>
  );
};

const StyledTable = styled(Table)`
	display: table;
`;

export default GradesTable;
