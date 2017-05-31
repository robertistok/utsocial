import React from 'react'; import PropTypes from 'prop-types'
import { Route } from 'react-router-dom';
import { withMountingTransition } from '../../../components/hocs';

import TableContainer from '../../../components/Schedule/Table';
import FilterContainer from './Filter/index';

const Schedule = () => (
  <div>
    <Route path="/schedules" component={FilterContainer} />
    <Route path="/schedules/:id" component={TableContainer} />
  </div>
);

export default withMountingTransition(Schedule);
