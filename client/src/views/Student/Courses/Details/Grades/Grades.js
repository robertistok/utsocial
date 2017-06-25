import React from 'react';
import PropTypes from 'prop-types';
import { Accordion } from 'semantic-ui-react';

import {
  StyledAccordionTitle,
  StyledAccordionContent
} from '../../../../../components/Courses/styled-components';
import CourseRow from '../../../common/CourseRow';

const Grades = (props) => {
  const { toggle, toggledOn, gradesList, selectedCourse: { course } } = props;

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
            <CourseRow
              gradesList={gradesList[course._id] || gradesList}
              individualItem
              {...course}
            />
          </StyledAccordionContent>
        </Accordion.Content>}
    </div>
  );
};

const { bool, func, object, string, number, shape } = PropTypes;
Grades.propTypes = {
  toggle: func.isRequired,
  toggledOn: bool.isRequired,
  gradesList: object,
  selectedCourse: shape({
    course: shape({
      _id: string.isRequired,
      name: string.isRequired,
      credits: number.isRequired
    })
  })
};

export default Grades;
