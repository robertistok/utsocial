import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { HOURS } from '../../../../constants';
import ScheduleItem from './ScheduleItem';
import { media } from '../../../../utils/style-utils';

const findSchedule = ({ scheduleList, hour, week, semigroup }) =>
  scheduleList.find(
    scheduleItem =>
      hour.key >= scheduleItem.when.from &&
      hour.key < scheduleItem.when.from + scheduleItem.when.duration &&
      [0, parseInt(week, 10)].includes(scheduleItem.when.frequency) &&
      ['0', semigroup].includes(scheduleItem.whom.semigroup)
  );

const Column = (props) => {
  const { day, week, semigroup, handleCellClick, scheduleList } = props;

  const semigroups = semigroup === '0' ? ['1', '2'] : [semigroup];
  const weeks = week === '0' ? ['1', '2'] : [week];
  const today = moment().format('dddd') === day.text;

  return (
    <Wrapper today={today}>
      <Day>{day.text}</Day>
      <ColumnWrapper>
        {semigroups.map(semigroup => (
          <SemigroupColumn key={semigroup}>
            <GroupNumber>{`SG${semigroup}`}</GroupNumber>
            <ColumnWrapper>
              {weeks.map(week => (
                <Week key={week}>
                  <WeekNumber>{`W${week}`}</WeekNumber>
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
                </Week>
              ))}
            </ColumnWrapper>
          </SemigroupColumn>
        ))}
      </ColumnWrapper>
    </Wrapper>
  );
};

const { string, func, shape, arrayOf } = React.PropTypes;
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

	background-color: ${props => props.today ? '#D3D3D3' : 'initial'}
`;

const Day = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	text-align: center;
	border-bottom: solid 1px black;
	border-left: solid 1px black;
	height: 50px;

`;

const ColumnWrapper = styled.div`
	display: flex;
	justify-content: space-around;
`;

const SemigroupColumn = styled.div`
	width: 100%;
	text-align: center;
	border-left: solid 1px black;

	${media.tablet`
		&:first-child {
			border-left: solid 1px black;
			border-right: solid 1px black;
		}
		`}
`;

const GroupNumber = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	text-align: center;
	border-bottom: solid 1px black;
	height: 50px;
	font-size: 12px;
`;

const Week = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	width: 100%;
	text-align: center;
`;

const WeekNumber = styled.div`
	border-bottom: solid 1px black;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 12px
`;

export default Column;
