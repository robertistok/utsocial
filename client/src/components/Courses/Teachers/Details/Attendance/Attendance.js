import React from 'react';
import { Accordion } from 'semantic-ui-react';

import Filter from './elements/Filter';
import AttendanceTableContainer from './elements/AttendanceTable/index';

const Attendance = (props) => {
  const { active } = props;

  return (
    <div>
      <Accordion.Title onClick={props.onClick} active={active}>
        Attendance
      </Accordion.Title>
      <Accordion.Content active={active}>
        <Filter {...props} />
      </Accordion.Content>
    </div>
  );
};

export default Attendance;
