import React from 'react';
import { Accordion } from 'semantic-ui-react';

import {
  StyledAccordionTitle,
  StyledAccordionContent
} from '../../../../../components/Courses/styled-components';
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
        <Accordion.Content active>
          <StyledAccordionContent>
            <HeaderContainer />
            <PostListContainer />
          </StyledAccordionContent>
        </Accordion.Content>}
    </div>
  );
};

const { bool, func } = React.PropTypes;
Newsfeed.propTypes = {
  toggle: func.isRequired,
  toggledOn: bool.isRequired
};

export default Newsfeed;
