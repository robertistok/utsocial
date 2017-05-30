import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';

import ResetPassword from './ResetPassword';
import * as authActions from '../../../redux/auth';
import {
  matchingPasswords
} from '../../../components/FormComponents/validation';

class ResetPasswordContainer extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { match: { params: { token } }, checkValidityOfToken } = this.props;

    checkValidityOfToken(token);
  }

  handleSubmit(values) {
    const { match: { params: { token } }, resetForgottenPassword } = this.props;
    const { newPassword, verifyNewPassword } = values;

    resetForgottenPassword(token, newPassword, verifyNewPassword);
  }

  render() {
    return <ResetPassword {...this.props} onSubmit={this.handleSubmit} />;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...authActions }, dispatch);

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'resetPassword',
    validate: matchingPasswords
  })
);

export default enhance(ResetPasswordContainer);
