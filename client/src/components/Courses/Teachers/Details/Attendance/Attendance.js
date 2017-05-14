import React from 'react';
import { Accordion } from 'semantic-ui-react';

import Filter from './elements/Filter';
import AttendanceTableContainer from './elements/AttendanceTable/index';
import { withToggle } from '../../../../hocs';

const Attendance = (props) => {
  const { toggledOn, toggle } = props;

  return (
    <div>
      <Accordion.Title onClick={toggle} active={toggledOn}>
        Attendance
      </Accordion.Title>
      <Accordion.Content active={toggledOn}>
        <Filter {...props} />
        <AttendanceTableContainer />
      </Accordion.Content>
    </div>
  );
};

export default Attendance;
