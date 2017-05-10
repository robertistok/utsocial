import React from 'react';
import { Accordion } from 'semantic-ui-react';

import AttendanceContainer from './Attendance';

const Details = (props) => {
  const { toggleAccordionElements } = props;

  return (
    <Accordion styled fluid exclusive={false}>
      <AttendanceContainer
        onClick={() => toggleAccordionElements('attendance')}
      />
      <Accordion.Title>Grades</Accordion.Title>
      <Accordion.Content>
        <p>
          A dog is a type of domesticated animal. Known for its loyalty and faithfulness,
          {' '}
          it can be found as a welcome guest in many households across the world.
        </p>
      </Accordion.Content>
      <Accordion.Title>Notifications</Accordion.Title>
      <Accordion.Content>
        <p>
          A dog is a type of domesticated animal. Known for its loyalty and faithfulness,
          {' '}
          it can be found as a welcome guest in many households across the world.
        </p>
      </Accordion.Content>
      <Accordion.Title>Materials</Accordion.Title>
      <Accordion.Content>
        <p>
          A dog is a type of domesticated animal. Known for its loyalty and faithfulness,
          {' '}
          it can be found as a welcome guest in many households across the world.
        </p>
      </Accordion.Content>
      <Accordion.Title>Notes</Accordion.Title>
      <Accordion.Content>
        <p>
          A dog is a type of domesticated animal. Known for its loyalty and faithfulness,
          {' '}
          it can be found as a welcome guest in many households across the world.
        </p>
      </Accordion.Content>
    </Accordion>
  );
};

export default Details;
