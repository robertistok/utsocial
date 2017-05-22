import React from 'react';
import { Switch, Route } from 'react-router-dom';

import OverviewContainer from './Overview';
import Details from './Details';

const TeacherCourses = () => (
  <div>
    <Switch>
      <Route exact path="/courses" component={OverviewContainer} />
      <Route path="/courses/:id/:lang" component={Details} />
    </Switch>
  </div>
);

export default TeacherCourses;
