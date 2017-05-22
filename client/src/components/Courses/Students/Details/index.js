import React from 'react';

// import AttendanceContainer from './Attendance';
import MaterialsContainer from './Materials';
import DescriptionContainer from './Description';
import NewsfeedContainer from './Newsfeed';

import { StyledAccordion } from '../../elements/styled-components';
import withSelectedCourse from '../../elements/DetailsContainer';

const Details = (props) => {
  const { selectedCourse } = props;

  return (
    <div>
      <h1>{selectedCourse.course.name}</h1>
      <StyledAccordion styled fluid exclusive={false}>

        <NewsfeedContainer />
        {/* <DescriptionContainer /> */}
        {/* <AttendanceContainer /> */}
        {/* <MaterialsContainer /> */}
      </StyledAccordion>
    </div>
  );
};

const { shape, string } = React.PropTypes;
Details.propTypes = {
  selectedCourse: shape({
    course: shape({ _id: string.isRequired }).isRequired
  }).isRequired
};

export default withSelectedCourse(Details);
