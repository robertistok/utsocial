import React from 'react';
import { Accordion } from 'semantic-ui-react';

import AttendanceContainer from './Attendance';
import GradesContainer from './Grades';

const Details = (props) => {
  const { courses, selectedCourse } = props;

  return (
    <div>
      <h1>{selectedCourse.course.name}</h1>
      <Accordion styled fluid exclusive={false}>

        <AttendanceContainer />
        <GradesContainer />

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
    </div>
  );
};

export default Details;
