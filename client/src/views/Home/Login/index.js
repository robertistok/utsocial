import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
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

  componentWillUnmount() {
    this.props.resetError();
  }

  authUser(values) {
    this.props.loginUser(values);
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

const { func, bool, shape } = PropTypes;
Login.propTypes = {
  auth: shape({
    authenticated: bool.isRequired
  }).isRequired,
  resetError: func.isRequired,
  loginUser: func.isRequired
};

const enhance = compose(
  reduxForm({ form: 'loginForm' }),
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhance(Login);
