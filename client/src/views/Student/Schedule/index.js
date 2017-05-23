import React from 'react';
import { Route } from 'react-router-dom';

import TableContainer from '../../../components/Schedule/Table';
import FilterContainer from './Filter/index';

const Schedule = () => (
  <div>
    <Route path="/schedules" component={FilterContainer} />
    <Route path="/schedules/:id" component={TableContainer} />
  </div>
);

export default Schedule;
