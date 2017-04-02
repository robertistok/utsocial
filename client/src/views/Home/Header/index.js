import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import './style.css';

const Header = () => (
	<div className="home-header">
		<h1 className="ui header title"><Link to="/">UTSocial</Link></h1>
		<div className="ui three item menu">
			<NavLink to="/schedule" className="item" activeClassName="item active">Schedules</NavLink>
			<NavLink to="/login" className="item" activeClassName="item active">Log in</NavLink>
			<NavLink to="/courses" className="item" activeClassName="item active">Courses</NavLink>
		</div>
	</div>
);

export default Header;
