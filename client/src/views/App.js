import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Authorized from './Authorized';
import Login from './Login';

const history = createBrowserHistory();

const ForOhFor = () => <h1>No match found</h1>;

const App = (props) => {
  return (
    <Router>
      <Switch>
        <Route
          path="/"
          component={props.auth.authenticated === true ? Authorized : Login}
        />
        <Route component={ForOhFor} />
      </Switch>
    </Router>
  );
  if (props.authenticated === true) {
    return (
      <div>
        <Switch>
          <Route path="/" component={Authorized} />
          <Route component={ForOhFor} />
        </Switch>

      </div>
    );
  }

  return (
    <div>
      <Switch>
        <Route path="/" component={Login} />
        <Route component={ForOhFor} />;
      </Switch>

    </div>
  );
};

export default connect(state => state)(App);
