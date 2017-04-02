import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Header from '../Header/index';
import LoginForm from './LoginForm/index';
import * as actions from '../../../redux/auth';

class Login extends Component {
  constructor(props) {
    super(props);

    this.authUser = this.authUser.bind(this);
  }

  componentWillMount() {
    if (this.props.auth.authenticated) this.props.history.push('/myaccount');
  }

  componentWillUpdate() {
    if (this.props.auth.authenticated) this.props.history.push('/myaccount');
  }

  authUser(values) {
    this.props.loginUser(values);
  }

  render() {
    if (this.props.auth.authenticated) return <Redirect to="/myaccount" />;

    return (
      <div>
        <Header />
        <LoginForm onSubmit={this.authUser} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, actions)(Login);
