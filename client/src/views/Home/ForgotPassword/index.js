// This has to be done to the redux-form asyncValidate function
/* eslint no-throw-literal: 0*/
/* eslint consistent-return: 0*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import ForgotPassword from './ForgotPassword';
import * as forgotPasswordActions from '../../../redux/account/forgotPassword';

const asyncValidate = (values, dispatch, props) => {
  const { validateForgotEmail } = props;
  const { email } = values;

  return validateForgotEmail(email).then((res) => {
    if (res.payload.status === 200) {
      return false;
    }

    if (res.payload.response.status === 404) {
      throw { email: res.payload.response.data };
    }
  });
};

class ForgotPasswordContainer extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    const { resetForgotPasswordState } = this.props;

    resetForgotPasswordState();
  }

  handleSubmit(email) {
    const { sendResetPasswordEmail } = this.props;
    sendResetPasswordEmail(email);
  }

  render() {
    return <ForgotPassword {...this.props} onSubmit={this.handleSubmit} />;
  }
}

const { func } = PropTypes;
ForgotPasswordContainer.propTypes = {
  sendResetPasswordEmail: func.isRequired,
  resetForgotPasswordState: func.isRequired
};

const mapStateToProps = state => ({
  forgotPasswordState: state.account.forgotPassword
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...forgotPasswordActions }, dispatch);

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'forgotPassword',
    asyncValidate,
    shouldAsyncValidate: (params) => {
      const {
        pristine,
        syncValidationPasses,
        trigger
      } = params;

      if (pristine) {
        return false;
      }

      if (!syncValidationPasses) {
        return false;
      }

      switch (trigger) {
        case 'blur':
          return true;
        case 'submit':
          return !pristine;
        default:
          return false;
      }
    }
  })
);

export default enhance(ForgotPasswordContainer);
