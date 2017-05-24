import React from 'react';
import styled from 'styled-components';

import CourseCard from '../../../../components/Courses/Overview/CourseCard';

const Overview = (props) => {
  const { courses } = props;

  return (
    <Wrapper>
      {courses.map(course => (
        <CourseCard key={course._id + course.lang} {...course} />
      ))}
    </Wrapper>
  );
};

const { string, shape, arrayOf, number } = React.PropTypes;
Overview.propTypes = {
  courses: arrayOf(
    shape({
      name: string.isRequired,
      year: number.isRequired,
      semester: number.isRequired,
      lang: string.isRequired,
      _id: string.isRequired
    }).isRequired
  ).isRequired
};

const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	align-items: center;
`;

export default Overview;
