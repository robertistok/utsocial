import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import styled from 'styled-components';

import Grade from '../../../components/Grades/Grade';

const GradeItem = (props) => {
  const { gradeObj, type, gradesList } = props;

  let grade = '';
  if (type === 'final' && gradesList !== undefined && gradesList.length > 0) {
    grade = gradesList.find(grade => grade.type === 'final').grade;
  } else {
    grade = gradeObj !== undefined ? gradeObj.grade : '';
  }

  return (
    <GradeCell>
      <Grade isStudent grade={grade} />
    </GradeCell>
  );
};

const { number, shape, string, arrayOf } = PropTypes;
GradeItem.propTypes = {
  gradeObj: shape({ grade: number }),
  type: string.isRequired,
  gradesList: arrayOf(
    shape({ type: string.isRequired, grade: number.isRequired })
  )
};

const GradeCell = styled(Table.Cell)`
	padding: 0px !important;
`;

export default GradeItem;
