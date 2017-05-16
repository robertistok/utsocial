import React from 'react';
import { Accordion } from 'semantic-ui-react';

import { StyledAccordionTitle } from '../elements/styled';

import MaterialType from './elements/MaterialType';

const Materials = (props) => {
  const {
    toggledOn,
    toggle,
    selectedCourse: { course }
  } = props;

  return (
    <div>
      <StyledAccordionTitle
        onClick={toggle}
        active={toggledOn}
        content="Materials"
      />

      <Accordion.Content active={toggledOn}>
        {course.teachingTypes !== undefined &&
          Object.keys(course.teachingTypes)
					.filter(type => course.teachingTypes[type] === true)
					.map(type => <MaterialType key={type} type={type} {...props} />)}
      </Accordion.Content>
    </div>
  );
};

export default Materials;
