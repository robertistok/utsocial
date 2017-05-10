import React from 'react';
import { Accordion } from 'semantic-ui-react';

import Filter from './elements/Filter';
import AttendanceTable from './elements/AttendanceTable';

const Attendance = (props) => {
  const { attendance: { filter } } = props;

  return (
    <div>
      <Accordion.Title
        onClick={props.onClick}
        active={props.courses.activeAccordionElements.includes('attendance')}
      >
        Attendance
      </Accordion.Title>
      <Accordion.Content
        active={props.courses.activeAccordionElements.includes('attendance')}
      >
        <Filter {...props} />
        {filter.group !== undefined &&
          filter.type !== undefined &&
          <AttendanceTable {...props} />}
      </Accordion.Content>
    </div>
  );
};

export default Attendance;
