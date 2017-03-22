import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './views/Home/index';
import Login from './views/Home/Login/index';

const RouterComp = () => (
	<Router>
		<div>
			<Route path="/" component={App} />
			<Route path="/login" component={Login} />
		</div>
	</Router>
);

export default RouterComp;
