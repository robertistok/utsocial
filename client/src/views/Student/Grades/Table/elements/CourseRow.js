import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import styled from 'styled-components';

import Header from '../../../../../components/Grades/TableHeader';
import GradeRow from '../../../../../components/Grades/GradeRow';
import GradeItem from './GradeItem';

const CourseRow = (props) => {
  const {
    teachingTypes,
    name,
    credits,
    gradesList: { numberOfGrades, list }
  } = props;

  const types = [
    ...Object.keys(teachingTypes).filter(type => teachingTypes[type] === true),
    'final'
  ];

  return (
    <Wrapper>
      <Info>
        <MaterialName>{name}</MaterialName>
        <CreditsNumber>{credits} credits</CreditsNumber>
      </Info>
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
            gradesList={list}
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

const { number, shape, arrayOf, string, bool } = PropTypes;

const gradeShape = shape({
  _id: string.isRequired,
  grade: number.isRequired,
  group: string.isRequired,
  student: string.isRequired,
  enteredOn: string.isRequired,
  course: string.isRequired,
  assignor: string.isRequired,
  type: string.isRequired
});

CourseRow.propTypes = {
  name: string.isRequired,
  credits: number.isRequired,
  teachingTypes: shape({
    lab: bool,
    lecture: bool,
    seminar: bool,
    project: bool
  }).isRequired,
  gradesList: shape({
    list: shape({
      final: arrayOf(gradeShape),
      lecture: arrayOf(gradeShape),
      lab: arrayOf(gradeShape),
      seminar: arrayOf(gradeShape),
      project: arrayOf(gradeShape)
    }),
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
	width: 100%;
	margin-bottom: 20px;
	padding-bottom: 30px;
	border-bottom: ${props => props.theme.separator};
`;

const Info = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-bottom: 10px;
`;

const MaterialName = styled.span`
	display: inline-block;
	width: 100%;
	text-align: center;
	font-weight: bold;
`;

const CreditsNumber = styled.span`
	display: inline-block;
	width: 100%;
	text-align: center`;

const StyledTable = styled(Table)`
	display: table;
	width: 80% !important;
	margin: 0px auto !important;
`;

export default CourseRow;
