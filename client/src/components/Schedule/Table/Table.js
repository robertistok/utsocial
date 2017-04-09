import React, { PropTypes } from 'react';

import ScheduleItem from './ScheduleItem';
import './Table.css';
import { DAYS, HOURS } from '../../../constants';

const findSchedule = ({ scheduleList, hour, week, semigroup }) => {
  const schedule = scheduleList.find(
    scheduleItem =>
      hour.key >= scheduleItem.when.from &&
      hour.key < scheduleItem.when.from + scheduleItem.when.duration &&
      [0, parseInt(week, 10)].includes(scheduleItem.when.frequency) &&
      ['0', semigroup].includes(scheduleItem.whom.semigroup)
  );
  return schedule;
};

const renderHours = ({ scheduleList, week, semigroup, day, handleCellClick }) =>
  HOURS.map((hour, index) => {
    const schedule = findSchedule({ scheduleList, hour, week, semigroup });
    const key = `${day + week + semigroup + hour + index}`;
    if (!schedule) {
      return <div className="class none" key={key} />;
    }

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
  });

const Column = ({ day, week, semigroup, handleCellClick, scheduleList }) => {
  const semigroups = semigroup === '0' ? ['1', '2'] : [semigroup];
  const weeks = week === '0' ? ['1', '2'] : [week];

  return (
    <div className="column">
      <div className="day">{day.text}</div>
      <div className="semigroups">
        {semigroups.map(semigroup => (
          <div className="semigroup" key={semigroup}>
            <div className="group-number">{`SG${semigroup}`}</div>
            <div className="weeks">
              {weeks.map(week => (
                <div className="week" key={week}>
                  <div className="week-number">{`W${week}`}</div>
                  {renderHours({
                    scheduleList,
                    week,
                    semigroup,
                    day,
                    handleCellClick
                  })}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Table = (props) => {
  const { schedule, handleCellClick } = props;
  const { semigroup, week, group, scheduleList, loading } = schedule;

  return (
    <div className="table">
      <div className="info-column">
        <div className="info">Day</div>
        <div className="info">Semigroup</div>
        <div className="info">Week</div>
        {HOURS.map(h => <div className="info hours" key={h.key}>{h.text}</div>)}
      </div>
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
    </div>
  );
};

Table.propTypes = {
  schedule: PropTypes.object.isRequired,
  handleCellClick: PropTypes.func
};

export default Table;
