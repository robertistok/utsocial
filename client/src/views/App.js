import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { ThemeProvider } from 'styled-components';

import Authorized from './Authorized';
import Home from './Home';
import theme from '../utils/theme';

const history = createBrowserHistory();

const ForOhFor = () => <h1>No match found</h1>;

const App = (props) => {
  const { authenticated } = props;

  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <Switch>
          <Route
            path="/"
            component={authenticated === true ? Authorized : Home}
          />
          <Route component={ForOhFor} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

const { bool } = React.PropTypes;
App.propTypes = {
  authenticated: bool.isRequired
};

const mapStateToprops = state => ({
  authenticated: state.account.auth.authenticated
});

export default connect(mapStateToprops)(App);
