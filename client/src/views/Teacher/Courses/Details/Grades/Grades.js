import React from 'react'; import PropTypes from 'prop-types'
import { Accordion } from 'semantic-ui-react';

import Filter from './elements/Filter';
import GradesTableContainer from './elements/GradesTable';
import {
  StyledAccordionTitle,
  StyledAccordionContent
} from '../../../../../components/Courses/styled-components';

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

const { func, bool } = PropTypes;
Grades.propTypes = {
  toggle: func.isRequired,
  toggledOn: bool.isRequired
};

export default Grades;
