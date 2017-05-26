import React from 'react';
import styled from 'styled-components';

import CourseRow from './CourseRow';

const Semester = (props) => {
  const { courses, semester, gradesList } = props;

  return (
    <Wrapper>
      {semester}
      {Object.keys(courses).map(key => (
        <CourseRow
          key={key}
          {...courses[key]}
          gradesList={
            gradesList[key] !== undefined
              ? gradesList[key]
						: { numberOfGrades: {}, list: [] }
          }
        />
      ))}
    </Wrapper>
  );
};

const { number } = React.PropTypes;
Semester.propTypes = {
  semester: number.isRequired
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin: 15px;
`;

export default Semester;
