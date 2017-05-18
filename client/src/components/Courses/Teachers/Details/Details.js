import React from 'react';
import { Accordion } from 'semantic-ui-react';

import AttendanceContainer from './Attendance';
import GradesContainer from './Grades';
import MaterialsContainer from './Materials';
import DescriptionContainer from './Description';

const Details = (props) => {
  const { selectedCourse } = props;

  return (
    <div>
      <h1>{selectedCourse.course.name}</h1>
      <Accordion styled fluid exclusive={false}>

        <DescriptionContainer />
        <AttendanceContainer />
        <GradesContainer />
        <MaterialsContainer />
      </Accordion>
    </div>
  );
};

export default Details;
