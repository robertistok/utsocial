import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import InfoColumn from './elements/InfoColumn';
import Column from './elements/Column';
import { DAYS } from '../../../utils/constants';

const Table = (props) => {
  const { schedule, handleCellClick } = props;
  const { semigroup, week, scheduleList } = schedule;

  return (
    <Wrapper>
      <InfoColumn />
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

export default Table;
