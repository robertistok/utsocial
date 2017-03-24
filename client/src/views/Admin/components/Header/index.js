import React from 'react';
import { NavLink, Link, Route, Switch } from 'react-router-dom';

import './style.css';

const Header = () => (
  <div className="home-header">
    <h1 className="ui header title"><Link to="/">UTSocial</Link></h1>
    <div className="ui three item menu">
      <NavLink
        to="/myaccount/schedules"
        className="item"
        activeClassName="item active"
      >
        Schedules
      </NavLink>
      <NavLink
        to="/myaccount/teachers"
        className="item"
        activeClassName="item active"
      >
        Teachers
      </NavLink>
      <NavLink
        to="/myaccount/courses"
        className="item"
        activeClassName="item active"
      >
        Courses
      </NavLink>
    </div>
    <Switch>
      <Route path="/myaccount/schedules" render={() => <h1>Schedules</h1>} />
      <Route path="/myaccount/teachers" render={() => <h1>Teachers</h1>} />
      <Route path="/myaccount/courses" render={() => <h1>Courses</h1>} />
    </Switch>
  </div>
);

export default Header;
