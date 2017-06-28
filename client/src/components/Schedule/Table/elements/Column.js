import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

import Week from './Week';
import { media } from '../../../../utils/style-utils';

const Column = (props) => {
  const { day, week, semigroup, handleCellClick, scheduleList } = props;

  const semigroups = semigroup === '0' ? ['1', '2'] : [semigroup];
  const weeks = week === '0' ? ['1', '2'] : [week];
  const today = moment().format('dddd') === day.text;

  return (
    <Wrapper today={today}>
      <Day>{day.text}</Day>
      <Group>
        {semigroups.map(sg => (
          <GroupNumber key={`SG${sg}`}>{`SG${sg}`}</GroupNumber>
        ))}
      </Group>
      <ColumnWrapper main>
        {semigroups.map(semigroup => (
          <SemigroupColumn key={semigroup}>
            <ColumnWrapper>
              {weeks.map(week => (
                <Week
                  key={week}
                  week={week}
                  handleCellClick={handleCellClick}
                  scheduleList={scheduleList}
                  semigroup={semigroup}
                  day={day}
                />
              ))}
            </ColumnWrapper>
          </SemigroupColumn>
        ))}
      </ColumnWrapper>
    </Wrapper>
  );
};

const { string, func, shape, arrayOf } = PropTypes;
Column.propTypes = {
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
	flex: 1;

	${media.tablet`
		width: 60%;
		margin-bottom: 40px;
	`}

	${media.phone`
		width: 90%;
		`}

	background-color: ${props => props.today && props.theme.selected}
`;

const Day = styled.div`
	width: 100%;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	font-weight: bolder;
	border-left: ${props => props.theme.separator};
	border-bottom: ${props => props.theme.separator};

	@media screen and (max-width: 768px) {
		border: ${props => props.theme.separator};
	}
`;

const ColumnWrapper = styled.div`
	display: flex;
	justify-content: space-around;

	@media screen and (max-width: 768px) {
		border-left: ${props => props.main && props.theme.separator};
		border-right: ${props => props.main && props.theme.separator};
	}
`;

const SemigroupColumn = styled.div`
	width: 100%;
	text-align: center;
	border-left: ${props => props.theme.separator};

	@media screen and (max-width: 768px) {
		border-right: ${props => props.theme.separator};
		border-left: 0px;

		&:last-child {
			border-right: 0px;
		}
	}
`;

const Group = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	text-align: center;
	border-bottom: ${props => props.theme.separator};
	height: 40px;
	font-size: 12px;
	font-weight: bold;

	@media screen and (max-width: 768px) {
		border-right: ${props => props.theme.separator};
	}
`;

const GroupNumber = styled.div`
	flex: 1;
	height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
	border-left: ${props => props.theme.separator};
`;

export default Column;
