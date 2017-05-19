import React from 'react';
import { Accordion } from 'semantic-ui-react';
import styled from 'styled-components';

import AttendanceContainer from './Attendance';
import GradesContainer from './Grades';
import MaterialsContainer from './Materials';
import DescriptionContainer from './Description';
import NewsfeedContainer from './Newsfeed';

const Details = (props) => {
  const { selectedCourse } = props;

  return (
    <div>
      <h1>{selectedCourse.course.name}</h1>
      <StyledAccordion styled fluid exclusive={false}>

        <NewsfeedContainer />
        <DescriptionContainer />
        <AttendanceContainer />
        <GradesContainer />
        <MaterialsContainer />
      </StyledAccordion>
    </div>
  );
};

const StyledAccordion = styled(Accordion)`
	background-color: #EDEFF0 !important;
	border: 0 !important;
  border-bottom-width: 0px !important;
  border-top-width: 0px !important;
  border-radius: 0px !important;
	box-shadow: 0 3px 5px rgba(0,0,0,.23) !important;
`;

export default Details;
