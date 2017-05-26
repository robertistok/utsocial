import React from 'react';
import { Table } from 'semantic-ui-react';
import styled from 'styled-components';

import Header from '../../../../../../../components/Grades/TableHeader';
import Body from './elements/Body';

const GradesTable = (props) => {
  const {
    numberOfGrades,
    addColumnGrade,
    types
  } = props;

  return (
    <StyledTable celled collapsing structured>
      <Header
        types={types}
        cellDescription="Student"
        numberOfGrades={numberOfGrades}
        addColumnGrade={addColumnGrade}
        isTeacher
      />
      <Body {...props} types={types} />
    </StyledTable>
  );
};

const { func, object, arrayOf, string } = React.PropTypes;
GradesTable.propTypes = {
  addColumnGrade: func.isRequired,
  numberOfGrades: object.isRequired,
  types: arrayOf(string).isRequired
};

const StyledTable = styled(Table)`
	display: table;
`;

export default GradesTable;
