import React from 'react'; import PropTypes from 'prop-types'
import TableContainer from '../../../components/Schedule/Table';
import FilterContainer from './Filter';

const Schedule = () => (
  <div>
    <FilterContainer />
    <TableContainer />
  </div>
);

export default Schedule;
