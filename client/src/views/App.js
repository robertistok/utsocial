import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './Home/index';
import Login from './Home/Login/index';

const App = props => (
	<Router>
		<div>
			<Route exact path="/" component={Home} />
			<Route exact path="/login" component={Login} />
		</div>
	</Router>
);

export default App;
