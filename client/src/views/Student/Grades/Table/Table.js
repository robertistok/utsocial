import React from 'react';
import PropTypes from 'prop-types';
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

const {
  shape,
  string,
  number,
  objectOf,
  bool,
  arrayOf,
  oneOfType,
  object
} = PropTypes;
Table.propTypes = {
  visibleCourses: objectOf(
    objectOf(
      shape({
        _id: string.isRequired,
        credits: number.isRequired,
        name: string.isRequired,
        semester: number.isRequired,
        teachingTypes: shape({
          lab: bool,
          lecture: bool,
          seminar: bool,
          project: bool
        }).isRequired
      }).isRequired
    )
  ).isRequired,
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
	flex-direction: row;
	justify-content: ${props => props.semesters === 2 ? 'space-around' : 'center'};
`;

export default Table;
