import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Home from './Home/index';
import Login from './Home/Login/index';
import Student from './Student/index';
import Admin from './Admin/index';
import Teacher from './Teacher/index';

const history = createBrowserHistory();

const App = props => (
  <Router history={history}>
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute path="/myaccount" auth={props.auth} />
        <Route component={() => <h1>ForOhFor</h1>} />
      </Switch>

    </div>
  </Router>
);

const PrivateRoute = ({ auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (auth.authenticated) {
        if (auth.user.type === 'teacher') {
          return <Teacher {...props} auth={auth} />;
        } else if (auth.user.type === 'student') {
          return <Student {...props} auth={auth} />;
        } else if (auth.user.type === 'admin') {
          return <Admin {...props} auth={auth} />;
        }
      }
      return <Redirect to="/login" />;
    }}
  />
);

export default connect(state => state)(App);
