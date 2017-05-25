import React from 'react';
import { Table } from 'semantic-ui-react';
import styled from 'styled-components';

import Grade from '../../../../../../../../../components/Grades/Grade';
import GradeInput
  from '../../../../../../../../../components/Grades/GradeInput';

const GradeItem = (props) => {
  const {
    error,
    editing,
    edited,
    grade,
    onGradeChange,
    onGradeBlur,
    editGrade
  } = props;

  return (
    <GradeCell
      error={error}
      className={`${editing ? 'editing' : ''} ${edited ? 'edited' : ''}`}
    >
      {editing
        ? <GradeInput
            grade={grade}
            error={error}
            onChange={onGradeChange}
            onBlur={onGradeBlur}
          />
        : <Grade onClick={editGrade} grade={grade} />}
    </GradeCell>
  );
};

const { number, bool, func, oneOfType, string } = React.PropTypes;
GradeItem.propTypes = {
  error: bool.isRequired,
  editing: bool.isRequired,
  edited: bool.isRequired,
  grade: oneOfType([string, number]).isRequired,
  onGradeChange: func.isRequired,
  onGradeBlur: func.isRequired,
  editGrade: func.isRequired
};

const GradeCell = styled(Table.Cell)`
padding: 0px !important;
`;

export default GradeItem;
