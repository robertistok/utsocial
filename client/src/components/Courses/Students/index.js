import React from 'react';
import { Switch, Route } from 'react-router-dom';

import OverviewContainer from './Overview';

const StudentsCourses = () => (
  <div>
    <Switch>
      <Route exact path="/courses" component={OverviewContainer} />
    </Switch>
  </div>
);

export default StudentsCourses;
