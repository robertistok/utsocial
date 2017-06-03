import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { onlyFirstLetters } from '../../../../utils/string-operations';

const ScheduleItem = (props) => {
  const { schedule, onClick } = props;

  if (schedule === undefined) {
    return <Wrapper />;
  }

  return (
    <Wrapper
      type={schedule.what.type}
      onClick={onClick}
      data-schedule={JSON.stringify(schedule)}
    >
      {onlyFirstLetters(schedule.what.course.name)}
    </Wrapper>
  );
};

const { func, shape, object, number, string } = PropTypes;
ScheduleItem.propTypes = {
  onClick: func,
  schedule: shape({
    whom: shape({
      group: object.isRequired,
      semigroup: string.isRequired
    }).isRequired,
    who: object.isRequired,
    what: shape({
      course: object.isRequired,
      type: string.isRequired
    }).isRequired,
    where: string.isRequired,
    when: shape({
      day: string.isRequired,
      from: number.isRequired,
      duration: number.isRequired,
      frequency: number.isRequired
    }).isRequired
  })
};

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	text-align: center;
	border-bottom: 1px solid black;
	height: 50px;
	font-size: 0.9em;

	background-color: ${(props) => {
  if (props.type === 'lecture') {
    return '#27ae60';
  } else if (props.type === 'lab') {
    return '#16a085';
  } else if (props.type === 'seminar') {
    return '#f1c40f';
  } else if (props.type === 'project') {
    return '#c0392b';
  }
  return 'initial';
}}
`;

export default ScheduleItem;
