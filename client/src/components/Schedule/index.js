import React, { Component } from 'react';

import TableContainer from './Table/index';
import FilterContainer from './Filter/index';

class Schedule extends Component {
  render() {
    return (
      <div>
        <FilterContainer />
        <TableContainer />
      </div>
    );
  }
}

export default Schedule;
