import React from 'react';
import PropTypes from 'prop-types';
import { Accordion } from 'semantic-ui-react';

import {
  StyledAccordionTitle,
  StyledAccordionContent
} from '../../../../../components/Courses/styled-components';

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

const { func, bool, shape, string, arrayOf } = PropTypes;
Materials.propTypes = {
  toggle: func.isRequired,
  toggledOn: bool.isRequired,
  loggedInUser: shape({
    profile: shape({
      _id: string.isRequired,
      name: string.isRequired
    }).isRequired,
    _id: string.isRequired,
    type: string.isRequired,
    username: string.isRequired
  }).isRequired,
  selectedCourse: shape({
    course: shape({ _id: string.isRequired }).isRequired
  }).isRequired,
  materials: arrayOf(
    shape({
      _id: string.isRequired,
      type: string.isRequired,
      description: string.isRequired,
      link: string.isRequired,
      enteredOn: string.isRequired
    }).isRequired
  ).isRequired
};

export default Materials;
