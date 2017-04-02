import React from 'react';

import './Table.css';
import { DAYS, HOURS } from '../../../constants';

const Column = ({ day, week, semigroup, handleCellClick }) => {
  const semigroups = semigroup === '0' ? [1, 2] : [parseInt(semigroup, 10)];
  const weeks = week === '0' ? [1, 2] : [parseInt(week, 10)];

  return (
    <div className="column">
      <div className="day">{day.text}</div>
      <div className="semigroups">
        {semigroups.map(sg => (
          <div className="semigroup" key={sg}>
            <div className="group-number">{`SG${sg}`}</div>
            <div className="weeks">
              {weeks.map(w => (
                <div className="week" key={w}>
                  <div className="week-number">{`W${w}`}</div>
                  {HOURS.map(h => (
                    <div
                      key={h.key}
                      className="class"
                      data-hour={h}
                      data-week={w}
                      data-semigroup={sg}
                      onClick={handleCellClick}
                    >
                      FREE
                    </div>
                  ))}
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
  const { schedule: { semigroup, week, group }, handleCellClick } = props;

  return (
    <div className="table">
      <div className="info-column">
        <div className="info">Day</div>
        <div className="info">Semigroup</div>
        <div className="info">Week</div>
        {HOURS.map(h => <div className="info" key={h.key}>{h.text}</div>)}
      </div>
      {DAYS.map(d => (
        <Column
          key={`${d.key + week + semigroup}`}
          day={d}
          week={week}
          semigroup={semigroup}
          handleCellClick={handleCellClick}
        />
      ))}
    </div>
  );
};

export default Table;
