import React from 'react'; import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom';

import OverviewContainer from './Overview';
import Details from './Details';
import { withMountingTransition } from '../../../components/hocs';

const TeacherCourses = () => (
  <div>
    <Switch>
      <Route exact path="/courses" component={OverviewContainer} />
      <Route path="/courses/:id/:lang" component={Details} />
    </Switch>
  </div>
);

export default withMountingTransition(TeacherCourses);
