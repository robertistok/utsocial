import React, { PropTypes } from 'react';
import styled from 'styled-components';

import Filter from '../../../../../../Newsfeed/Filter';

const Header = (props) => {
  const {
    selectedCourseTeachingTypes,
    filterNewsfeed
  } = props;

  return (
    <Wrapper>
      <Filter types={selectedCourseTeachingTypes} onChange={filterNewsfeed} />
    </Wrapper>
  );
};

const { bool, func, shape } = PropTypes;
Header.propTypes = {
  selectedCourseTeachingTypes: shape({
    lab: bool,
    lecture: bool,
    seminar: bool,
    project: bool
  }).isRequired,
  filterNewsfeed: func.isRequired
};

const Wrapper = styled.div`
	display: flex;
	align-items: center;
`;

export default Header;
