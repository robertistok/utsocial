import React from 'react';
import { Accordion } from 'semantic-ui-react';

import Filter from './elements/Filter';
import AttendanceTableContainer from './elements/AttendanceTable/index';
import { StyledAccordionTitle } from '../elements/styled';

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
        <Filter {...props} />
        <AttendanceTableContainer />
      </Accordion.Content>
    </div>
  );
};

export default Attendance;
