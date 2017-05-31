import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as preferencesActions from '../../../../redux/account/preferences';
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
      } else if (status === 400) {
        errors[blurredField] = data;
      }

      if (Object.keys(errors).length !== 0) {
        throw errors;
      }
    });
  }

  return sleep(100).then(() => {
    if (Object.keys(errors).length !== 0) {
      throw errors;
    }
  });
};

class AccountContainer extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    const {
      initialValues: {
        phone: initialPhone,
        username: initialUsername,
        email: initialEmail
      },
      user: { _id: userID },
      changeAccountDetails
    } = this.props;
    const { phone, username, email } = values;
    const query = {};

    if (initialPhone !== phone) {
      query.phone = phone;
    }

    if (initialEmail !== email) {
      query.email = email;
    }

    if (initialUsername !== username) {
      query.username = username;
    }

    changeAccountDetails(userID, query);
  }

  render() {
    return <Account {...this.props} onSubmit={this.handleSubmit} />;
  }
}

const { func, string, shape, number, oneOfType } = React.PropTypes;
AccountContainer.propTypes = {
  changeAccountDetails: func.isRequired,
  initialValues: shape({
    username: string.isRequired,
    phone: oneOfType([string, number]).isRequired,
    email: string.isRequired
  }).isRequired,
  user: shape({ _id: string.isRequired }).isRequired
};

const mapStateToProps = (state) => {
  const { user: { profile: { username, email, phone } } } = state.account.auth;
  return {
    user: state.account.auth.user,
    accountStatus: state.account.preferences.account,
    initialValues: {
      username,
      email,
      phone: phone.toString()
    }
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...preferencesActions }, dispatch);

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
