import React from 'react';
import { Route } from 'react-router-dom';
import { withMountingTransition } from '../../../components/hocs';

// import TableContainer from '../../../components/Schedule/Table';
import FilterContainer from './Filter';

const Grades = () => (
  <div>
    <Route path="/grades" component={FilterContainer} />
    <Route path="/schedules/:id" component={FilterContainer} />
  </div>
);

export default withMountingTransition(Grades);
