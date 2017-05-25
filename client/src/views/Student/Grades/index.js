import React from 'react';
import { Route } from 'react-router-dom';

// import TableContainer from '../../../components/Schedule/Table';
import FilterContainer from './Filter';

const Grades = () => (
  <div>
    <Route path="/grades" component={FilterContainer} />
    {/* <Route path="/schedules/:id" component={TableContainer} /> */}
  </div>
);

export default Grades;
