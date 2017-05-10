import React from 'react';
import styled from 'styled-components';

import CourseCard from './elements/CourseCard';

const Overview = (props) => {
  const { courses } = props;

  return (
    <Wrapper>
      {courses.map(course => <CourseCard key={course._id} {...course} />)}
    </Wrapper>
  );
};

const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
`;

export default Overview;
