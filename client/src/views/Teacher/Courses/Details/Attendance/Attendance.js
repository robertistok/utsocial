import React from 'react'; import PropTypes from 'prop-types'
import { Accordion } from 'semantic-ui-react';

import Filter from './elements/Filter';
import AttendanceTableContainer from './elements/AttendanceTable/index';
import {
  StyledAccordionTitle,
  StyledAccordionContent
} from '../../../../../components/Courses//styled-components';

const Attendance = (props) => {
  const { toggledOn, toggle } = props;

  return (
    <div>
      <StyledAccordionTitle
        onClick={toggle}
        active={toggledOn}
        content="Attendance"
      />

      <Accordion.Content active={toggledOn}>
        <StyledAccordionContent>
          <Filter {...props} />
          <AttendanceTableContainer />{' '}
        </StyledAccordionContent>

      </Accordion.Content>
    </div>
  );
};

const { func, bool } = PropTypes;
Attendance.propTypes = {
  toggledOn: bool.isRequired,
  toggle: func.isRequired
};

export default Attendance;
