import React from 'react'; import PropTypes from 'prop-types'
import styled from 'styled-components';

import Semester from './elements/Semester';

const Table = (props) => {
  const { visibleCourses, gradesList } = props;

  return (
    <Wrapper semesters={Object.keys(visibleCourses).length}>
      {visibleCourses[1] !== undefined &&
        <Semester
          semester={1}
          courses={visibleCourses[1]}
          gradesList={gradesList}
        />}

      {visibleCourses[2] !== undefined &&
        <Semester
          semester={2}
          courses={visibleCourses[2]}
          gradesList={gradesList}
        />}

    </Wrapper>
  );
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: ${props => props.semesters === 2 ? 'space-around' : 'center'};
`;

export default Table;
