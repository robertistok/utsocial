import React from 'react';
import { Switch, Route } from 'react-router-dom';

import OverviewContainer from './Overview';
import DetailsContainer from './Details';

const TeacherCourses = () => (
  <div>
    <Switch>
      <Route exact path="/courses" component={OverviewContainer} />
      <Route path="/courses/:id/:lang" component={DetailsContainer} />
    </Switch>
  </div>
);

export default TeacherCourses;
