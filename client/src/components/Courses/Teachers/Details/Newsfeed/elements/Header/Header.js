import React, { PropTypes } from 'react';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';

import NewPostFormContainer from './elements/NewPostForm';
import Filter from './elements/Filter';

const Header = (props) => {
  const {
    toggle: writePost,
    toggledOn: writingPost,
    selectedCourseTeachingTypes,
    filterNewsfeed
  } = props;

  return (
    <Wrapper writingPost={writingPost}>
      <Filter types={selectedCourseTeachingTypes} onChange={filterNewsfeed} />
      {writingPost
        ? <StyledButton
            content="Discard post..."
            icon="delete"
            labelPosition="right"
            onClick={writePost}
          />
        : <StyledButton
            content="Write a new post..."
            icon="compose"
            labelPosition="right"
            onClick={writePost}
          />}
      {writingPost && <NewPostFormContainer className="headerItem" />}
    </Wrapper>
  );
};

const { bool, func } = PropTypes;
Header.propTypes = {
  toggle: func.isRequired,
  toggledOn: bool.isRequired
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: ${props => props.writingPost ? 'column' : 'row'};
	align-items: center;
`;

const StyledButton = styled(Button)`
	width: 180px;
	margin: 10px !important;
	height: 39px;
`;

export default Header;
