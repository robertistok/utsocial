import React from 'react'; import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react';
import styled from 'styled-components';

import Header from '../../../../../components/Grades/TableHeader';
import GradeRow from '../../../../../components/Grades/GradeRow';
import GradeItem from './GradeItem';

const CourseRow = (props) => {
  const { teachingTypes, name, gradesList } = props;

  const types = Object.keys(teachingTypes).filter(
    type => teachingTypes[type] === true
  );

  const numberOfGrades = gradesList.numberOfGrades;

  return (
    <div>
      {name}
      <StyledTable celled collapsing structured size="small">
        <Header
          types={types}
          withName={false}
          isNumbered={false}
          numberOfGrades={numberOfGrades}
          isTeacher={false}
          size="small"
        />
        <Table.Body>
          <GradeRow
            gradesList={gradesList.list}
            types={types}
            numberOfGrades={numberOfGrades}
            component={GradeItem}
            numbered={false}
            withName={false}
          />
        </Table.Body>
      </StyledTable>
    </div>
  );
};

const StyledTable = styled(Table)`
	display: table;
`;

export default CourseRow;
