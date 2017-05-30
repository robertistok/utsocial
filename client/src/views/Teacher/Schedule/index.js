import React from 'react';

import FilterContainer from './Filter';
import TableContainer from '../../../components/Schedule/Table';
import { withMountingTransition } from '../../../components/hocs';

const Schedule = () => (
  <div>
    <FilterContainer />
    <TableContainer />
  </div>
);

export default withMountingTransition(Schedule);
