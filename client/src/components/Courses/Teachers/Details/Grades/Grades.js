import React from 'react';
import { Accordion } from 'semantic-ui-react';

import Filter from './elements/Filter';
import GradesTableContainer from './elements/GradesTable';
import { StyledAccordionTitle } from '../elements/styled';

const Grades = (props) => {
  const { toggledOn, toggle } = props;

  return (
    <div>
      <StyledAccordionTitle
        onClick={toggle}
        active={toggledOn}
        content="Grades"
      />
      <Accordion.Content active={toggledOn}>
        <Filter {...props} />
        <GradesTableContainer />
      </Accordion.Content>
    </div>
  );
};

export default Grades;
