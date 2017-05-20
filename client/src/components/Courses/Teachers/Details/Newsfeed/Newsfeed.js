import React from 'react';
import { Accordion } from 'semantic-ui-react';
import styled from 'styled-components';

import {
  StyledAccordionTitle,
  StyledAccordionContent
} from '../elements/styled';
import HeaderContainer from './elements/Header';
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
          <HeaderContainer />
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

const Header = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 20px !important;
`;

export default Newsfeed;
