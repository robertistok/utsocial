import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CourseRow from './CourseRow';

const Semester = (props) => {
  const { courses, semester, gradesList } = props;

  return (
    <Wrapper>
      <SemesterNumber>Semester {semester}</SemesterNumber>
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
	align-items: center;
	margin: 30px;
	width: 80%;
	border: ${props => props.theme.separator};
`;

const SemesterNumber = styled.span`
	width: 100%;
	text-align: center;
	font-size: 17px;
	font-weight: bolder;
	border-bottom: ${props => props.theme.separator};
	padding: 20px;
	margin-bottom: 20px;

	@media screen and (max-width: 768px) {
		font-size: 15px;
	}
`;

export default Semester;
