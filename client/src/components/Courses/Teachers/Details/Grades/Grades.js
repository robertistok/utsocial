import React from 'react';
import { Accordion } from 'semantic-ui-react';

import Filter from './elements/Filter';
import GradesTableContainer from './elements/GradesTable';

const Grades = (props) => {
  const { toggledOn, toggle } = props;

  return (
    <div>
      <Accordion.Title onClick={toggle} active={toggledOn} content="Grades" />
      <Accordion.Content active={toggledOn}>
        <Filter {...props} />
        <GradesTableContainer />
      </Accordion.Content>
    </div>
  );
};

export default Grades;
