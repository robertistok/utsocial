import React from 'react';
import { Accordion } from 'semantic-ui-react';

import Filter from './elements/Filter';
import GradesTableContainer from './elements/GradesTable';

const Grades = (props) => {
  const { active } = props;

  return (
    <div>
      <Accordion.Title onClick={props.onClick} active={active}>
        Grades
      </Accordion.Title>
      <Accordion.Content active={active}>
        <Filter {...props} />
        <GradesTableContainer />
      </Accordion.Content>
    </div>
  );
};

export default Grades;
