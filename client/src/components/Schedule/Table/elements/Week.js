import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { HOURS } from '../../../../utils/constants';
import ScheduleItem from './ScheduleItem';

const findSchedule = ({ scheduleList, hour, week, semigroup }) =>
  scheduleList.find(
    scheduleItem =>
      hour.key >= scheduleItem.when.from &&
      hour.key < scheduleItem.when.from + scheduleItem.when.duration &&
      [0, parseInt(week, 10)].includes(scheduleItem.when.frequency) &&
      ['0', semigroup].includes(scheduleItem.whom.semigroup)
  );

const Week = (props) => {
  const { week, semigroup, scheduleList, handleCellClick, day } = props;

  return (
    <Wrapper>
      <Number>{`W${week}`}</Number>
      {HOURS.map((hour, index) => {
        const schedule = findSchedule({
          scheduleList,
          hour,
          week,
          semigroup
        });
        const key = `${day.text + week + semigroup + hour + index}`;

        return (
          <ScheduleItem
            onClick={handleCellClick}
            key={key}
            week={week}
            hour={hour}
            semigroup={semigroup}
            schedule={schedule}
          />
        );
      })}
    </Wrapper>
  );
};

const { string, func, shape, arrayOf } = PropTypes;
Week.propTypes = {
  handleCellClick: func,
  week: string.isRequired,
  semigroup: string.isRequired,
  day: shape({
    text: string.isRequired,
    key: string.isRequired,
    value: string.isRequired
  }).isRequired,
  scheduleList: arrayOf(shape({ _id: string.isRequired }))
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	width: 100%;
	text-align: center;

	&:first-child {
		border-right: ${props => props.theme.separator};
	}

	&:last-child {
		border-right: 0px;
	}
`;

const Number = styled.div`
	border-bottom: ${props => props.theme.separator};
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 12px;
	font-weight: bold;
`;

export default Week;
