import React from 'react';
import { Switch, Route } from 'react-router-dom';

import OverviewContainer from './Overview';
import Details from './Details';
import { withMountingTransition } from '../../../components/hocs';

const Courses = () => (
  <Switch>
    <Route exact path="/courses" component={OverviewContainer} />
    <Route path="/courses/:id/:lang" component={Details} />
  </Switch>
);

export default withMountingTransition(Courses);
