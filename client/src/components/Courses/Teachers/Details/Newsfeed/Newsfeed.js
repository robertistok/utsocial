import React from 'react';
import { Accordion } from 'semantic-ui-react';
import styled from 'styled-components';

import { StyledAccordionTitle } from '../elements/styled';
import NewPostContainer from './elements/NewPost';
import PostListContainer from './elements/PostList';

const Newsfeed = (props) => {
  const { toggle, toggledOn } = props;

  return (
    <div>
      <StyledAccordionTitle
        onClick={toggle}
        active={toggledOn}
        content="Newsfeed"
      />

      {toggledOn &&
        <StyledAccordionContent active>
          <NewPostContainer />
          <PostListContainer />
        </StyledAccordionContent>}
    </div>
  );
};

const { string, bool, func, shape } = React.PropTypes;
Newsfeed.propTypes = {
  toggle: func.isRequired,
  toggledOn: bool.isRequired
};

const StyledAccordionContent = styled(Accordion.Content)`
	display: flex !important;
	align-items: center;
	flex-direction: column;
`;

export default Newsfeed;