import React from 'react';
import { NavLink, Link, Route, Switch } from 'react-router-dom';
import Schedule from '../../../components/Schedule/index';

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
      <Route path="/myaccount/schedules" component={Schedule} />
      <Route path="/myaccount/teachers" render={() => <h1>Teachers</h1>} />
      <Route path="/myaccount/courses" render={() => <h1>Courses</h1>} />
    </Switch>
  </div>
);

export default Header;
