import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Authorized from './Authorized';
import Login from './Login';

const history = createBrowserHistory();

const ForOhFor = () => <h1>No match found</h1>;

const App = ({ auth: { authenticated } }) => (
  <Router history={history}>
    <Switch>
      <Route path="/" component={authenticated === true ? Authorized : Login} />
      <Route component={ForOhFor} />
    </Switch>
  </Router>
);

const { shape, bool } = React.PropTypes;
App.propTypes = {
  auth: shape({ authenticated: bool })
};

export default connect(state => state)(App);
