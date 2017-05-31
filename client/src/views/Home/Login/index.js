import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';

import LoginForm from './LoginForm';
import * as authActions from '../../../redux/account/auth';

class Login extends Component {
  constructor(props) {
    super(props);

    this.authUser = this.authUser.bind(this);
  }

  componentWillMount() {
    if (this.props.auth.authenticated === true) {
      this.props.history.push('/home');
    }
  }

  componentWillUpdate() {
    if (this.props.auth.authenticated === true) {
      this.props.history.push('/home');
    }
  }

  authUser(values) {
    this.props.loginUser(values);
    // this.props.history.push('/home');
  }

  render() {
    if (this.props.auth.authenticated) {
      return <Redirect to="/home" />;
    }

    return <LoginForm onSubmit={this.authUser} {...this.props} />;
  }
}

const mapStateToProps = state => ({
  auth: state.account.auth
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...authActions }, dispatch);

const { func, bool, shape } = React.PropTypes;
Login.propTypes = {
  auth: shape({
    authenticated: bool.isRequired
  }).isRequired,
  history: shape({
    push: func.isRequired
  }).isRequired,
  loginUser: func.isRequired
};

const enhance = compose(
  withRouter,
  reduxForm({ form: 'loginForm' }),
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhance(Login);
