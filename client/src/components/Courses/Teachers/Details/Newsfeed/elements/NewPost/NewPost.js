import React, { PropTypes } from 'react';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';

import NewPostFormContainer from './elements/NewPostForm';

const NewPost = (props) => {
  const { toggle: writePost, toggledOn: writingPost } = props;

  if (!writingPost) {
    return (
      <StyledButton
        content="Write a new post..."
        icon="compose"
        labelPosition="right"
        onClick={writePost}
      />
    );
  }

  return (
    <Wrapper>
      <StyledButton
        content="Discard post..."
        icon="delete"
        labelPosition="right"
        onClick={writePost}
      />
      <NewPostFormContainer />
    </Wrapper>
  );
};

const { bool, func } = PropTypes;
NewPost.propTypes = {
  toggle: func.isRequired,
  toggledOn: bool.isRequired
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 20px;
`;

const StyledButton = styled(Button)`
	width: 300px;
	margin-bottom: 20px !important;
`;

export default NewPost;
