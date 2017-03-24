import React from 'react';
import { Route, Link } from 'react-router-dom';

const Teacher = props => (
  <div>
    Im your best teacher ever, my name is {props.auth.user.username}
    <Link to="/myaccount/schedule">Click me</Link>
    <Route path="/myaccount/schedule" render={() => <h1>Daily schedule</h1>} />
  </div>
);

export default Teacher;
