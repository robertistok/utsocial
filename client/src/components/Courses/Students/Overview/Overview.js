import React from 'react';
import styled from 'styled-components';

import CourseCard from '../../elements/Overview/CourseCard';

const Overview = (props) => {
  const { courses, lang } = props;

  return (
    <Wrapper>
      {courses.map(course => (
        <CourseCard key={course._id} {...course} student lang={lang} />
      ))}
    </Wrapper>
  );
};

const { string, shape, number, arrayOf } = React.PropTypes;
Overview.propTypes = {
  lang: string.isRequired,
  courses: arrayOf(
    shape({
      _id: string.isRequired,
      name: string.isRequired,
      year: number.isRequired,
      semester: number.isRequired,
      credits: number.isRequired
    }).isRequired
  ).isRequired
};

const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
`;

export default Overview;
