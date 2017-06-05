import React from 'react';
import PropTypes from 'prop-types';
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

const { number, shape, arrayOf, string, object, oneOfType } = PropTypes;
Semester.propTypes = {
  semester: number.isRequired,
  courses: object,
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
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin: 15px;
`;

export default Semester;
