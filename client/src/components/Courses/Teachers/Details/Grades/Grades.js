import React from 'react';
import { Accordion } from 'semantic-ui-react';

import Filter from './elements/Filter';
import GradesTableContainer from './elements/GradesTable';
import {
  StyledAccordionTitle,
  StyledAccordionContent
} from '../elements/styled';

const Grades = (props) => {
  const { toggledOn, toggle } = props;

  return (
    <div>
      <StyledAccordionTitle
        onClick={toggle}
        active={toggledOn}
        content="Grades"
      />
      {toggledOn &&
        <Accordion.Content active>
          <StyledAccordionContent>
            <Filter {...props} />
            <GradesTableContainer />
          </StyledAccordionContent>
        </Accordion.Content>}
    </div>
  );
};

const { func, bool } = React.PropTypes;
Grades.propTypes = {
  toggle: func.isRequired,
  toggledOn: bool.isRequired
};

export default Grades;
