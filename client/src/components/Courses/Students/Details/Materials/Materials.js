import React from 'react';
import { Accordion } from 'semantic-ui-react';

import {
  StyledAccordionTitle,
  StyledAccordionContent
} from '../../../elements/styled-components';
import { withToggle } from '../../../../hocs';

import MaterialType from './MaterialType';

const Materials = (props) => {
  const {
    toggledOn,
    toggle,
    selectedCourse: { course },
    materials
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
              <MaterialType key={type} type={type} materials={materials} />
            ))}
        </StyledAccordionContent>
      </Accordion.Content>
    </div>
  );
};

export default withToggle(Materials);
