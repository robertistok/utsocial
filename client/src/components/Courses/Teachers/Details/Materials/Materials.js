import React from 'react';
import { Accordion } from 'semantic-ui-react';

import {
  StyledAccordionTitle,
  StyledAccordionContent
} from '../../../elements/styled-components';

import MaterialType from './elements/MaterialType';

const Materials = (props) => {
  const {
    toggledOn,
    toggle,
    selectedCourse: { course },
    materials,
    loggedInUser
  } = props;

  return (
    <div>
      <StyledAccordionTitle
        onClick={toggle}
        active={toggledOn}
        content="Materials"
      />

      <Accordion.Content active={toggledOn}>
        <StyledAccordionContent>
          {Object.keys(course.teachingTypes)
            .filter(type => course.teachingTypes[type] === true)
            .map(type => (
              <MaterialType
                key={type}
                type={type}
                materials={materials}
                loggedInUser={loggedInUser}
              />
            ))}
        </StyledAccordionContent>
      </Accordion.Content>
    </div>
  );
};

export default Materials;
