import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import LoginForm from './LoginForm';
import * as actions from '../../redux/auth';

class Login extends Component {
  constructor(props) {
    super(props);

    this.authUser = this.authUser.bind(this);
  }

  componentWillMount() {
    if (this.props.auth.authenticated) this.props.history.push('/home');
  }

  componentWillUpdate() {
    if (this.props.auth.authenticated) this.props.history.push('/home');
  }

  authUser(values) {
    // this.props
    //   .authUser(values)
    //   .then(response => this.props.authUserSucces(response.payload))
    //   .catch(err => this.props.authUserError(err));
    this.props.loginUser(values);
  }

  render() {
    if (this.props.auth.authenticated) return <Redirect to="/home" />;

    return <LoginForm onSubmit={this.authUser} {...this.props} />;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, actions)(Login);
