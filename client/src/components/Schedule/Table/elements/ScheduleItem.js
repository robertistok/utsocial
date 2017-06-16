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
	border-bottom: ${props => props.theme.separator};
	height: 40px;

	background-color: ${props => props.theme[props.type]}
`;

export default ScheduleItem;
