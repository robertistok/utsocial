import React, { Component } from 'react';
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

  componentDidMount() {
    const { forgotPassword, toggleForgotPassword } = this.props;

    if (forgotPassword !== true) {
      toggleForgotPassword();
    }
  }

  componentWillUnmount() {
    const { forgotPassword, toggleForgotPassword } = this.props;

    if (forgotPassword === true) {
      toggleForgotPassword();
    }
  }

  handleSubmit(email) {
    const { sendResetPasswordEmail, history } = this.props;
    sendResetPasswordEmail(email);
  }

  render() {
    return <ForgotPassword {...this.props} onSubmit={this.handleSubmit} />;
  }
}

const mapStateToProps = state => ({
  forgotPassword: state.account.forgotPassword
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
