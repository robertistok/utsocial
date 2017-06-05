import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';

import NewPostFormContainer from './NewPostForm';
import Filter from '../../../../../../../components/Newsfeed/Filter';
import { media } from '../../../../../../../utils/style-utils';

const Header = (props) => {
  const {
    toggle: writePost,
    toggledOn: writingPost,
    selectedCourseTeachingTypes,
    filterNewsfeed
  } = props;

  return (
    <Wrapper writingPost={writingPost}>
      {writingPost
        ? <StyledButton
            content="Discard"
            icon="delete"
            labelPosition="right"
            onClick={writePost}
          />
        : <StyledButton
            content="New"
            icon="compose"
            labelPosition="right"
            onClick={writePost}
          />}
      <Filter types={selectedCourseTeachingTypes} onChange={filterNewsfeed} />
      {writingPost &&
        <NewPostFormContainer
          className="headerItem"
          hideContainer={writePost}
        />}
    </Wrapper>
  );
};

const { bool, func, shape } = PropTypes;
Header.propTypes = {
  toggle: func.isRequired,
  toggledOn: bool.isRequired,
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
	flex-direction: ${props => props.writingPost ? 'column' : 'row'};
	align-items: center;
`;

const StyledButton = styled(Button)`
	width: 120px;
	margin: 10px !important;
	height: 39px;
	font-size: 14px !important;

	${media.phone`
		font-size: 12px !important;
		`}
`;

export default Header;
