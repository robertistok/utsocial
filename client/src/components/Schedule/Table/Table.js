import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Column from './elements/Column';
import { DAYS, HOURS } from '../../../utils/constants';
import { media } from '../../../utils/style-utils';

const Table = (props) => {
  const { schedule, handleCellClick } = props;
  const { semigroup, week, scheduleList } = schedule;

  return (
    <Wrapper>
      <InfoColumn>
        <Info annotation>Day</Info>
        <Info annotation>Semigroup</Info>
        <Info annotation>Week</Info>
        {HOURS.map(h => <Info key={h.key}>{h.text}</Info>)}
      </InfoColumn>
      {DAYS.map(d => (
        <Column
          key={`${d.key + week + semigroup}`}
          day={d}
          week={week}
          semigroup={semigroup}
          handleCellClick={handleCellClick}
          scheduleList={scheduleList.filter(
            schedule => schedule.when.day === d.value
          )}
        />
      ))}
    </Wrapper>
  );
};

Table.propTypes = {
  schedule: PropTypes.object.isRequired,
  handleCellClick: PropTypes.func
};

const Wrapper = styled.div`
	justify-content: center;
	display: flex;
	flex-wrap: wrap;
	margin-bottom: 30px;
	border-bottom: 0px;

	@media screen and (min-width: 768px) {
		border: ${props => props.theme.separator};
		border-bottom: 0px;
	}

	@media screen and (max-width: 768px) {
		flex-direction: column;
		align-items: center;
	}
`;

const InfoColumn = styled.div`
	display: flex;
	flex-direction: column;
	min-width: 8vw;

	${media.tablet`
		display: none
	`}
`;

const Info = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	border-bottom: ${props => props.theme.separator};
	height: 40px;
	font-weight: ${props => props.annotation && 'bolder'};
`;

export default Table;
