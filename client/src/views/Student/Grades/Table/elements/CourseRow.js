import React from 'react';
import PropTypes from 'prop-types';
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
    <Wrapper>
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
    </Wrapper>
  );
};

const { number, shape, arrayOf, string, object, oneOfType, bool } = PropTypes;
CourseRow.propTypes = {
  name: string.isRequired,
  teachingTypes: shape({
    lab: bool,
    lecture: bool,
    seminar: bool,
    project: bool
  }).isRequired,
  gradesList: shape({
    list: oneOfType([
      arrayOf(
        shape({
          _id: string.isRequired,
          grade: number.isRequired,
          group: string.isRequired,
          student: string.isRequired,
          enteredOn: string.isRequired,
          course: string.isRequired,
          assignor: string.isRequired,
          type: string.isRequired
        }).isRequired
      ),
      object
    ]),
    numberOfGrades: shape({
      lab: number,
      lecture: number,
      final: number,
      seminar: number,
      project: number
    })
  })
};

const Wrapper = styled.div`
	width: 80%;
	margin: 15px 0px;
`;

const StyledTable = styled(Table)`
	display: table;
	width: 100% !important;
`;

export default CourseRow;
