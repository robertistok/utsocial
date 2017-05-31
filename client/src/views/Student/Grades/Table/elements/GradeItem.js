import React from 'react'; import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react';
import styled from 'styled-components';

import Grade from '../../../../../components/Grades/Grade';

const GradeItem = (props) => {
  const { gradeObj } = props;

  return (
    <GradeCell>
      <Grade grade={gradeObj !== undefined ? gradeObj.grade : ''} />
    </GradeCell>
  );
};

const { number, shape } = PropTypes;
GradeItem.propTypes = {
  gradeObj: shape({ grade: number })
};

const GradeCell = styled(Table.Cell)`
padding: 0px !important;
`;

export default GradeItem;
