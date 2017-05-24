import React from 'react';
import { Accordion } from 'semantic-ui-react';

import {
  StyledAccordionTitle,
  StyledAccordionContent
} from '../../../../../components/Courses//styled-components';
import { withToggle } from '../../../../../components/hocs';

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

const { arrayOf, shape, func, bool, string } = React.PropTypes;
Materials.propTypes = {
  toggle: func.isRequired,
  toggledOn: bool.isRequired,
  selectedCourse: shape({
    course: shape({ _id: string.isRequired }).isRequired
  }).isRequired,
  materials: arrayOf(
    shape({
      type: string.isRequired,
      link: string.isRequired,
      description: string.isRequired
    }).isRequired
  ).isRequired
};

export default withToggle(Materials);
