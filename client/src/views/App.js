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
import Login from '../components/Login/index';

const history = createBrowserHistory();

const ForOhFor = () => <h1>No match found</h1>;

const App = props => (
  <Router history={history}>
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute to="/home" auth={props.auth} component={Authorized} />
        <Route component={ForOhFor} />
      </Switch>
    </div>
  </Router>
);

const PrivateRoute = ({ component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (auth.authenticated) {
        return React.createElement(component, props);
      }
      return (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location }
          }}
        />
      );
    }}
  />
);

export default connect(state => state)(App);
