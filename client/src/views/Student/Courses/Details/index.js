import React from 'react';
import PropTypes from 'prop-types';

import AttendanceContainer from './Attendance';
import GradesContainer from './Grades';
import MaterialsContainer from './Materials';
import DescriptionContainer from './Description';
import NewsfeedContainer from './Newsfeed';

import {
  StyledAccordion,
  Title
} from '../../../../components/Courses/styled-components';
import withSelectedCourse
  from '../../../../components/Courses/DetailsContainer';

const Details = (props) => {
  const { selectedCourse } = props;

  return (
    <div>
      <Title>{selectedCourse.course.name}</Title>
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

const { shape, string } = PropTypes;
Details.propTypes = {
  selectedCourse: shape({
    course: shape({ _id: string.isRequired }).isRequired
  }).isRequired
};

export default withSelectedCourse(Details);
