import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as authActions from '../../../../redux/auth';
import Account from './Account';

class AccountContainer extends Component {
  render() {
    return <Account {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  const { user: { profile: { username, email, phone } } } = state.auth;
  return {
    user: state.auth.user,
    changePasswordStatus: state.auth.changePasswordStatus,
    initialValues: {
      username,
      email,
      phone
    }
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...authActions }, dispatch);

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: 'accountForm' })
);

export default enhance(AccountContainer);
