import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as authActions from '../../../../redux/auth';
import Account from './Account';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const asyncValidate = (values, dispatch, props, blurredField) => {
  const {
    validation,
    validationSuccess,
    initialValues
  } = props;
  const {
    phone: initialPhone,
    username: initialUsername,
    email: initialEmail
  } = initialValues;
  const { phone, username, email } = values;
  const toValidate = { blurredField };
  const errors = { ...props.asyncErrors };

  if (initialPhone !== phone && blurredField === 'phone') {
    toValidate.value = phone;
  }

  if (initialEmail !== email && blurredField === 'email') {
    toValidate.value = email;
  }

  if (initialUsername !== username && blurredField === 'username') {
    toValidate.value = username;
  }

  if (toValidate.value !== undefined) {
    return validation(toValidate).then((res) => {
      const status = res.payload.status !== undefined
        ? res.payload.status
        : res.payload.response.status;

      const data = res.payload.data !== undefined
        ? res.payload.data
        : res.payload.response.data;
      if (status === 200) {
        validationSuccess(data, blurredField);
        errors[blurredField] = undefined;
      } else if (status === 400) {
        errors[blurredField] = data;
      }
      throw errors;
    });
  }

  return sleep(100).then(() => {
    throw errors;
  });
};

class AccountContainer extends Component {
  // asyncValidateFields(values) {
  //   const { validateAccountFields } = this.props;
  //
  //   validateAccountFields(values)
  //     .then(response => console.log(response))
  //     .catch(err => console.log(err));
  // }

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
      phone: phone.toString()
    }
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...authActions }, dispatch);

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'accountForm',
    asyncValidate,
    asyncBlurFields: ['username', 'phone', 'email'],
    shouldAsyncValidate: (params) => {
      const {
        pristine,
        syncValidationPasses,
        trigger,
        initialized,
        asyncErrors,
        blurredField
      } = params;

      if (pristine) {
        return false;
      }

      if (!syncValidationPasses) {
        return false;
      }

      if (
        asyncErrors !== undefined && asyncErrors[blurredField] !== undefined
      ) {
        return false;
      }
      switch (trigger) {
        case 'blur':
          // blurring
          return true;
        case 'submit':
          return !pristine || !initialized;
        default:
          return false;
      }
    }
  })
);

export default enhance(AccountContainer);
