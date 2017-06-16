import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';

import ResetPassword from './ResetPassword';
import * as forgotPasswordActions from '../../../redux/account/forgotPassword';
import {
  matchingPasswords
} from '../../../components/common/validation';

class ResetPasswordContainer extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { match: { params: { token } }, checkValidityOfToken } = this.props;

    checkValidityOfToken(token);
  }

  componentWillUnmount() {
    const { resetForgotPasswordState } = this.props;
    resetForgotPasswordState();
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

const { func, shape, string } = PropTypes;
ResetPasswordContainer.propTypes = {
  checkValidityOfToken: func.isRequired,
  resetForgotPasswordState: func.isRequired,
  resetForgottenPassword: func.isRequired,
  match: shape({ params: shape({ token: string }) }).isRequired
};

const mapStateToProps = state => ({
  forgotPasswordState: state.account.forgotPassword
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...forgotPasswordActions }, dispatch);

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'resetPassword',
    validate: matchingPasswords
  })
);

export default enhance(ResetPasswordContainer);
